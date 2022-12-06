const clc = require("cli-color");
let notice = clc.blue;

const mainController = {
  async renderHomePage(req, res) {
    const user = req.app.locals.user; // On a besoin de récupérer l'user
    console.log(notice(user));
    try {
      res.render("home", { user });
    } catch (error) {
      console.error(error);
      res.status(500).render("500");
    }
  },

  async renderUserProfilePage(req, res) {
    const user = req.app.locals.user;
    console.log(user.firstname);
    res.render("profile", { user });
  }
};

module.exports = mainController;
