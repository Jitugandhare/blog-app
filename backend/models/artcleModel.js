const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  body: String,
  user: String,
  userID: String,
  category: String,
  live: Boolean,
});

const ArticleModel = mongoose.model("note", articleSchema);

module.exports = {
  ArticleModel,
};
