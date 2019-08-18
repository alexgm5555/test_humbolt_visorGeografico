const mongoose = require('mongoose');
const URI = 'mongodb://alexgm5555:alexgm5555@ds263917.mlab.com:63917/test_humboldt';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
