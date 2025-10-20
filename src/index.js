const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(cors());

const DB_USER = process.env.DB_USER;
const DB_PWD = process.env.DB_PASS;
const APP_NAME = process.env.APP_NAME;
const CLUSTER_NAME = process.env.CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME;

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

app.use(express.json({ limit: "10mb" }));

const port = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PWD}@${CLUSTER_NAME}.pclnpcg.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${APP_NAME}`
  )
  .then(() => {
    app.listen(port);
    console.log("Conectado na porta: ", port);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});