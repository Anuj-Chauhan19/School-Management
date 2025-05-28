const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/school");

router.get("/", schoolController.renderHome);
router
  .route("/addSchool")
  .get(schoolController.renderAddSchool)
  .post( schoolController.handleAddSchool);

router.get("/listSchools", schoolController.listSchoolsByDistance);

module.exports = router;
