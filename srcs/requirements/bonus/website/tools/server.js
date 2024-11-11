const express = require("express");

const app = express(express.static("public"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
