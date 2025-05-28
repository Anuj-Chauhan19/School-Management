const School = require('../models/school');

exports.renderHome = async (req, res) => {
  try {
        const schools = await School.getAllSchools();
    res.render('index', { schools });
  } catch (err) {
    console.error(err);
    res.send("Database error");
  }
};

exports.renderAddSchool = (req, res) => {
  res.render('addSchool');
};

exports.handleAddSchool = async (req, res) => {
  try {
    const { schoolName, address, latitude, longitude } = req.body;
    const school = new School({
      name: schoolName,
      address,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });
    await school.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send("Error inserting school");
  }
};

exports.listSchoolsByDistance = async (req, res) => {
  const { latitude, longitude } = req.query;
  try {
        const schools = await School.getSchoolsSortedByDistance(latitude, longitude);
        res.render('index', { schools });
  } catch (err) {
    console.error(err);
    res.send("Error fetching sorted schools");
  }
};
