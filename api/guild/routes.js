const router = require("express").Router({mergeParams: true});

const GuildController = require("./controller");
const ChannelController = require("./channel/controller");
const MessageController = require("./channel/message/controller");

const {check} = require("../../common/middlewares/isAuthenticated");
const {has} = require("../../common/middlewares/checkPermission");

router.get("/", check, has("admin"), GuildController.getAllGuilds);

router.get("/:guild_id/channel", check, has("admin"), ChannelController.getAllChannels);

router.get("/:guild_id/channel/:channel_id/message", check, has("admin"), MessageController.getAllMessages);

module.exports = router;