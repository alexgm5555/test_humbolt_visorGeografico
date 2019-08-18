const mongoose = require('mongoose');
const { Schema } = mongoose;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

const LocationSchema = new Schema({
  lat: { type: SchemaTypes.Double, required: true },
  lng: { type: SchemaTypes.Double, required: true }
});

module.exports = mongoose.model('Location', LocationSchema);
