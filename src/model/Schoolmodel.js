import {pool} from "../config/db.js";

const School = {

  // Insert a new school into DB
  create: async (name, address, latitude, longitude) => {
    const [result] = await pool.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );
    return result;
  },

  // Fetch all schools sorted by distance from user using MySQL ST_Distance_Sphere
  findAllSortedByDistance: async (userLon, userLat) => {
    const [rows] = await pool.execute(
      `SELECT *,
        ROUND(
          ST_Distance_Sphere(
            POINT(longitude, latitude),
            POINT(?, ?)
          ) / 1000, 2
        ) AS distance_km
       FROM schools
       ORDER BY distance_km ASC`,
      [userLon, userLat] // lon first, then lat (MySQL convention)
    );
    return rows;
  },

};

export default School;