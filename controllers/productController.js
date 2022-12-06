const productController = {
  renderProductPage (req,res) {
    try {
      res.render("product");
    } catch (error) {
      console.error(error);
      res.status(404).render("404");
    }
  }
};

module.exports = productController;
