const express = require("express");
const matchController = require("../../controllers/matchController");
const verifyToken = require("../../middlewares/verificationJWT");

const router = express.Router();

router.get("/", matchController.getAllMatches);
router.get("/:matchId", matchController.getMatchById);
router.post("/",verifyToken, matchController.createMatch);
router.put("/:matchId",verifyToken, matchController.updateMatch);
router.delete("/:matchId",verifyToken, matchController.deleteMatch);

module.exports = router;