const baseConfig = require("./base");
const { prettier } = require("@siberiacancode/prettier");

module.exports = {
  ...baseConfig,
  ...prettier,
};
