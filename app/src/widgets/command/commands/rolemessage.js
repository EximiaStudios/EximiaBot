const CommandBuilder = require("../classes/CommandBuilder");

module.exports = new CommandBuilder()
  .setName("rolemessage")
  .setAliases(["rm"])
  .setOwnersOnly(true)
  .setGuildOnly(false)
  .setRequireArgs(true)
  .setDeletable(true)
  .setCooldown(10)
  .setDisabled(false)
  .setMessageExecute(async (message, args) => {
    // Only 1 args is needed, exit early if otherwise
    if (args.length != 1) {
      message.channel.send(
        `[**${message.author.username}**] Role Message: Too many arguments, only 1 is needed.`
      );

      return;
    }

    const rolesList = {
      all: {
        name: "Versus Roles",
      },
      caster: {
        name: "Caster",
        emoji: "🎙️",
      },
      spectator: {
        name: "Spectator",
        emoji: "👀",
      },
      teamA: {
        name: "Team A",
        emoji: "🇦",
      },
      teamB: {
        name: "Team B",
        emoji: "🇧",
      },
    };

    // Try to fetch any of the roles from list based on
    // args given from the sender.
    const role = rolesList[args];

    // const role will be undefined with it fails to
    // get any role from the rolelist.

    if (!role) {
      message.channel.send(
        `[**${message.author.username}**] Role Message: Command argument "${args}" does not exist.`
      );

      return;
    }

    // Fields for embeded discord message
    let rmFields;

    // For "all"/main embed role message, all emojis and role will be displayed
    // Hence we need different rmFields.
    if (role.name === "Versus Roles") {
      rmFields = [
        {
          name: "\u200b",
          value:
            "Click on the respective reactions to get your role assigned.\nClick again to remove role.",
          inline: false,
        },
      ];

      // Loop through each roles/objects we have (except the "all")
      // For each, we add revelant information into the embed fields.

      // Apparently object doesn't have forEach in JS.
      // So use do it this way, credit below:
      // https://gomakethings.com/the-es6-way-to-loop-through-objects-with-vanilla-javascript/#object-keys-and-array-foreach

      Object.keys(rolesList).forEach((roleCategory) => {
        // Ignore the "all" object
        if (roleCategory != "all") {
          rmFields.push({
            name: `${rolesList[roleCategory].emoji}`,
            value: `${rolesList[roleCategory].name}`,
            inline: true,
          });

          // If there is even number of roles, we display is 2 by 2 grid,
          // since embed message can only have 3 fields inline.
          if (
            Object.keys(rolesList).indexOf(roleCategory) % 2 == 0 &&
            (Object.keys(rolesList).length - 1) % 2 == 0
          ) {
            rmFields.push({
              name: "\u200b",
              value: "\u200b",
              inline: true,
            });
          }
        }
      });
    } else {
      rmFields = [
        {
          name: "\u200b",
          value: `Click on the reaction ${role.emoji} to remove your role as "${role.name}".`,
          inline: false,
        },
      ];
    }

    // Discord embed object to be send
    const rmEmbed = {
      color: "#AF1755",
      title: role.name,
      fields: rmFields,
      footer: {
        text: "React below!",
      },
    };

    // Send the embed message and log the message and channel id of the sent message.
    message.channel
      .send({ embed: rmEmbed })
      .then((promMessage) =>
        console.log(
          `[${message.author.username}] Role Message "${role.name}" created.\n\tMessage ID: ${promMessage.id}\n\tChannel ID: ${promMessage.channel.id}`
        )
      )
      .catch(console.error);
  })
  .build();
