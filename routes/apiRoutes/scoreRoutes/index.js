const router = require("express").Router();
const {
  getLeaderboard,
  getUserScores,
  postScore,
} = require("../../../controllers/scoreController");

router.route("/score").post(postScore);

router.route("/leaders").get(getLeaderboard);

router.route("/:username").get(getUserScores);

module.exports = router;
