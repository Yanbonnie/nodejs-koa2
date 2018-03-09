const mysql = require('mysql');
const Config = require('../config/index.js');

//连接池
const pool = mysql.createPool(Config.db);

// const pool = mysql.createPool({
//   host     :  '127.0.0.1',
//   user     :  'root',
//   password :  '123456',
//   database :  'my_database'
// })

let queryDb = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = { queryDb }