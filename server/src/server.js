const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const port = 8080;

mongoose
  .connect("mongodb://mongo:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch(err => {
    console.log(err);
  });

const HelloModel = mongoose.model(
  "HelloModel",
  new Schema({
    text: String
  })
);
HelloModel.find({ text: /Hello/ }).then(instances => {
  if (instances.length < 1) {
    const instance = new HelloModel();
    instance.text = "Hello World!";
    instance.save();
  }
});

const app = express();
app.use(morgan("combined"));

app.get("/api", async function(req, res) {
  const instances = await HelloModel.find({ text: /Hello/ });
  console.log(instances);
  if (instances.length > 0) {
    res.send(JSON.stringify(instances[0]));
  } else {
    res.send(
      JSON.stringify({
        error: new Error("Could not fetch instances from MongoDB.")
      })
    );
  }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
