const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {User, Session} = require("../../common/models");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);
const schema = {
    type: "object",
    required: ["username", "email", "password"],
    properties: {
        username: {type: "string", minLength: 2},
        email: {type: "string", format: "email"},
        password: {type: "string", minLength: 6}
    }
};
const validate = ajv.compile(schema);

const secret_key = process.env.SECRET_KEY || "your-secret-key"

const encryptPassword = (password) => crypto.createHash("sha256").update(password).digest("hex");
const generateAccessToken = (user) => 
    jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        secret_key,
        {
            expiresIn: "15m"
        }
    );

const generateRefreshToken = () =>
    crypto.randomBytes(64).toString("hex");

exports.login = async (req, res) => {
    try {
        let { username, password } = req.body;
        let encryptedPass = encryptPassword(password);
        let user = await User.scope("withPassword").findOne({ where: { username }});

        if (!user || user.password !== encryptedPass) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        // Generate tokens
        let accessToken = generateAccessToken(user);
        let refreshToken = generateRefreshToken();

        // Store session in DB
        await Session.create({
            userId: user.id,
            refreshToken: refreshToken,
            deviceName: req.headers["user-agent"]?.split(" ")[0] || "Unknown device",
            ipAddress: req.ip,
            userAgent: req.headers["user-agent"],
            lastActiveAt: new Date()
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                discriminator: user.discriminator,
                role: user.role
            },
            accessToken,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Login failed." });
    }
};

exports.register = async (req, res) => {
    if (!validate(req.body)) {
        return res.status(400).json({error: "Invalid input", details: validate.errors});
    }

    try {
        const { username, email, password } = req.body;
        const encryptedPassword = encryptPassword(password);
        const user = await User.create({
            username: username,
            email: email,
            password: encryptedPassword,
        });
        const accessToken = generateAccessToken(username, user.id);

        res.status(201).json({
            success: true,
            user: {id: user.id, username: user.username, email: user.email, discriminator: user.discriminator},
            token: accessToken
        });

        console.log(encryptedPassword)
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};