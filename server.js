const express=require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const dotenv=require("dotenv").config();
const PORT=process.env.PORT || 3000;

connectDb().then(() => {
   app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
   });
}).catch((err) => {
   console.error("Failed to connect to database", err);
});
const app=express();


app.use(express.json());// heirarchy one by one step wise in  node js 
app.use("/api/contacts",require("./routes/contactRoutes"));  // common  route we will use for all of the project
app.use("/api/users",require("./routes/userRoutes"));
app.use(errorHandler);

//  app.listen(PORT,()=>{
//     console.log(`the server is running on port ${PORT}`);   // as we already delcared the app.listen() above
//  });
 