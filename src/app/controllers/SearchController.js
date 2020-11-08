const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    try {
      let { filter } = req.query;

      if (!filter) return res.redirect("/recipes");

      let results = await Recipe.search(filter);
      const filteredRecipes = results.rows;

      return res.render("user/results", { recipes: filteredRecipes, filter });
    } catch (error) {
      console.log(`Search error: ${error}`);
    }
  },
};
