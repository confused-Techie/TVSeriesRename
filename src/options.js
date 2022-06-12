function parseArgv(rawArg) {
  // in the future this should check all cli options, and that the specified file exists.
  if (rawArg.length < 1) {
    // no arguments passed. We could look for a config file, or for now, lets just exit.
    console.log(`No Arguments Passed. Exiting...`);
    process.exit(1);
  } else {
    // arguments passed, lets use these instead
    var returnObj = {
      status: false,
      dirname: "",
      method: "permissive",
      debug: false
    };

    for (var i = 0; i < rawArg.length; i++) {
      if (rawArg[i].startsWith("./") || rawArg[i].startsWith("/")) {
        returnObj.dirname = rawArg[i];
      } else if (rawArg[i].startsWith("--debug=")) {
        if (rawArg[i] == "--debug=true") {
          returnObj.debug = true;
        } else if (rawArg[i] == "--debug=false") {
          returnObj.debug = false;
        } else {
          console.log(`Unable to Parse Debug Option: ${rawArg[i]}`);
        }
      } else if (rawArg[i].startsWith("--method")) {
        var opt = rawArg[i].split("=");
        returnObj.method == opt[1];
      }
    }

    if (returnObj.dirname != "") {
      // here we should also check if directory exists.
      returnObj.status = true;
    }

    return returnObj;
  }
}

module.exports = { parseArgv };
