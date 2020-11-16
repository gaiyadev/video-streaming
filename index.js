const express = require("express");
const app = express();
var indexRouter = require('./routes/index');


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

app.use('/', indexRouter);