
const multipart = require('lambda-multipart-parser');
const {storageToS3} = require('../../utils/storage');
const {env} = require('../../utils/env');
const {runQuery} = require('../../utils/connection');


exports.handler = async (event, context, callback) => {

    const body =  await multipart.parse(event);

    const file = body.files[0];

    try {
    let url = await storageToS3(file);

    let product = {
        name: body.name,
        price: body.price,
        description: body.description,
        image: url
    };
    const names = Object.keys(product);
    const values = Object.values(product);
    
    const query = `INSERT INTO ${env.tables.products} (${names.join()}) VALUES(${values.map(v => '?').join()})`;
    console.log('query',query);
    console.log('values', values);
    let result = await runQuery(query, values);

    product = {
        ...product,
        id: result.insertId
    }
} catch(e) {
    console.log(e);
    return {
        statusCode: 400,
        body: JSON.stringify({message: e.message})
    }
}

    
    return {
        statusCode: 201,
        body: JSON.stringify({message: 'Successfully created product!', product})
    }
}