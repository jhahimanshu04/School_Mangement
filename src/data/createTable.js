import {pool} from "../config/db.js";

const createTable = async () => {
  try {
    await pool.execute(`
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        address VARCHAR(255) NOT NULL,
        latitude FLOAT NOT NULL,
        longitude FLOAT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log(" Schools table created successfully");
  } catch (error) {
    console.error(" Table creation failed:", error.message);
  }
};

export default createTable;