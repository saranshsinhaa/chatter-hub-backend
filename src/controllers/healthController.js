const os = require("os");

const formatTime = (seconds) => {
  function pad(s) {
    return (s < 10 ? "0" : "") + s;
  }
  let hours = Math.floor(seconds / (60 * 60));
  let minutes = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
};

function handler(req, res) {
  let healthcheckData = {
    message: "🛠️ API v1 working!",
    timestamp: new Date().toUTCString(),
    cpus: os.cpus(),
    architecture: os.arch(),
    networkInterfaces: os.networkInterfaces(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    platform: os.platform(),
    osType: os.type(),
    osRelease: os.release(),
    osVersion: os.version(),
    hostname: os.hostname(),
    userInfo: os.userInfo(),
    serverUptime: formatTime(process.uptime()),
    osUptime: formatTime(os.uptime()),
    reqIP: req.headers["x-real-ip"] || req.connection.remoteAddress,
  };

  res.status(200).json({ status: true, message: healthcheckData });
}

module.exports = handler;
