const express = require("express");
require("dotenv").config();
const workOutRoutes = require("./routes/workouts");
const mongoose = require("mongoose");

// Express app
const app = express();
const Port = process.env.PORT;


// Middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use("/api/workouts", workOutRoutes);


mongoose.set('strictQuery', true);
	
(async()=>{
try{mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
console.log(`CONNECTED TO MONGO!`);


}catch(error){
   console.log("OH NO! MONGO CONNECTION/QUERY ERROR!");
  console.log(error);
}
})();

app.listen(Port, () => {
    console.log(`Server is up and running on port ${Port}`);
});

