require("dotenv").config();
const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors({
  origin: ["https://memo-app-tau.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}
));

// mongo database
const { mdb } = require("./database/db");
mdb();

// routes
const routes = require("./Routes/Router");
const { credentials } = require("amqplib");
server.use("/", routes);

// server listen
server.listen(process.env.port, () => {
  console.log("server running with success...");
});
