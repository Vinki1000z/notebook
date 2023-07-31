const express = require('express')
const cors=require("cors");
const app = express()
app.use(cors());
const port = 5000
const connect=require("./db");
connect();
app.use(express.json()) 
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use("/api/auth",require("./routes/auth"));

app.use("/api/notes",require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})