const { parseArgv } = require("./options.js");
const { fileManipulation } = require("./file_ingest_outgest.js");
var fs = require("fs");
const prompts = require("prompts");
const path = require("path");

async function run(rawArg) {
  var options = parseArgv(rawArg);

  if (options.status) {
    try {
      var filenames = await fs.readdirSync(options.dirname);

      for (var i = 0; i < filenames.length; i++) {
        var newFile = await fileManipulation(filenames[i], options);

        if (newFile == "") {
          console.log(`Unable to Parse: ${filenames[i]}`);
          console.log("Skipping...");
        } else {
          var response = await prompts({
            type: 'toggle',
            name: "config",
            message: `Change ${filenames[i]} => ${newFile}`,
            active: "yes",
            inactive: "no"
          });

          if (response.config) {
            logProgress(`Renaming: ${filenames[i]}`, options);
            fs.renameSync(`${options.dirname}${path.sep}${filenames[i]}`, `${options.dirname}${path.sep}${newFile}`);
          } else {
            // the user answer no to changing the filename.
            logProgress(`Sorry this couldn't help. You'll need to change ${filenames[i]} manually.`, options);
          }
        }
      }
    } catch(err) {
      console.log(`ERROR: ${err}`);
      process.exit(1);
    }

  } else {
    console.error("Something went wrong parsing Arguments, or accessing the specified folder.");
    process.exit(1);
  }
}

function logProgress(msg, config) {
  if (config.debug) {
    console.log(msg);
  }
}

module.exports = { run };
