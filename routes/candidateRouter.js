const express = require("express");
const router = express.Router();
const candidateController = require("../controller/candidateController.js");
const upload = require("../utils/multerConfig");

router.post("/add", upload.single("resume"), candidateController.addCandidate);
router.get("/all", candidateController.getCandidates);
router.get("/download/:filename", candidateController.downloadResume);
router.delete("/delete/:id", candidateController.deleteCandidate);

module.exports = router;
 