const mongoose = require("mongoose");

//models
const Token = require("../models/Tokens");
const Attacker = require("../models/Attacker");

const get_Tokens_by_id = userid => {
  const ObjectId = mongoose.Types.ObjectId;
  return {
    $match: {
      generated_by: ObjectId(userid),
    },
  };
};

const get_Token_Count = async (req, res) => {
  const userid = req.headers.authorization;
  try {
    const aggCursor = Token.aggregate([
      get_Tokens_by_id(userid),
      {
        $group: {
          _id: "$type",
          doc_count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    const data = [];
    let recon_num = 0;
    let macro_num = 0;
    for await (const docs of aggCursor) {
      data.push(docs);
      if (docs._id !== "excel_vba") {
        recon_num += docs.doc_count;
      } else {
        macro_num += docs.doc_count;
      }
    }
    res.send({
      data,
      recon: {
        _id: "recon",
        doc_count: recon_num,
      },
      macro: {
        _id: "macro",
        doc_count: macro_num,
      },
    });
  } catch (err) {
    console.log("this an error from /tokens/summary/:uid", err);
  }
};

const get_Num_of_Accessed_Tokens = async (req, res) => {
  const userid = req.headers.authorization;
  try {
    const aggCursor = Token.aggregate([
      get_Tokens_by_id(userid),
      {
        $lookup: {
          from: "tokenaccesses",
          localField: "_id",
          foreignField: "token_id",
          as: "data",
        },
      },
      {
        $project: {
          accessed_count: {
            $cond: {
              if: {
                $isArray: "$data",
              },
              then: {
                $size: "$data",
              },
              else: "-1",
            },
          },
        },
      },
      {
        $group: {
          _id: "compromised_beacons_count",
          accessed_count: {
            $sum: "$accessed_count",
          },
        },
      },
    ]);
    const Accessed_Token_Count = [];
    for await (const docs of aggCursor) {
      Accessed_Token_Count.push(docs.accessed_count);
    }
    res.send(Accessed_Token_Count);
  } catch (err) {
    console.log("this an error from /database/token/generated/:uid", err);
  }
};

const get_table_data = async (req, res) => {
  const userid = req.params.uid;
  try {
    const aggCursor = Token.aggregate([
      get_Tokens_by_id(userid),
      {
        $lookup: {
          from: "tokenaccesses",
          localField: "_id",
          foreignField: "token_id",
          as: "data",
        },
      },
      {
        $lookup: {
          from: "attackers",
          localField: "data.accessed_by",
          foreignField: "_id",
          as: "attackerdata",
        },
      },
      {
        $unset: ["generated_by", "data"],
      },
    ]);
    let all_token_data = [];
    for await (const doc of aggCursor) {
      all_token_data.push(doc);
    }
    res.send(all_token_data);
  } catch (err) {
    console.log("error from /token/compromised/uid", err);
  }
};

const getAllAttackerTokenPath = async (req, res) => {
  const ObjectId = mongoose.Types.ObjectId;
  const userId = req.headers.authorization;
  try {
    const aggCursor = Attacker.aggregate([
      {
        $lookup: {
          from: "tokenaccesses",
          localField: "_id",
          foreignField: "accessed_by",
          as: "attacker_tokens",
        },
      },
      {
        $lookup: {
          from: "tokens",
          localField: "attacker_tokens.token_id",
          foreignField: "_id",
          as: "attacker_type_tokens",
        },
      },
      {
        $match: {
          attacker_type_tokens: {
            $elemMatch: {
              generated_by: ObjectId(userId),
            },
          },
        },
      },
      {
        $lookup: {
          from: "techniques",
          localField: "attacker_type_tokens.techniqueId",
          foreignField: "_id",
          as: "techniques",
        },
      },
      {
        $sort: {
          "attacker_tokens[0].created_at": -1,
        },
      },
      {
        $unset: [
          "coordinates",
          "__v",
          "attacker_tokens._id",
          "attacker_tokens.accessed_by",
          "attacker_type_tokens._id",
          "attacker_type_tokens.generated_by",
          "attacker_type_tokens.accessible",
          "attacker_type_tokens.__v",
        ],
      },
    ]);
    const attackersTokensDetail = [];
    for await (const docs of aggCursor) {
      attackersTokensDetail.push(docs);
    }
    res.send({ status: 1, data: attackersTokensDetail.flat() });
  } catch (err) {
    res.send({ status: 0, msg: err });
  }
};

const get_Attacker_tokens = async (req, res) => {
  const ip = req.body.ip;

  try {
    const aggCursor = Attacker.aggregate([
      {
        $match: {
          ip: ip,
        },
      },
      {
        $lookup: {
          from: "tokenaccesses",
          localField: "_id",
          foreignField: "accessed_by",
          as: "attacker_tokens",
        },
      },
      {
        $lookup: {
          from: "tokens",
          localField: "attacker_tokens.token_id",
          foreignField: "_id",
          as: "attacker_type_tokens",
        },
      },
      {
        $lookup: {
          from: "techniques",
          localField: "attacker_type_tokens.techniqueId",
          foreignField: "_id",
          as: "techniques",
        },
      },
      {
        $sort: {
          "attacker_tokens[0].created_at": -1,
        },
      },
      {
        $unset: [
          "coordinates",
          "__v",
          "attacker_tokens._id",
          "attacker_tokens.accessed_by",
          "attacker_type_tokens._id",
          "attacker_type_tokens.generated_by",
          "attacker_type_tokens.accessible",
          "attacker_type_tokens.__v",
        ],
      },
    ]);
    const attackerTokenDetails = [];
    for await (const docs of aggCursor) {
      attackerTokenDetails.push(docs);
    }
    res.send({ status: 1, data: attackerTokenDetails.flat() });
  } catch (err) {
    res.send({ status: 0, msg: err });
  }
};

const get_compromised_tokens_location = async (req, res) => {
  const userid = req.params.uid;
  try {
    const aggCursor = Token.aggregate([
      get_Tokens_by_id(userid),
      {
        $lookup: {
          from: "tokenaccesses",
          localField: "_id",
          foreignField: "token_id",
          as: "data",
        },
      },
      {
        $lookup: {
          from: "attackers",
          localField: "data.accessed_by",
          foreignField: "_id",
          as: "attackersdata",
        },
      },
      {
        $project: {
          _id: 1,
          type: 1,
          created_at: 1,
          attackersdata: 1,
        },
      },
    ]);
    let attackerdata = [];
    for await (const doc of aggCursor) {
      attackerdata.push(doc);
    }
    res.send(attackerdata);
  } catch (err) {
    console.log("error from /token/getcompromisedlocation/uid", err);
  }
};

module.exports = {
  get_Token_Count,
  get_Num_of_Accessed_Tokens,
  get_table_data,
  get_compromised_tokens_location,
  get_Attacker_tokens,
  getAllAttackerTokenPath,
};
