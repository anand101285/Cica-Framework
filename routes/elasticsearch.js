const express = require("express");
const router = express.Router();
const axios = require("axios");
const moment = require("moment");
var country = require("countryjs");
const User = require("../models/Users");
elastic_header = {
  Authorization:
    "ApiKey RjZTeVg0SUI2REFGcHdqZ0Y5UVc6eG9UdWdLQzlSYlNkWHduZE9POHpZQQ==",
  "Content-Type": "application/json",
};

const getHoneypotIds = async userId => {
  const data = await User.findById(userId);
  if (data) {
    return data.honeypots;
  } else {
    return null;
  }
};

/**
 * DASHBOARD TABLE TO SHOW ALL INTERACTION on Honeypots.
 */
router.get("/iptable/all_country_interaction/count/", async (req, res) => {
  const userId = req.headers.authorization;
  const userHoneypots = await getHoneypotIds(userId);
  if (userHoneypots && userHoneypots.length === 0) {
    res.send({ data: [] });
  } else if (userHoneypots == null) {
    res.send({ data: [] });
  } else {
    var data = JSON.stringify({
      _source: ["country", "result"],
      size: 0,
      query: {
        term: {
          result: "interaction",
        },
      },
      aggs: {
        countries: {
          terms: {
            field: "country.keyword",
          },
        },
      },
    });

    var config = {
      method: "get",
      url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`iptable_requests/_search?filter_path=aggregations.countries.buckets",
      headers: elastic_header,
      data: data,
    };

    axios(config)
      .then(function (response) {
        const dataArr = response.data.aggregations.countries.buckets;
        // console.log(dataArr);
        const data = [];
        dataArr.slice(1).map(docs => {
          data.push({
            id: country.ISOcodes(docs.key, "name").alpha3,
            name: docs.key,
            value: docs.doc_count,
          });
        });
        res.send({ data });
      })
      .catch(function (error) {
        res.send();
      });
  }
});

/**
 * IP PROFILING ROUTES
 * Honeypot Tab to show all interaction ips
 */

//route to get all ips of dionaea
router.get("/dionaea/all_interaction_ip", async (req, res) => {
  const userId = req.headers.authorization;
  const honeypots = await getHoneypotIds(userId);
  console.log(honeypots);
  if (honeypots && honeypots.length > 0) {
    var config = {
      method: "get",
      url: "https://decepticon-es.herokuapp.com/dionaea_all_ips",
    };
    let all_ip_data = [];
    axios(config)
      .then(function (response) {
        //console.log("response", response.data);
        const all_ips = response.data;
        all_ips.forEach(async (ele, index) => {
          var config_ip = {
            method: "get",
            url: `https://decepticon-es.herokuapp.com/attacker_profile?ip=${ele}`,
          };

          axios(config_ip)
            .then(function (response) {
              //console.log("response data", response.data);
              all_ip_data.push({
                ip: ele,
                hashCount: response.data.hashes_count,
                interactions: response.data.interactions,
                scans: response.data.scans,
              });
              if (index == all_ips.length - 1) {
                res.send(all_ip_data);
              }
            })
            .catch(function (error) {
              res.send();
            });
        });
      })
      .catch(function (error) {
        res.send();
      });
  } else {
    res.send([]);
  }
});

//route to get all hashes of single ip
router.get("/dionaea/all_hashes/:ip", async (req, res) => {
  var config = {
    method: "get",
    url: `https://decepticon-es.herokuapp.com/all_hashes_of_ip?ip=${req.params.ip}`,
  };

  axios(config)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send();
    });
});

router.get("/dionaea/hash_details/:ip/:hash", async (req, res) => {
  var config = {
    method: "get",
    url: `https://decepticon-es.herokuapp.com/hash_info?ip=${req.params.ip}&hash=${req.params.hash}`,
  };

  axios(config)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send();
    });
});

//web_requests a3 number of ip interactions
router.get("/web/all_interaction/count/", async (req, res) => {
  const userId = req.headers.authorization;
  const userHoneypots = await getHoneypotIds(userId);
  if (userHoneypots && userHoneypots.length === 0) {
    res.send({ data: [] });
  } else if (userHoneypots == null) {
    res.send({ data: [] });
  } else {
    var config = {
      method: "get",
      url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`web_requests/_count",
      headers: elastic_header,
    };

    axios(config)
      .then(function (response) {
        res.send({ count: response.data.count });
      })
      .catch(function (error) {
        res.send();
      });
  }
});

router.get("/web/attackerIp", async (req, res) => {
  const userId = req.headers.authorization;
  const honeypots = await getHoneypotIds(userId);

  if (honeypots && honeypots.length > 0) {
    const machineid = honeypots[0];
    var data = JSON.stringify({
      size: 0,
      aggs: {
        ip_interactions: {
          terms: {
            field: "attackerIP.keyword",
          },
        },
      },
    });

    var config = {
      method: "get",
      url: `https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/${machineid}\`web_requests/_search`,
      headers: elastic_header,
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = response.data.aggregations.ip_interactions.buckets;
        res.send(data);
      })
      .catch(function (error) {
        res.send();
      });
  } else {
    res.send([]);
  }
});

