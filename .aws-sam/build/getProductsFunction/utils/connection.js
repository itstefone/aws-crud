const mysql = require('mysql2');
const {env}  = require('./env');

const {user, password, host, database} = env.dbConfig;
let pool;

async function initConnection() {
    pool =  mysql.createPool({
        user,
        password,
        host,
        database,
        connectionLimit: 5
    }
    );
}
 exports.runQuery =  async function runQuery(query, placeholder = []) {
    if(!pool) {
        await initConnection();
    }
    return new Promise((resolve, reject) => {
        pool.query(query, placeholder, (err, results) => {
            if(err) {
                reject(err);
            }
            resolve(results);
        })
    });
}











