const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

//create route for users
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);

//------------  deployment  ---------------\\

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    //send first page of our app
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is runnung...");
  });
}

//------------  deployment  ---------------\\

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000; //if the port is unavailable, default is 5000

app.listen(PORT, console.log(`server started on port ${PORT}`));
