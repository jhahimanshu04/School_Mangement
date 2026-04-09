import School from "../model/Schoolmodel.js";

// POST /addSchool
export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  try {
    const result = await School.create(name.trim(), address.trim(), latitude, longitude);

    res.status(201).json({
      success: true,
      message: "School added successfully",
      data: {
        id: result.insertId,
        name: name.trim(),
        address: address.trim(),
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error("Error adding school:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  try {
    const schools = await School.findAllSortedByDistance(userLon, userLat);

    if (schools.length === 0) {
      return res.status(200).json({ success: true, message: "No schools found", data: [] });
    }

    res.status(200).json({
      success: true,
      message: "Schools fetched successfully",
      count: schools.length,
      user_location: { latitude: userLat, longitude: userLon },
      data: schools,
    });
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};