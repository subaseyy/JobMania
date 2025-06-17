const mongoose = require('mongoose');


const savedJobSchema = new mongoose.Schema({

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },


  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'JobPost', 
    required: true 
  },


  savedAt: { 
    type: Date, 
    default: Date.now 
  }
});


module.exports = mongoose.model('SavedJob', savedJobSchema);
