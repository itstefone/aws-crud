const {runQuery} = require('./utils/connection');



let testing = async () => {
    let result =  await runQuery('DELETE FROM products',[]);
    return result;
}


const lalala =  testing() ;

console.log(lalala);