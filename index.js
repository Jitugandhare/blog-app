const express = require("express")

const {connection}=require("./db")
const { userRouter } = require("./backend/routs/User.rout")
const cors=require("cors")
const app = express();

require.apply("dotenv").config()
app.use(express.json)
app.use(cors())

app.get("/", (req, res) => {
    res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use("/article", articleRouter);

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("connected to db")
    } catch (err) {
        console.log(err)
    }
})