const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const userController = require("../controllers/user");
const homeController = require("../controllers/home");
const plotsController = require("../controllers/plots");
const plantsController = require("../controllers/plants");
const { newUserValidationRules, validate } = require("../middleware/validation");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/contact", homeController.getContactForm);
router.post("/contact", homeController.postContact);
router.get("/sent", homeController.getSent);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);

router.get("/signup", userController.getSignup);
router.post("/signup", newUserValidationRules(), validate, userController.postSignup);

router.get("/my-account", ensureAuth, userController.getUserDetails);
router.post("/edit-account", userController.accountUpdate);

router.get("/profile", ensureAuth, plotsController.getUserPlots);
router.get("/start-plot", ensureAuth, plotsController.getPlotCreate);
router.get("/start-collection", ensureAuth, plotsController.getCollCreate);

router.get("/all-plants", ensureAuth, plantsController.getUserPlants);

module.exports = router;
