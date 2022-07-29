const { Router } = require("express");
const videoRouter = Router();

const { videoController, videoGet } = require("../controllers/videoController");
videoRouter.post("/:id", videoController);
videoRouter.get("/:id", videoGet);

module.exports = videoRouter;
