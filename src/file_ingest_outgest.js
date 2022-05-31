async function fileManipulation(filename, config) {
  var fileExt = filename.split(".")[filename.split(".").length-1];

  const permissiveReg = new RegExp('.*(s[0-9]{1,2}).*(e[0-9]{1,2}).*', "i");
  // [0] = Filename
  // [1] = s01
  // [2] = e01
  const permissiveRegConfirmS = new RegExp('s[0-9]{1,2}', "i");
  const permissiveRegConfirmE = new RegExp('e[0-9]{1,2}', "i");
  const permissiveRegNum = new RegExp('[0-9]{1,2}'); //[0] = num

  logProgress(`File: ${filename}; Extension: ${fileExt}`, config);

  if (config.method == "permissive") {
    var fileNameMatch = filename.match(permissiveReg);

    if (!Array.isArray(fileNameMatch)) {
      logProgress(`${filename} had no season or episode candidates.`, config);
      return "";
    } else {

      if (permissiveRegConfirmS.test(fileNameMatch[1]) && permissiveRegConfirmE.test(fileNameMatch[2])) {
        // otherwise the confirmation passed. Lets move on.
        var seasonNum = fileNameMatch[1].match(permissiveRegNum)[0];
        var episodeNum = fileNameMatch[2].match(permissiveRegNum)[0];

        var newFile = `S${seasonNum}E${episodeNum}.${fileExt}`;

        return newFile;

      } else {
        // the confirmation tests failed.
        return "";
      }

    }

  } else {
    // other options should be on this if else, but since permissive is all that exists.
    console.log(`Unrecognized Method: ${config.method}. Exiting...`);
    process.exit(1);
  }
}

function logProgress(msg, config) {
  if (config.debug) {
    console.log(msg);
  }
}

module.exports = { fileManipulation };
