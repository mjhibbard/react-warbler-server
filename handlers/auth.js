const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  //finding a user
  try {
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    //checking it their password matches what was sent to the server
    if (isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      },
        process.env.SECRET_KEY
      );
      //if it all matches
      //log them in
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password."
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: "Invalid email/password. Next time will go better, we hope."
    });
  }


}

exports.signup = async function (req, res, next) {
  try {
    //create user
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    //create a token(signing a token)
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    //if a validation fails!
    if (err.code === 11000) {
      //respond with username/email already taken
      err.message = "Sorry, that username and/or email is taken";
    }
    //otherwise just send back a generic 400
    return next({
      status: 400,
      message: err.message
    });
  }
};