const os = require("os");
const { userName: user, sayHi } = require("./test");

const name = "Bood";

console.log(os.platform(), os.release());

module.exports = name;
