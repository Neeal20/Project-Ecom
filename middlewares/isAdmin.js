function isAdmin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).redirect("/login"); // On renvoie à la route `/login`
  }

  const user = req.app.locals.user; // On a besoin de récupérer l'user

  if (user.role !== "admin") { // Si l'user n'est pas admin, je le renvoie sur la home
    return res.status(404).render("404");
  }

  next();
}

module.export = isAdmin;
