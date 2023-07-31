const express = require("express");
const router = express.Router();
const user = require("../models/auth_schema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const jwt_word = "thisisjwttoken";
const fetchuser = require("../middleware/fetchuser");
// endpoint for creating the user
//  /api/auth/newUser
// console.log("hii");
router.post(
  "/signup",
  body("email", "Please Check The Email Again").isEmail(),
  body("name", "Please Enter Minimum 5 characters").isLength({ min: 5 }),
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ msg: errors.array(),success:success });
      // console.log(errors);
    }

    try {
      let exist = await user.findOne({ email: req.body.email });
      // console.log("this is value of exist");
      // console.log(exist);
      if (exist) {
        // return res.send("Email Already Exist , Enter New Email");
        return res.json({msg:"Email Already Exist , Enter New Email",success:success})
      } 
      if ((exist = await user.findOne({ name: req.body.name }))) {
        // return res.send("User Name Already Exist, Enter Unique User Name");
        return res.json({msg:"User Name Already Exist, Enter Unique User Name",success:success})
      }

      const saltRounds = 10;
      let hash_pass = bcrypt.hashSync(req.body.password, saltRounds);
      new_user = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: hash_pass,
      });

      await new_user.save();
      let data = {
        user: {
          id: new_user._id,
        },
      };
      
      var token = jwt.sign(data, jwt_word);
      success=true;
      res.send({ token ,success:success});
      //   res.send(new_user);
      console.log("saved succefully");
    } catch (error) {
      res.status(400).json({ msg: error.message ,success:success});
    }
  }
);
//  endpoint  /api/auth/login

router.post(
  "/login",
  body("email", "Please Check The Email Again").isEmail(),
  body("password", "Enter The Pssword").notEmpty(),
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ msg: errors.array(),success:success });
      // console.log(errors);
    }

    try {
      const { email, password } = req.body;
      user_check = await user.findOne({ email });
      if (!user_check) {
        // res.send("Enter The Correct Credinatials");
        return res.json({msg:"Enter The Correct Credinatials",success:success })
      } else {
        let pass_match = await bcrypt.compare(password, user_check.password);
        if (!pass_match) {
        return res.json({msg:"Enter The Correct Credinatials"})
        // res.send("Enter The Correct Credinatials");
        } else {
          let data = {
            user: {
              id: user_check._id,
            },
          };
          var token = jwt.sign(data, jwt_word);
          success=true;
          res.send({ token,success:success  });
          console.log("Login Completed");
        }
      }
    } catch (error) {
      res.status(400).json({ error: error.message,success:success });
    }
  }
);

// endpoint /api/auth/getlogin
// this will give the id by giving the auth token to the user
// and fetchuser will be go with the the notes
router.get("/getlogin", fetchuser, async (req, res) => {
  try {
    let userid = req.user.id;
    // console.log(userid);
    const client = await user.findById(userid).select("-password");
    res.send(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
