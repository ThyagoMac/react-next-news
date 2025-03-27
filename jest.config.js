//find .env variables
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

//Next gives new imports/logics to jest
const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: ".",
});

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
