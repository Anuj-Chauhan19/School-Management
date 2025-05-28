const db = require('../db');

exports.getAllSchools = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM schools', (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

exports.addSchool = ({ name, address, latitude, longitude }) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        db.query(query, [name, address, latitude, longitude], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

exports.getSchoolsSortedByDistance = (lat, lon) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *, 
            (6371 * ACOS(
                COS(RADIANS(?)) * COS(RADIANS(latitude)) * 
                COS(RADIANS(longitude) - RADIANS(?)) + 
                SIN(RADIANS(?)) * SIN(RADIANS(latitude))
            )) AS distance 
            FROM schools 
            ORDER BY distance ASC`;
        db.query(query, [lat, lon, lat], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};
