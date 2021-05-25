const {runQuery} = require('./connection');
const {env} = require('./env');

exports.getProductById = async (productId) => {

    const query = `SELECT * FROM ${env.tables.products} WHERE id = ?`;

    if(!productId) throw new Error('ProductId is not sent');

    const result = await runQuery(query, productId);


    if(result.length) {
        console.log(result);
        return result[0];
    }


    throw new Error("Product wasn't found!");
    

}
