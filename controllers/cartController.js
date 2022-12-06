const cartController = {
  renderCartPage (req,res) {
    try {
      res.render("cart");
    } catch (error) {
      console.error(error);
      res.status(404).render("404");
    }
  }
};

module.exports = cartController;
