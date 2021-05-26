const {getProductById, deleteProduct} = require('../../utils/product');

exports.handler = async (event, context, callback) => {

    let response;

    const productId = event.pathParameters.product;

    try {
        const product = await getProductById(productId);

        let deleteResponse = await deleteProduct(product);

    } catch(e) {
        console.log(e.message);
        response = {
            statusCode: 400,
            body: JSON.stringify({message: e.message})   
        }

        return response;
    }

    response = {
        statusCode: 204
    }


    return response;


}