router.get("/dionaea/all_interaction/count/", async (req, res) => {
  const userId = req.headers.authorization;
  const userHoneypots = await getHoneypotIds(userId);
  if (userHoneypots && userHoneypots.length === 0) {
    res.send({ data: 0 });
  } else if (userHoneypots == null) {
    res.send({ data: -1 });
  } else {
    var config = {
      method: "get",
      url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`dionaea_requests/_count",
      headers: elastic_header,
    };

    axios(config)
      .then(function (response) {
        res.send({ count: response.data.count });
      })
      .catch(function (error) {
        res.send();
      });
  }
});

//dionaea reports cukko find the top 15 most severe binaries
// Done
router.get(
  "/dionaea_reports/topSeverity_binaries/:number/",
  async (req, res) => {
    const userId = req.headers.authorization;
    const honeypots = await getHoneypotIds(userId);

    if (honeypots && honeypots.length > 0) {
      const machineid = honeypots[0];

      var data = JSON.stringify({
        _source: ["hash", "score"],
        size: req.params.number,
        sort: [
          {
            score: {
              order: "desc",
            },
          },
        ],
      });

      var config = {
        method: "get",
        url: `https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/${machineid}\`dionaea_reports/_search?filter_path=hits.hits._source`,
        headers: elastic_header,
        data: data,
      };

      axios(config)
        .then(function (response) {
          const dataarr = response.data.hits.hits;
          //console.log(dataarr);
          const data = [];
          dataarr.forEach(ele => {
            data.push({ hash: ele._source.hash, score: ele._source.score });
          });
          res.send(data);
        })
        .catch(function (error) {
          res.send();
        });
    }
  }
);

router.get("/iptable/all_interaction/count/", async (req, res) => {
  const userId = req.headers.authorization;
  const userHoneypots = await getHoneypotIds(userId);
  if (userHoneypots && userHoneypots.length === 0) {
    res.send({ count: 0 });
  } else if (userHoneypots == null) {
    res.send({ count: -1 });
  } else {
    var config = {
      method: "get",
      url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`iptable_requests/_count",
      headers: elastic_header,
    };

    axios(config)
      .then(function (response) {
        res.send({ count: response.data.count });
      })
      .catch(function (error) {
        res.send();
      });
  }
});

// Fake scans identify by comparing most num of scans from country and no resonable interaction. iptables
//type == "interaction" or type =="scan"
router.get("/iptables_requests/countries/access/:type", async (req, res) => {
  var data = JSON.stringify({
    _source: ["country", "result"],
    size: 15,
    query: {
      term: {
        result: req.params.type,
      },
    },
    aggs: {
      countries: {
        terms: {
          field: "country.keyword",
        },
      },
    },
  });

  var config = {
    method: "get",
    url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`iptable_requests/_search?filter_path=aggregations.countries.buckets",
    headers: elastic_header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      const dataArr = response.data.aggregations.countries.buckets;
      // countries = [];
      // count = [];
      // dataArr.forEach((ele) => {
      //   countries.push(ele.key);
      //   count.push(ele.doc_count);
      // });
      // res.send({ countries, count });
      res.send(dataArr);
    })
    .catch(function (error) {
      res.send();
    });
});

// web requests a3 count type of payloads used by same ips

