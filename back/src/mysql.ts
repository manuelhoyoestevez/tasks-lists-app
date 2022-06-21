const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export function poolQuery(query: string): Promise<any> {
  return new Promise((resolve, reject) =>
    pool.query(query, (error, results) => (error ? reject(error) : resolve(results))),
  );
}
