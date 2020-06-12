const CommandBuilder = require("../classes/CommandBuilder");

var admin = require('firebase-admin');
var serviceAccount = process.env.FIREBASE_CREDENTIALS || require("../../../core/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_URL || "https://eximiabot-dev.firebaseio.com",
    databaseAuthVariableOverride: {
        uid: "status-command",
    },
});

module.exports = new CommandBuilder()
  .setName("status")
  .setOwnersOnly(true)
  .setGuildOnly(false)
  .setRequireArgs(true)
  .setDeletable(true)
  .setCooldown(10)
  .setDisabled(false)
  .setMessageExecute(async (message, args) => {
        // 2 args are needed, exit early if less
        if (args.length < 2) {
            message.channel.send(`[**${message.author.username}**] Status: Minimum of 2 arguments are needed.`);

            return;
        }

        // To Upper the expected activity
        let activity = args[0].toUpperCase();

        // Check with every possible activities, return early if match none.
        if (activity === "PLAYING" || activity === "P") {
            activity = "PLAYING";
        } else if (activity === "LISTENING" || activity === "L") {
            activity = "LISTENING";
        } else if (activity === "WATCHING" || activity === "W") {
            activity = "WATCHING";
        } else {
            message.channel.send(`[**${message.author.username}**] Status: "${args[0]}" is not a valid activity.`);

            return;
        }

        // Remove first element (the activity) and join others with spaces
        args.shift();
        let statusMessage = args.join(" ");

        // Firebase database
        var db = admin.database();
        var ref = db.ref("status");

        ref.set({
            text: statusMessage,
            activity: activity
        }, (error) => {
            if (error) {
                console.log("Status database update failed. " + error);
            } else {
                console.log("Status database updated.");
            }
        });

        // Update status
        message.client.user.setActivity(statusMessage, { type: activity })
            .then(presence => console.log(`Activity set to "${presence.activities[0].name}", type "${presence.activities[0].type}"`))
            .catch(console.error);

        // Reply to user
        message.channel.send(`[**${message.author.username}**] Status: Updated to "${activity}", "${statusMessage}".`);
    }
  )