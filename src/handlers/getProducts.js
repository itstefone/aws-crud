const {env} = require('../../utils/env');
const {runQuery} = require('../../utils/connection');

exports.handler = async (event, context, callback) => {

    const query = `SELECT * FROM ${env.tables.products}`;

    const result = await runQuery(query);


    console.log(result);


    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }

}