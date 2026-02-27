const {User} = require("../../common/models");

exports.has = (...requiredRoles) => async (req, res, next) => {
    const user = await User.findByPk(req.user.id);
    if (!user || !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({error: "Missing role required." });
    }
    next();
};