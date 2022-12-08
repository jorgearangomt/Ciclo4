const Match = require("../database/model/match");
const mongoose = require("mongoose");

const matchService = require("../services/matchService");

//Obtener todos los usuarios
const getAllMatches = async (req, res) => {
  try {
    const allMatches = await matchService.getAllMatches();
    res.status(200).send(allMatches);
  } catch (error) {
    res.status(500).send(error);
  }
};

//Obtener un usuario por su ID
const getMatchById = async (req, res) => {
  try {
    const { matchId } = req.params;
    const match = await matchService.getMatchById(matchId);
    if (!match) {
      res.status(404).send("Match not found");
      return;
    }
    res.status(200).send(match);
  } catch (error) {
    res.status(500).send(error?.message || error);
  }
};

//Crear un usuario
const createMatch = async (req, res) => {
  try {
    const { body } = req;
    await Match.validate(body);
    const match = new Match({ 
      _id: new mongoose.Types.ObjectId(),
        ...body,      
    });
    const createdMatch = await matchService.createMatch(match);
    res.status(201).send(createdMatch);
  } catch (error) {
    if(error.name === "ValidationError"){
      res.status(400).send("Invalid match data");
      // res.status(400).send("Invalid email");
    }
    else{
      res.status(500).send(error?.message || eror);
    }
  }
};

//Actualizar un usuario
const updateMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { body } = req;
    await Match.validate(body);
    const updatedMatch = await matchService.updateMatch(matchId, body);
    if(updatedMatch === null){
      res.status(404).send("Match not found");
      return;
    }
    res.status(200).send(updatedMatch);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send(error.message);
    }
    else if(error.name === "ValidationError"){
      res.status(400).send("Invalid email");
    }
    else{
      res.status(500).send(error?.message || error);
    }
  }
};

//Eliminar un usuario
const deleteMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const deletedMatch =await matchService.deleteMatch(matchId);
    if(deletedMatch === null){
      res.status(404).send("Match not found");
      return;
    }
    res.status(200).send("Match deleted");
  } catch (error) {
    if (error.name === "CastError") {
      res.status(404).send(error.message);
      return;
    }
    res.status(500).send(error?.message || error);
  }
};

module.exports = {
  getAllMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
};
