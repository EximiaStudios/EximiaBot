const serviceAccount = process.env.FIREBASE_CREDENTIALS || require("./serviceAccountKey.json");

module.exports = (admin, inputUID) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_URL || "https://eximiabot-dev.firebaseio.com",
        databaseAuthVariableOverride: {
            uid: inputUID,
        },
    });
}