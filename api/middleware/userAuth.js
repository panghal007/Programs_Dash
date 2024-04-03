//importing modules
const express = require("express");
const sequelize = require("../db/connection");
//Assigning db.users to User variable
const jwt = require("jsonwebtoken");

const { DataTypes } = require("sequelize");
const User = require("../models/userModel")(sequelize, DataTypes);

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveUser = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).send("username already taken");
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).send("Authentication failed");
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

//exporting module
module.exports = {
  saveUser,
};
