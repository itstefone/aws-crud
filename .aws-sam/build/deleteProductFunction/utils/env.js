require('dotenv').config();

exports.env =  {
    dbConfig: {
       user: process.env.DB_USERNAME,
       password: process.env.DB_PASSWORD,
       host: process.env.DB_HOST,
       database: process.env.DB_NAME
        },
     tables: {
         products: 'products'
     },
     awsCredentials: {
         accessKey: process.env.AccessKeyID,
         secretKey: process.env.SecretAccessKey,
         bucketName: process.env.BucketName,
         bucketRegion: process.env.BucketRegion
     }   
}