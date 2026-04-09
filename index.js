import express from 'express';
import router from './src/routes/Schoolroute.js';
import createTable from "./src/data/createTable.js";



const app=express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "school management API is running " });
});
await createTable();


app.use("/", router);
 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
    