const mongoose = require('mongoose');

const sessionSchema=new mongoose.Schema({
    eventId:{type:mongoose.Schema.ObjectId,ref:'Event',required:true},
    title: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    speaker: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

module.exports=mongoose.model('Session',sessionSchema);