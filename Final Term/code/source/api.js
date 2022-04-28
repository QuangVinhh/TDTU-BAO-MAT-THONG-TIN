const crypto = require('crypto');
const bluebird = require('bluebird');
const mysql = require('mysql2/promise');

// const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const algorithm = 'aes-256-cbc';
const secret_iv = 'smslt';
const iv = crypto.createHash('sha512').update(secret_iv, 'utf-8').digest('hex').substr(0, 16);

//----------|| encryptAES and decryptAES
const encryptAES = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----encrypt
    let encryptor = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    let content = Buffer.from(encrypted).toString('base64');

    //-----running
    try {
        const [rows, fields] = await connection.execute('INSERT INTO aes (content, encrypt, decrypt) VALUES (?,?,?)', [text, content, ""]);
    } catch (err) {
        console.log(">>> Check Error Encrypt AES :", err)
    }

};

const decryptAES = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let content = text;
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----decrypt
    const buff = Buffer.from(text, 'base64');
    text = buff.toString('utf-8');
    let decryptor = crypto.createDecipheriv(algorithm, key, iv);

    //-----running
    try {
        let decryptText = decryptor.update(text, 'base64', 'utf8') + decryptor.final('utf8');
        const [rows, fields] = await connection.execute('INSERT INTO aes (content, encrypt, decrypt) VALUES (?,?,?)', [content, "", decryptText]);
    } catch (err) {
        console.log(">>> Check Error Decrypt AES :", err)
    }

};

//----------|| encryptServerA and decryptServerA
const encryptServerA = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----encrypt
    let encryptor = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    let content = Buffer.from(encrypted).toString('base64');

    //-----running
    let statusA = "Sent To Server B";
    let statusB = "Received From Server A";
    let result = "Success !";

    try {
        const [rowsA, fieldsA] = await connection.execute('INSERT INTO server_a (status, content, result) VALUES (?,?,?)', [statusA, text, result]);

        const [rowsB, fieldsB] = await connection.execute('INSERT INTO server_b (status, content, result) VALUES (?,?,?)', [statusB, content, result]);
    } catch (err) {
        console.log(">>> Check Error Encrypt Server A :", err)
    }

};

const decryptServerA = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let temp = text;
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----decrypt
    const buff = Buffer.from(text, 'base64');
    text = buff.toString('utf-8');
    let decryptor = crypto.createDecipheriv(algorithm, key, iv);


    //-----running
    let status = "Decrypting";
    let error = "Error !";

    try {
        let content = decryptor.update(text, 'base64', 'utf8') + decryptor.final('utf8');
        const [rows, fields] = await connection.execute('INSERT INTO server_a (status, content, result) VALUES (?,?,?)', [status, temp, content]);
    } catch (err) {
        const [rows, fields] = await connection.execute('INSERT INTO server_a (status, content, result) VALUES (?,?,?)', [status, temp, error]);
        // console.log(">>> Check Error Decrypt Server A :", err)
    }

};

//----------|| encryptServerB and decryptServerB
const encryptServerB = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----encrypt
    let encryptor = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = encryptor.update(text, 'utf8', 'base64') + encryptor.final('base64');
    let content = Buffer.from(encrypted).toString('base64');

    //-----running
    let statusA = "Received From Server B";
    let statusB = "Sent To Server A";
    let result = "Success !";

    try {
        const [rowsA, fieldsA] = await connection.execute('INSERT INTO server_a (status, content, result) VALUES (?,?,?)', [statusA, content, result]);

        const [rowsB, fieldsB] = await connection.execute('INSERT INTO server_b (status, content, result) VALUES (?,?,?)', [statusB, text, result]);
    } catch (err) {
        console.log(">>> Check Error Encrypt Server B :", err)
    }

};

const decryptServerB = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----check key
    let temp = text;
    let key = crypto.createHash('sha512').update(secretKey, 'utf-8').digest('hex').substr(0, 32);

    //-----decrypt
    const buff = Buffer.from(text, 'base64');
    text = buff.toString('utf-8');
    let decryptor = crypto.createDecipheriv(algorithm, key, iv);


    //-----running
    let status = "Decrypting";
    let error = "Error !";

    try {
        let content = decryptor.update(text, 'base64', 'utf8') + decryptor.final('utf8');
        const [rows, fields] = await connection.execute('INSERT INTO server_b (status, content, result) VALUES (?,?,?)', [status, temp, content]);
    } catch (err) {
        const [rows, fields] = await connection.execute('INSERT INTO server_b (status, content, result) VALUES (?,?,?)', [status, temp, error]);
        // console.log(">>> Check Error Decrypt AES :", err)
    }

};

//----------|| read database

const dataHome = async () => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM aes');
        return rows;
    } catch (err) {
        console.log(">>> Check Error Database Home:", err)
    }
}

const dataServerA = async () => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM server_a');
        return rows;
    } catch (err) {
        console.log(">>> Check Error Database Server A:", err)
    }
}

const dataServerB = async () => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM server_b');
        return rows;
    } catch (err) {
        console.log(">>> Check Error Database Server B:", err)
    }
}

//----------|| export module

module.exports = {
    encryptAES,
    decryptAES,
    dataHome,

    encryptServerA,
    decryptServerA,
    dataServerA,

    encryptServerB,
    decryptServerB,
    dataServerB
};