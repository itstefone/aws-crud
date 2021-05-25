const { getProductById } = require("../../utils/product");

exports.handler = async (event, context, callback) => {
  let response;
  let product;

  let productId = event.pathParameters.product;

  try {
    product = await getProductById(productId);
  } catch (e) {
    response = {
      statusCode: 400,
      body: JSON.stringify(e),
    };
    return response;
  }

  response = {
    statusCode: 200,
    body: JSON.stringify({ product }),
  };

  return response;
};
