const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema(
  {
    id:{required:true,type:String},
    tunnel: { required: true, type: String },
  },
  { collection: "auths" }
);

module.exports = mongoose.model("auths", AuthSchema);
