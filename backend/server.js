const express = require("express");
const mongoose = require("mongoose")
const app = express();
const { readdirSync } = require("fs")
const fileUpload = require("express-fileupload")

const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


let allowed = ["http://localhost:3000", "http://localhost:5173", "another"]
function options(req, res) {
    let temp;
    let origin = req.header("Origin");
    if (allowed.indexOf(origin) > -1) {
        temp = {
            setSuccessStatus: 200,
            origin: true,
        }
    } else {
        temp = {
            origin: "stupid"
        }
    }
    res(null, temp)
}

// this is middleware 
app.use(fileUpload({
    // Configure file uploads with maximum file size 10MB
    //   limits: { fileSize: 10 * 1024 * 1024 },
    // Temporarily store uploaded files to disk, rather than buffering in memory
    useTempFiles: true,
    // tempFileDir : '/tmp/'
}))
app.use(express.json())
app.use(cors(options));


// import all routes
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)))

// database
mongoose.connect(process.env.DATABASE_URL).then(() => console.log("database connection successfully")).catch((err) => console.log(`error connecting to mongodb ${err}`))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})