const {Channel, Guild} = require("../../../common/models");

exports.getAllChannels = async (req, res) => {
    let {guild_id} = req.params;

    try {
        let guild = await Guild.findByPk(guild_id);
        if (!guild) {
            return res.status(404).json({ success: false, error: "Guild not found." });
        }

        let channels = await Channel.findAll({
            where: {guildId: guild_id}
        });

        res.json({
            success: true,
            data: channels
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch channels."
        });
    }
}