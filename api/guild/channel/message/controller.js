const {Message} = require("../../../../common/models");

exports.getAllMessages = async (req, res) => {
    try {
        let messages = await Message.findAll();

        res.json({
            success: true,
            data: messages
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch messages."
        });
    }
};