const Candidate = require("../models/Candidate");
const upload = require("../utils/multerConfig");
const path = require("path");
const fs = require("fs"); 

// exports.addCandidate = async (req, res) => {
//     upload.single("resume")(req, res, async function (err) {
//         if (err) return res.status(400).json({ message: err.message });

//         try {
//             const { name, email, phone } = req.body;

//             if (!name ||phone || !email || !req.file) {
//                 return res.status(400).json({ message: "All fields including resume are required" });
//             }

//             const existingCandidate = await Candidate.findOne({ email });
//             if (existingCandidate) {
//                 return res.status(400).json({ message: "Email already exists" });
//             }

//             const newCandidate = new Candidate({
//                 name,
//                 email,
//                 phone,
//                 filename: req.file.filename, 
//                 path: req.file.path, 
//             });

//             await newCandidate.save();

//             res.status(201).json({ message: "Candidate added successfully", candidate: newCandidate });
//         } catch (error) {
//             console.error("Error adding candidate:", error);
//             res.status(500).json({ message: "An error occurred while adding the candidate", error: error.message });
//         }
//     });
// };

exports.addCandidate = async (req, res) => {
    try {
        const { name, email, phone, position, experience } = req.body;

        if (!name || !phone || !email || !position || !experience || !req.file) {
            return res.status(400).json({ message: "All fields including resume are required" });
        }

        // Check if email already exists
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Save the candidate
        const newCandidate = new Candidate({
            name,
            email,
            phone,
            position,
            experience,
            filename: req.file.filename, 
            path: req.file.path, 
        });

        await newCandidate.save();
        res.status(201).json({ message: "Candidate added successfully", candidate: newCandidate });

    } catch (error) {
        console.error("Error adding candidate:", error);
        res.status(500).json({ message: "An error occurred while adding the candidate", error: error.message });
    }
};


// Get Candidates
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates);
    } catch (error) {
        console.error("Error fetching candidates:", error);
        res.status(500).json({ message: "An error occurred while fetching candidates", error: error.message });
    }
};


exports.downloadResume = (req, res) => {
    const filePath = path.join(__dirname, "../uploads", req.params.filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else { 
        res.status(404).json({ message: "File not found" });
    }
};


exports.deleteCandidate = async (req, res) => {
    try {
        const { id } = req.params;

        // Find candidate by ID
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // Delete the resume file from the uploads folder
        if (fs.existsSync(candidate.path)) {
            fs.unlinkSync(candidate.path); // Remove file
        }

        await Candidate.findByIdAndDelete(id);

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (error) {
        console.error("Error deleting candidate:", error);
        res.status(500).json({ message: "An error occurred while deleting the candidate", error: error.message });
    }
};