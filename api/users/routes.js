const router = require("express").Router();
const UserController = require("./controller");
const {check} = require("../../common/middlewares/isAuthenticated");
const {has} = require("../../common/middlewares/checkPermission");

router.get("/all", check, has("admin"), UserController.getAllUsers);
router.get("/", check, has("admin"), UserController.getUser);

module.exports = router;