import mysql from 'mysql'
import config from '../src/config'

const  conn = mysql.createConnection({
    host: '81.68.183.252', // 数据库的地址
    port: "3306",
    user: 'vueshop', // 账号
    password: 'k6fCnCZs32eBXiti', // 密码
    database: 'vueshop', // 数据库名称
    multipleStatements: true,  // 允许多条sql同时查询
});

conn.connect();

export default conn;