import jwt from "jsonwebtoken";
import config from "./config";

const payload = {
  sub: "f2b1fa33-14a8-4f73-9ee8-cbe478a180b4",
};

const token = jwt.sign(payload, config.appSecret, {
  expiresIn: "1h",
  issuer: "task-manager-app",
});

console.log(token);
