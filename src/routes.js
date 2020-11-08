const express = require("express");

const HomeController = require("./app/controllers/HomeController");
const RecipeController = require("./app/controllers/RecipeController");
const AdminRecipeController = require("./app/controllers/AdminRecipeController");
const ChefController = require("./app/controllers/ChefController");
const AdminChefController = require("./app/controllers/AdminChefController");
const SearchController = require("./app/controllers/SearchController");

const multer = require("./app/middlewares/multer");

const routes = express.Router();

routes.get("/", HomeController.index);
routes.get("/about", HomeController.about);

routes.get("/recipes", RecipeController.index);
routes.get("/recipes/:id", RecipeController.show);

routes.get("/admin/recipes", AdminRecipeController.index);
routes.get("/admin/recipes/create", AdminRecipeController.create);
routes.post(
  "/admin/recipes",
  multer.array("photos", 5),
  AdminRecipeController.post
);
routes.get("/admin/recipes/:id", AdminRecipeController.show);
routes.get("/admin/recipes/:id/edit", AdminRecipeController.edit);
routes.put(
  "/admin/recipes",
  multer.array("photos", 5),
  AdminRecipeController.put
);
routes.delete("/admin/recipes", AdminRecipeController.delete);

routes.get("/chefs", ChefController.index);

routes.get("/admin/chefs", AdminChefController.index);
routes.get("/admin/chefs/create", AdminChefController.create);
routes.post("/admin/chefs", AdminChefController.post);
routes.get("/admin/chefs/:id", AdminChefController.show);
routes.get("/admin/chefs/:id/edit", AdminChefController.edit);
routes.put("/admin/chefs", AdminChefController.put);
routes.delete("/admin/chefs", AdminChefController.delete);

routes.get("/results", SearchController.index);

module.exports = routes;
