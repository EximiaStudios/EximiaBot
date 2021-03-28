var admin = require("firebase-admin");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports = async () => {
  console.log("Caching approb...");

  var bucket;
  var adminInit = false;

  // Looping to wait until admin is initialised by firebase widget
  do {
    try {
      bucket = admin.storage().bucket()

      // Set as init-ed if previous line is successful
      adminInit = true;
    } catch (error) {
      console.log("Waiting for firebase app initialisation...");
      await delay(1000)

      // Break out of the loop if the error if something other than not init
      if (error.errorInfo.code != "app/no-app") {
        console.log(error);
        break;
      }
    }
  } while (!adminInit);

  // Copy-paste coding is the best way to code
  // https://stackoverflow.com/a/26815894
  var fs = require('fs');
  var approb = "./cached/approb/";
  var dontapprob = "./cached/dontapprob/";

  if (!fs.existsSync("./cached")){
    fs.mkdirSync("./cached");
    console.log("Created \"./cached\"");
  }

  if (!fs.existsSync(approb)){
    fs.mkdirSync(approb);
    console.log("Created " + "\"" + approb + "\"");
  }

  if (!fs.existsSync(dontapprob)){
    fs.mkdirSync(dontapprob);
    console.log("Created " + "\"" + dontapprob + "\"");
  }

  // Based on firebase storage documentation
  // https://cloud.google.com/storage/docs/downloading-objects#storage-download-object-nodejs
  async function downloadFile(file) {
    const options = {
      destination: "./cached/" + file,
    };
  
    // Downloads the file
    await bucket.file(file).download(options);
  
    console.log(
      `Successfully cached "${"./cached/" + file}".`
    );
  }

  // Approb
  downloadFile("approb/hikami.png").catch(console.error);

  // Don't Approb
  downloadFile("dontapprob/hikami.png").catch(console.error);
}