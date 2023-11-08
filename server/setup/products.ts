import {save} from "../src/core/repository";
import {productModelName} from "../src/modules/product/model";
// @ts-ignore
import {getFakeProduct} from "../test/mock-routes/product-controller-mock";

const seed = async (logger:any) => {
  const products:any = [];
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
    products.map(async (product:any) => {
      const savedProduct = await save(product, productModelName);
      logger.info(`Saved product id: ${savedProduct._id}`);
    })
  );
  logger.info("Seeding products completed");
};

export { seed };
