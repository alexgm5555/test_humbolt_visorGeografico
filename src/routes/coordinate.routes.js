const express = require('express');
const router = express.Router();

// coordinate Model
const Coordinate = require('../models/coordinate');

// GET all coordinate
router.get('/', async (req, res) => {
  const coordinate = await Coordinate.find();
  res.json(coordinate);
});

// GET all coordinate
router.get('/:id', async (req, res) => {
  const coordinate = await Coordinate.findById(req.params.id);
  res.json(coordinate);
});

// ADD a new coordinate
router.post('/', async (req, res) => {
  console.log(req.body)
  const { lat, lng } = req.body;
  const coordinate = new Coordinate({lat, lng });
  await coordinate.save();
  res.json({status: 'Coordinate Saved'});
});

// UPDATE a new coordinate
router.put('/:id', async (req, res) => {
  const { latitud, description } = req.body;
  const newCoordinate = {lat, lng };
  await Coordinate.findByIdAndUpdate(req.params.id, newCoordinate);
  res.json({status: 'coordinate Updated'});
});

router.delete('/:id', async (req, res) => {
  await Coordinate.findByIdAndRemove(req.params.id);
  res.json({status: 'coordinate Deleted'});
});

module.exports = router;
