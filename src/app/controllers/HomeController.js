const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    const recipes = results.rows;

    if (!recipes) return res.send("Recipes not found!");

    const homeRecipes = recipes.slice(0, 3);

    return res.render("user/home", { recipes: homeRecipes });
  },
  about(req, res) {
    return res.render("user/about");
  },
};
