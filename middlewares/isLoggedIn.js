function isLoggedIn(req, res, next) {
  // (object || null) ==> (true || false)
  const isConnected = !! req.session.userId;
  // Si l'utilisateur est connecté, on le laisse passer
  if (isConnected) {
    return next();
  }

  res.status(401).redirect("/login");
}

module.exports = isLoggedIn;
