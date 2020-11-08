const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let results = await Chef.getTotalRecipes();
    const chefs = results.rows;

    return res.render("user/chefs", { chefs });
  },
};
