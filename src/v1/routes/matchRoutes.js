const express = require("express");
const matchController = require("../../controllers/matchController");

const router = express.Router();

router.get("/", matchController.getAllMatches);
router.get("/:matchId", matchController.getMatchById);
router.post("/", matchController.createMatch);
router.put("/:matchId", matchController.updateMatch);
router.delete("/:matchId", matchController.deleteMatch);

module.exports = router;