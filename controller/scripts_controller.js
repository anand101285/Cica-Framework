const Evilscan = require("evilscan");
const axios = require("axios");
const ExecuteNmap = (req, res) => {
  const { target, port } = req.body;
  const options = {
    target,
    port,
    status: "TROU", // Timeout, Refused, Open, Unreachable
    banner: true,
  };
  let openPorts = [];
  const evilscan = new Evilscan(options);

  evilscan.on("result", data => {
    if (data.status === "open") {
      openPorts.push(data);
    }
  });

  evilscan.on("error", err => {
    if (openPorts.length > 0) res.send({ status: 1, data: openPorts });
    else res.send({ status: 0 });
  });

  evilscan.on("done", () => {
    res.send({ status: 1, data: openPorts });
  });

  evilscan.run();
};

const intelGatheringIp = (req, res) => {
  const { ip } = req.body;
  let details = {};
  const options = {
    method: "GET",
    url: "https://talosintelligence.com/cloud_intel/ip_reputation",
    params: { ip },
    headers: { cookie: "__cflb=0H28vmoBAedUAhWLS6T78gEQCHuXeepmCLn66nxZLr7" },
  };

  axios
    .request(options)
    .then(response => {
      details = {
        ...details,
        thread_level: response.data.reputation.threat_level_id,
        geo: {
          city: response.data.reputation.geo_location.locality,
          state: response.data.reputation.geo_location.state_or_province,
          country: response.data.reputation.geo_location.country,
        },
        org: response.data.reputation.org_stats.org_info.org_name,
        spam_level: response.data.reputation.spam_level,
      };

      res.send({ status: 1, data: details });
    })
    .catch(error => {
      console.error(error);
      res.send({ status: 0 });
    });
};

module.exports = {
  ExecuteNmap,
  intelGatheringIp,
};