router.get("/web_requests/payloads/count/", async (req, res) => {
  var data = JSON.stringify({
    aggs: {
      payloads: {
        terms: {
          field: "detection.keyword",
        },
      },
    },
  });

  var config = {
    method: "get",
    url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`web_requests/_search?filter_path=aggregations.payloads.buckets",
    headers: elastic_header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      const dataArr = response.data.aggregations.payloads.buckets;
      res.send(dataArr);
    })
    .catch(function (error) {
      res.send([]);
    });
});
//each attack on each honeypot TODO we need to discuss this

//TODO ips attack of different payloads

//TODO ip md5 hash compare  -- unique hash from ips = dangerous

router.get("/smb/country/", async (req, res) => {
  const userId = req.headers.authorization;
  const honeypots = await getHoneypotIds(userId);

  if (honeypots && honeypots.length > 0) {
    const machineid = honeypots[0];
    var data = JSON.stringify({
      size: 0,
      aggs: {
        genres: {
          terms: {
            field: "country",
          },
        },
      },
    });

    var config = {
      method: "get",
      url: `https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/${machineid}\`dionaea_requests/_search`,
      headers: elastic_header,
      data: data,
    };

    axios(config)
      .then(function (response) {
        var data_obj = response.data.aggregations.genres.buckets;
        res.send(data_obj);
      })
      .catch(function (error) {
        res.send([]);
      });
  } else {
    res.send([]);
  }
});

//create API for //https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/61f698a595f02df0153cba5a`web_requests/_search on attackerIP
router.get("/smb/timestamp/", async (req, res) => {
  const userId = req.headers.authorization;
  const honeypots = await getHoneypotIds(userId);

  if (honeypots && honeypots.length > 0) {
    const machineid = honeypots[0];
    var data = JSON.stringify({
      size: 0,
      aggs: {
        field_conn: {
          terms: {
            field: "connection_timestamp",
          },
        },
      },
    });

    var config = {
      method: "get",
      url: `https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/${machineid}\`dionaea_requests/_search`,
      headers: elastic_header,
      data: data,
    };

    const DATE_FORMAT = "DD-MM-YYYY";
    axios(config)
      .then(function (response) {
        var data_obj = response.data.aggregations.field_conn.buckets;
        //console.log(data_obj);
        var data = [];
        var date = [];
        //TODO data repeated here from elastic search.
        data_obj.forEach(docs => {
          if (
            !date.includes(
              moment(new Date(docs.key * 1000)).format(DATE_FORMAT)
            )
          ) {
            data.push({
              x: moment(new Date(docs.key * 1000)).format(DATE_FORMAT),
              y: docs.doc_count,
            });
            date.push(moment(new Date(docs.key * 1000)).format(DATE_FORMAT));
          }
        });
        res.send(data);
      })
      .catch(function (error) {
        res.status(400);
        res.send([]);
      });
  } else {
    res.send([]);
  }
});

//create API for https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/62558e285529969891a081a3`dionaea_requests/_search on  connection_timestamp

router.get("/web/timestamp", async (req, res) => {
  const userId = req.headers.authorization;
  const honeypots = await getHoneypotIds(userId);

  if (honeypots && honeypots.length > 0) {
    const machineid = honeypots[0];
    var data = JSON.stringify({
      size: 50000,
      aggs: {
        field_conn: {
          terms: {
            field: "datetime",
          },
        },
      },
    });

    var config = {
      method: "get",
      url: `https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/${machineid}\`web_requests/_search`,
      headers: elastic_header,
      data: data,
    };

    const DATE_FORMAT = "DD-MM-YYYY";
    axios(config)
      .then(function (response) {
        var data_obj = response.data.aggregations.field_conn.buckets;
        //console.log(data_obj);
        var data = [];
        var date = [];
        //TODO data repeated here from elastic search.
        data_obj.forEach(docs => {
          if (
            !date.includes(
              moment(new Date(docs.key * 1000)).format(DATE_FORMAT)
            )
          ) {
            data.push({
              x: moment(new Date(docs.key * 1000)).format(DATE_FORMAT),
              y: docs.doc_count,
            });
            date.push(moment(new Date(docs.key * 1000)).format(DATE_FORMAT));
          }
        });
        res.send(data);
      })
      .catch(function (error) {
        res.status(400);
        res.send();
      });
  }
});

router.get("/web/attacks", async (req, res) => {
  var data = JSON.stringify({
    size: 0,
    aggs: {
      attack_data: {
        terms: {
          field: "attackerIP",
        },
      },
    },
  });

  var config = {
    method: "get",
    url: "https://cynergizer-ce1e21.es.us-central1.gcp.cloud.es.io:9243/61f698a595f02df0153cba5a`web_requests/_search",
    headers: elastic_header,
    data: data,
  };

  axios(config)
    .then(function (response) {
      var data_obj = response.data.aggregations.attack_data.buckets;
      // var ips = [];
      // var occurence = [];
      // data_obj.forEach((docs) => {
      //   ips.push(docs.key);
      //   occurence.push(docs.doc_count);
      // });

      // res.send({ ips, occurence });
      res.send(data_obj);
    })
    .catch(function (error) {
      res.send();
    });
});

module.exports = router;
