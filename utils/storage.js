const AWS = require('aws-sdk');
const {env} = require('../utils/env');


const S3 = new AWS.S3({
    credentials: {
        accessKeyId: env.awsCredentials.accessKey,
        secretAccessKey: env.awsCredentials.secretKey
    },
    region: env.awsCredentials.bucketRegion
});


exports.storageToS3 =   async (file) => {


    const ext = file.filename.split('.')[1];
    const randomName = getRandomString(12);
    const fullName = randomName + '.' + ext;
    
  
    if(file.content.length >=1000000) {
        throw new Error('Image is to large');
    }


    let result =  await S3.upload({
        Body: file.content,
        Bucket: env.awsCredentials.bucketName,
        Key: fullName,
        ACL: "public-read",
        ContentType: file.contentType
    }).promise().catch(err => {
        console.log(err)
        throw new err;
    });
    
    const url = `https://${env.awsCredentials.bucketName}.s3.${env.awsCredentials.bucketRegion}.amazonaws.com/${fullName}`

    
    return url;

}


function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}