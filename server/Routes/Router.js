const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");




// Pass
const { verifyToken } = require("../core");
const middleware = verifyToken;
express().use(middleware);

// models
const PostitModel = require("../Models/Postit");
const UserModel = require("../Models/User");
const AuthModel = require("../Models/Auth");

router.get("/msg",async (req,res)=>{
   res.json({ message: "ok"});
})

// routes
router.post("/register", async (req, res) => {
  let exist = false;
  const data = await req.body;
  if (data) {
    if ((await UserModel.findOne({ email: data.email })) == undefined || null) {
      const obj = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      await obj.save();
      res.json({ "success": "success" })
    } else exist = true;
  } else exist = true;
  if (exist) res.json({ "exist": "exist deja" });
});

router.post("/login", async (req, res) => {
  let error = false;
  const data = await req.body;
  if (data) {
    const query = await UserModel.findOne({ email: data.email });
    if (query !== undefined || null) {
      if (!query) error = true;
      if (query) {
        if (bcrypt.compareSync(data.password, query.password)) {
          const token = jwt.sign({ user: data.email }, process.env.decodekey, {expiresIn: "3600s"});
          const pass = new AuthModel({
            id: query.email,
            tunnel: token,
          });
          try {
            const data = await pass.save();
            res.status(200).json({message: "successful login", user: data.id});
            error = false;
          } catch (err) {
            res.status(400).json({ err: err.message });
          }
        } else error = true;
      }
    } else error = true;
  }
  if (error) res.json({ err: "error" })
});

router.get("/postits/:userid", middleware, async (req, res) => {
  try {
    let user = await UserModel.findOne({email:req.params.userid});
    const data = await PostitModel.find(
      { userId: req.params.userid },
      { _id: 0 }
    );
    res.json({ "username": user.fullName, "data": data });
  } catch (err) {
    res.json({ err: err.message });
  }
});

router.post("/postit/add", middleware, async (req, res) => {
  const obj = new PostitModel({
    id: uuid.v4(),
    postit: req.body.postit,
    userId: req.body.userId,
  });

  try {
    const data = await obj.save();
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete("/allpostits/:userid", middleware, async (req, res) => {
  try {
    const obj = await PostitModel.deleteMany({ userId: req.params.userid });
    res.send(obj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//getpassport
router.get("/pass/:user",async (req,res) => {
  try {
    let user = await AuthModel.findOne({id:req.params.user});
    res.status(200).json({ token : user.tunnel });
  } catch (err) {
    res.json({ err: err.message });
  }
})

//logout
router.delete("/logout/pass/:user",middleware,async (req,res) => {
  try {
    const job = await AuthModel.deleteMany({ id: req.params.user });
    res.status(200).json({message :"bye"});
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
})
module.exports = router;
