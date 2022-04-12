const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const billRoutes = require("./routes/billRoutes");

const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const path = require("path");
const cors = require("cors");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("API is runnung...");
});

//create route for users
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bills", billRoutes);

//------------  deployment  ---------------\\

// __dirname = path.resolve();
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     //send first page of our app
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running...");
//   });
// }

//------------  deployment  ---------------\\

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; //if the port is unavailable, default is 5000

app.listen(PORT, console.log(`server started on port ${PORT}`));
