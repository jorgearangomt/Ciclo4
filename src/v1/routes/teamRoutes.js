const express = require("express");
const teamController = require("../../controllers/teamController");

const router = express.Router();

router.get("/", teamController.getAllTeams);
router.get("/:teamId", teamController.getTeamById);
router.post("/", teamController.createTeam);
router.put("/:teamId", teamController.updateTeam);
router.delete("/:teamId", teamController.deleteTeam);

module.exports = router;