const express = require("express");
const { ArticleModel } = require("../models/article.model");

const articleRouter = express.Router();

articleRouter.get("/", async (req, res) => {
  
  try {
    const article = await ArticleModel.find({user});
    res.send("All the article");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

articleRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const article = new ArticleModel(payload);
    await article.save();
    res.send({ msg: "Article created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

articleRouter.delete("/delete/:id", async (req, res) => {
  try {
    const articleID = req.params.id;
    await ArticleModel.findByIdAndDelete({ _id: articleID });

    res.send("Deleted");
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

articleRouter.patch("/update/:articleID", async (req, res) => {
  const { articleID } = req.params;
  try {
    await ArticleModel.findByIdAndUpdate({ _id: articleID }, req.body);
    res.status(200).send({ msg: `The article with id:${articleID} has been updated` });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = {
  articleRouter
};