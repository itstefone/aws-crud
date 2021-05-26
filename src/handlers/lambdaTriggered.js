

exports.handler = async (event, context,callback) => {
    
    let response;

    console.log(event.Records[0].Sns);
    console.log('Hello from Lambda Triggered!');


    response = {
        statusCode:200,
        body: JSON.stringify({
            message: 'success triggered lambda by sns!'
        })
    }

    return response;




}