const { User, SalesProduct, Sale, Product } = require('./database/models');

const functionModelTest = async () => {
  const user = (await User.findAll()).map((item) => item.dataValues)
  const salesProduct = (await SalesProduct.findAll()).map((item) => item.dataValues)
  const sale = (await Sale.findAll()).map((item) => item.dataValues)
  const product = (await Product.findAll()).map((item) => item.dataValues)

  const newObj = {user, salesProduct, sale, product}

  console.log(newObj);

  return newObj
}

functionModelTest()