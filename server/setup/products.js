const { save } = require("../src/core/repository");
const { name: ModelName } = require("../src/modules/product/model");
const {
  getFakeProduct,
} = require("../test/mock-routes/product-controller-mock");

const seed = async (logger) => {
  const products = [];
  logger.info(`Seeding products`);

  // eslint-disable-next-line func-names
  await (async function () {
    for (let i = 0; i < 40; i++) {
      // eslint-disable-next-line no-await-in-loop
      const product = await getFakeProduct();
      products.push(product);
    }
  })();

  await Promise.all(
    products.map(async (product) => {
      const savedProduct = await save(product, ModelName);
      logger.info(`Saved product id: ${savedProduct._id}`);
    })
  );
  logger.info("Seeding products completed");
};

module.exports = { seed };
