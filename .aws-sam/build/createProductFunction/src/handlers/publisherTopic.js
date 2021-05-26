const AWS = require('aws-sdk');
const {env} = require('../../utils/env');
const SNS = new AWS.SNS({
    accessKeyId: env.awsCredentials.accessKey,
    secretAccessKey: env.awsCredentials.secretKey
});



exports.handler = async (event, context, callback) => {

    let response;


   await  SNS.publish({
        Message: 'Just a test',
        TopicArn: 'arn:aws:sns:eu-central-1:641874005858:test-topic'
    }, (err, data) => {
        if(err) {
            console.log(err.stack);
            return;
        }


        console.log('push sent');
        console.log(data);
    })
    response = {
        statusCode: 200,
        body: JSON.stringify({message:'Lambda Published', input: event})
    };
    callback(null, response);
}