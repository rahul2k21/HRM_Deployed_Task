const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    filename: { type: String, required: true },
    path: { type: String, required: true },
    position: { type: String, required: true },
    experience: { type: String, required: true },

});

module.exports = mongoose.model("Candidate", candidateSchema);
