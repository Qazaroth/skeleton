const express = require("express");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const packageJson = require("./package.json");
const config = require("./config.json");

const {sequelize, User} = require("./common/models");

const authRoutes = require("./api/auth/routes");
const userRoutes = require("./api/users/routes");
const guildRoutes = require("./api/guild/routes");

const app = express();

function formatUptime(seconds) {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = Math.floor(seconds % 60);
  return `${hrs}h ${mins}m ${secs}s`;
}

async function seedAdmin() {
    let userCount = await User.count();

    if (userCount === 0) {
        let hashedPassword = crypto.createHash("sha256").update(config.admin_pass).digest("hex");
        
        await User.create({
            username: config.admin_name,
            email: config.admin_email,
            password: hashedPassword,
            role: "admin",
        });

        console.log(`Admin account created: ${config.admin_name} / ${config.admin_pass}`);
    }
}

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // max 100 requests per windowMs
});

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

(async () => {
    await sequelize.sync();
    await seedAdmin();
})();

app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/guild", guildRoutes);

app.get("/api", async (req, res) => {
    let dbStatus = "down";
    try {
        await sequelize.authenticate();
        dbStatus = "up";
    } catch (err) {
        dbStatus = "down";
    }

    let uptime = process.uptime();
    let uptimeSeconds = Math.floor(uptime);
    let formattedUptime = formatUptime(uptimeSeconds);

    res.render("status", {
        status: dbStatus === "up" ? "OK" : "ERROR",
        dbStatus,
        uptime: formattedUptime,
        version: packageJson.version,
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Something went wrong! Oopsies!"
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));