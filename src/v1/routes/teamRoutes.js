const express = require("express");
const teamController = require("../../controllers/teamController");
const verifyToken = require("../../middlewares/verificationJWT");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:teamId", teamController.getTeamById);
router.post("/",verifyToken, teamController.createTeam);
router.put("/:teamId",verifyToken, teamController.updateTeam);
router.delete("/:teamId",verifyToken, teamController.deleteTeam);

module.exports = router;