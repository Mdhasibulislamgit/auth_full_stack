const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()


async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

main()
    .then(() => {
        console.log("connect to Db");
    })
    .catch((err) => {
        console.log(err);
    });