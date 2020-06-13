const path = require("path");
const fs = require("fs");

let environmentFile = null;
if (process.env.MODE === "production") {
  const prodPath = path.join(__dirname, "./.environments/prod.env");
  if (fs.existsSync(prodPath)) {
    environmentFile = prodPath;
  }
} else {
  const devPath = path.join(__dirname, "./.environments/dev.env");
  if (fs.existsSync(devPath)) {
    environmentFile = devPath;
  }
}

if (environmentFile) {
  require("dotenv-safe").config({
    path: environmentFile,
  });
} else {
  throw new Error("missing environment file");
}
