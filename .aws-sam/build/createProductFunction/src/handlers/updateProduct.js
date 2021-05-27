
const multipart = require('lambda-multipart-parser');
const {storageToS3} = require('../../utils/storage');
const {env} = require('../../utils/env');
const {runQuery} = require('../../utils/connection');
const { getProductById } = require('../../utils/product');
const { validateCreateBodyProduct } = require('../../utils/validator');


exports.handler = async (event, context, callback) => {

    const allowedFieldsAndValidation = {name:['validateString'], price: ['validateNumber'], description:['validateString']};
    const body =  await multipart.parse(event);
    const givenFields = Object.keys(body);
    const allowedFields = Object.keys(allowedFieldsAndValidation);
    try {
    const toValidate = allowedFields.reduce((acc, curr) => {
        console.log(acc,curr);
        acc[curr] = allowedFieldsAndValidation[curr];

        return acc;
    }, {});

    console.log(toValidate);
    await validateCreateBodyProduct(body, toValidate);

    const acceptedFields = givenFields.filter(f => {
        return allowedFields.includes(f);
    });
    const productId = event.pathParameters.product;
    let imageUrl;
  
    const fileImage = body.files.length > 0 ? body.files[0] : false;
   
        let dbProduct = await getProductById(productId);
        let product = {};
        if(fileImage !== false) {
            imageUrl = await storageToS3(file);
            product['image'] = imageUrl;
        }
        

        let fieldKeyValue = ``;
        for(let i = 0; i < acceptedFields.length; i++) {
            product[acceptedFields[i]] = body[acceptedFields[i]];
            fieldKeyValue += `${acceptedFields[i]} = ?`;
            if(i !== acceptedFields.length - 1) {
                fieldKeyValue += `, `;
            }
        }
    const query = `UPDATE  ${env.tables.products} SET  
    ${fieldKeyValue}
    WHERE id = ?`;
    
    let values = Object.values(product);
    let result = await runQuery(query, [...values, dbProduct.id]);

    console.log(result);
 
} catch(e) {
    console.log(e);
    return {
        statusCode: 400,
        body: JSON.stringify({message: e.message})
    }
}

    
    return {
        statusCode: 203,
        body: JSON.stringify({message: 'Successfully updated product with id'})
    }
}