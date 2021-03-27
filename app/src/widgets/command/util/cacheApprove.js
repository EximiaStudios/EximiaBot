var admin = require("firebase-admin");

module.exports = async () => {
  console.log("Caching approb..");

  var bucket = admin.storage().bucket();

  // Copy-paste coding is the best way to code
  // https://stackoverflow.com/a/26815894
  var fs = require('fs');
  var approb = "./cached/approb/";
  var dontapprob = "./cached/dontapprob/";

  if (!fs.existsSync(approb)){
    fs.mkdirSync(approb);
  }

  if (!fs.existsSync(dontapprob)){
    fs.mkdirSync(dontapprob);
  }

  // Approb
  await bucket.file("approb/hikami.png").download({
    destination: "./cached/approb/"
  }).catch(console.error);

  // Don't approb
  await bucket.file("dontapprob/hikami.png").download({
    destination: "./cached/dontapprob/"
  }).catch(console.error);
}