const CommandBuilder = require("../classes/CommandBuilder");
const { MessageAttachment } = require("discord.js");

module.exports = new CommandBuilder()
  .setName("approve")
  .setAliases(["approb", "approve", "dontapprob", "don'tapprob", "dontapprove", "don'tapprove"])
  .setOwnersOnly(false)
  .setGuildOnly(false)
  .setRequireArgs(false)
  .setDeletable(false)
  .setCooldown(10)
  .setDisabled(false)
  .setMessageExecute(async (message, args) => {
    mode = message.content.split(".")[1]

    switch (mode) {
      case "approb":
      case "approve":
        const approb = new MessageAttachment("./cached/approb/hikami.png");
        message.channel.send(approb);
        break;

      case "dontapprob":
      case "don'tapprob":
      case "dontapprove":
      case "don'tapprove":
        const dontapprob = new MessageAttachment("./cached/dontapprob/hikami.png");
        message.channel.send(dontapprob);
        break;

      default:
        break;
    }
  })
  .build();