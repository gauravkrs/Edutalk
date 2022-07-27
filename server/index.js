const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const AuthRoute = require("./routes/authRoutes")
//<---------------------------------------------------------------->

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//<---------------------------------------------------------------->
//Add routes here
app.use("/auth", AuthRoute)

//<---------------------------------------------------------------->
const CONNECTION_URL = 'mongodb+srv://kimayeClone2022:XOBvv9RKjbaIupfO@cluster0.bhsaorg.mongodb.net/kimaye?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8080;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));