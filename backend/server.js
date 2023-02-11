const express = require("express");
const { v4: uuidV4 } = require("uuid");

const app = require("./app");

app.listen(3000, () => {
  console.log("Conected to server!");
});
