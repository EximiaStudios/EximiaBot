module.exports = async (client) => {
  require("../util/loadPrefixRegExp")(client);
  require("../util/loadCommands")(client);
  require("../util/loadMessageHelpers")();
  require("../util/cacheApprove")();

  console.log("command: ready");
};
