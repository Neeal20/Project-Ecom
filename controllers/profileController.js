const bcrypt = require("bcrypt");
const { User } = require("../models/index");
// Import dotenv
require("dotenv/config");

async function changeUserPassword (req,res) {
  try {
    const { email, actualPassword, password, confirm } = req.body;
    console.log({ email , actualPassword, password, confirm });

    // On récupère l'utilisateur dans la Db
    const user = await User.findOne({
      where: { email }
    });

    console.log(user);

    // - CONTROLES DES INPUTS - Vérifier que le password + le confirmation_password match bien.
    if (password !== confirm) {
      res.status(400).render("profile", { errorMessage: "Le mot de passe et sa confirmation ne correspondent pas." });
      return;
    }
    // - On encrypte le mot de passe avant de le stocker dans la BDD
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    console.log(encryptedPassword);

    // On compare l'ancien mdp brute avec le mdp hashé de la bdd
    const isMatchingPassword = await bcrypt.compare(actualPassword, user.password);
    console.log(actualPassword);
    console.log(isMatchingPassword);


    // Si ça matche pas, on renvoie un message d'erreur
    if (!isMatchingPassword) {
      return res.status(401).render('profile', { errorMessage: "Votre mot de passe actuel est incorrect" });
    }
    // Si les deux conditions sont valides : on uptade le mot de passe dans la bdd
    await User.update(
      {
        password: encryptedPassword,
      },
      {
        where: { email: email }
      }
    );

    //   On redirige vers la home page
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render("500");
  }
}

module.exports = {
  changeUserPassword
};

