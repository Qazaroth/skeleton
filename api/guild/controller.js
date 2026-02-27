const {Guild} = require("../../common/models");

exports.getAllGuilds = async (req, res) => {
    try {
        let guilds = await Guild.findAll();

        res.json({
            success: true,
            data: guilds
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch guilds."
        });
    }
}