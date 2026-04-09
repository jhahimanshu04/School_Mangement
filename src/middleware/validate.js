export const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;
  const errors = []; 

 
  if (!name)      errors.push({ field: "name", message: "Name is required" });
  if (!address)   errors.push({ field: "address", message: "Address is required" });
  if (!latitude)  errors.push({ field: "latitude", message: "Latitude is required" });
  if (!longitude) errors.push({ field: "longitude", message: "Longitude is required" });

  if (name && (typeof name !== "string" || name.length < 2 || name.length > 100)) {
    errors.push({ field: "name", message: "Name must be 2-100 characters" });
  }

  if (address && (typeof address !== "string" || address.length < 5 || address.length > 255)) {
    errors.push({ field: "address", message: "Address must be 5-255 characters" });
  }

  if (latitude && (isNaN(latitude) || latitude < -90 || latitude > 90)) {
    errors.push({ field: "latitude", message: "Latitude must be between -90 and 90" });
  }

  if (longitude && (isNaN(longitude) || longitude < -180 || longitude > 180)) {
    errors.push({ field: "longitude", message: "Longitude must be between -180 and 180" });
  }

  // If any errors found → return all at once
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors, 
    });
  }

  next();
};


export const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;
  const errors = [];

  if (!latitude)  errors.push({ field: "latitude", message: "Latitude is required" });
  if (!longitude) errors.push({ field: "longitude", message: "Longitude is required" });

  if (latitude && (isNaN(latitude) || latitude < -90 || latitude > 90)) {
    errors.push({ field: "latitude", message: "Latitude must be between -90 and 90" });
  }

  if (longitude && (isNaN(longitude) || longitude < -180 || longitude > 180)) {
    errors.push({ field: "longitude", message: "Longitude must be between -180 and 180" });
  }


  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors, 
    });
  }

  next();
};