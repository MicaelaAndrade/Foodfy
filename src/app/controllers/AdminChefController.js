const Chef = require("../models/Chef");
const Recipe = require("../models/Recipe");

module.exports = {
  async index(req, res) {
    let results = await Chef.all();
    const chefs = results.rows;

    if (!chefs) return res.send("Recipes not found!");

    return res.render("admin/chefs/index", { chefs });
  },
  async show(req, res) {
    const { id } = req.params;

    let results = await Chef.find(id);
    const chef = results.rows[0];

    if (!chef) return res.send("Chef not found!");

    results = await Recipe.findByChef(chef.id);
    const recipes = results.rows;

    return res.render("admin/chefs/show", { chef, recipes });
  },
  create(req, res) {
    return res.render("admin/chefs/create");
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    let results = await Chef.create(req.body);
    const chefId = results.rows[0].id;

    return res.redirect(`/admin/chefs/${chefId}`);
  },
  async edit(req, res) {
    const { id } = req.params;

    let results = await Chef.find(id);
    const chef = results.rows[0];

    if (!chef) return res.send("Chef not found!");

    return res.render("admin/chefs/edit", { chef });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    await Chef.update(req.body);

    return res.redirect(`/admin/chefs/${req.body.id}`);
  },
  async delete(req, res) {
    let results = await Chef.find(req.body.id);
    const chef = results.rows[0];

    if (!chef) return res.send("Chef not found!");

    results = await Recipe.findByChef(chef.id);
    const recipes = results.rows;

    if (recipes.length != 0) {
      return res.send(
        "It is not possible to delete this chef because he has registered recipes!"
      );
    }

    await Chef.delete(req.body.id);

    return res.redirect(`/admin/chefs`);
  },
};
