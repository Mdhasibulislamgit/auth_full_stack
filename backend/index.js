const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
require("./Db/db")
const AuthRouter = require("./Routes/AuthRouter")
const ProductRouter = require("./Routes/ProductRouter")


app.use(bodyParser.json())
app.use(cors())

app.use("/auth", AuthRouter)
app.use("/products",ProductRouter)
app.get("/ping", (req, res) => {
    res.send("pong")
})



const PORT = process.env.PORT
app.listen(PORT, () => {
     console.log(`Server is running in port ${PORT}`)
 })