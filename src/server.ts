import express from "express";

const server = express();

server.use(express.json());

server.listen(3000, () => console.log("Server running"));
