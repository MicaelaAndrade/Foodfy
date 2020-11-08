const Recipe = require("../models/Recipe");
const Chef = require("../models/Chef");
const File = require("../models/File");

module.exports = {
  async index(req, res) {
    let results = await Recipe.all();
    const recipes = results.rows;

    if (!recipes) return res.send("Recipes not found!");

    async function getImage(recipeId) {
      let results = await Recipe.files(recipeId);
      const files = results.rows.map((file) => {
        return `${req.protocol}://${req.headers.host}${file.path.replace(
          "public",
          ""
        )}`;
      });

      return files[0];
    }

    const recipesPromise = recipes.map(async (recipe) => {
      recipe.img = await getImage(recipe.id);

      return recipe;
    });

    const lastAdded = await Promise.all(recipesPromise);

    return res.render("admin/recipes/index", { recipes: lastAdded });
  },
  async show(req, res) {
    const { id } = req.params;

    let results = await Recipe.find(id);
    const recipe = results.rows[0];

    if (!recipe) return res.send("Recipe not found!");

    results = await Chef.find(recipe.chef_id);
    const chef = results.rows[0];

    results = await Recipe.files(recipe.id);
    const files = results.rows.map((file) => ({
      ...file,
      src: `${req.protocol}://${req.headers.host}${file.path.replace(
        "public",
        ""
      )}`,
    }));

    return res.render("admin/recipes/show", { recipe, chef, files });
  },
  async create(req, res) {
    let results = await Chef.all();
    const chefs = results.rows;

    return res.render("admin/recipes/create", { chefs });
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    if (req.files.length == 0)
      return res.send("Please, send at least one image.");

    let results = await Recipe.create(req.body);
    const recipeId = results.rows[0].id;

    const filesPromise = req.files.map((file) => {
      File.create({ ...file, recipe_id: recipeId });
    });

    await Promise.all(filesPromise);

    return res.redirect(`/admin/recipes/${recipeId}`);
  },
  async edit(req, res) {
    const { id } = req.params;

    let results = await Recipe.find(id);
    const recipe = results.rows[0];

    results = await Chef.all();
    const chefs = results.rows;

    return res.render("admin/recipes/edit", { recipe, chefs });
  },
  async put(req, res) {
    const keys = Object.keys(req.body);

    keys.map((key) => {
      if (req.body[key] === "") {
        return res.send("Please, fill all fields!");
      }
    });

    await Recipe.update(req.body);

    return res.redirect(`/admin/recipes/${req.body.id}`);
  },
  async delete(req, res) {
    await Recipe.delete(req.body.id);

    return res.redirect(`/admin/recipes`);
  },
};
