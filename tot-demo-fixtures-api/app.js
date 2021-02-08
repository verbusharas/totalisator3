import express from "express";
import fixtures from "./fixtures.js";

const app = express();

app.route("/api/mock/fixtures").get((req, res) => {
  res.send(fixtures);
});

app.route("/api/mock/fixture/:id").get((req, res) => {
  const fixture = fixtures.data.find((f) => f.fifaId == req.params.id);
  const response = {data:fixture}
  res.send(response);
});

const port = 3001;

app.listen(port, () => {
  console.log("Server has started succesfully on port " + port);
});
