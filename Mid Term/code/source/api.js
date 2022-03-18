const crypto = require('crypto');
const bluebird = require('bluebird');
const mysql = require('mysql2/promise');
const fs = require('fs');

// const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);

//----------|| cryptTextAES
const cryptTextAES = async (text, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    //-----encrypt

    const encrypt = (text) => {

        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            content: encrypted.toString('hex')
        };
    };

    //-----decrypt

    const decrypt = (hash) => {

        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

        return decrpyted.toString();
    };

    //-----running

    let encryptText = encrypt(text);

    let decryptText = decrypt(encryptText);

    try {
        const [rows, fields] = await connection.execute('INSERT INTO aes (content, encrypt, decrypt) VALUES (?,?,?)', [text, encryptText.content, decryptText]);
    } catch (err) {
        console.log(">>> Check Error Crypt Text AES :", err)
    }

};

//----------|| cryptFileAES

const cryptFileAES = async (file, secretKey) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'bmtt',
        Promise: bluebird
    });

    const data = fs.readFileSync(file, 'utf8')

    let newFile = file + "_Encrypt" + ".txt"

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

    let fileEncypt = encrypted.toString('hex');

    fs.writeFileSync('encrypt_Output.txt', fileEncypt)

    try {
        const [rows, fields] = await connection.execute('INSERT INTO aes (content, encrypt, decrypt) VALUES (?,?,?)', [file, newFile, "Success!"]);
    } catch (err) {
        console.log(">>> Check Error Crypt File AES :", err)
    }

};

//----------|| read database
const readDatabase = async () => {

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
        console.log(">>> Check Error Read Database :", err)
    }
}

//----------|| export module

module.exports = {
    cryptTextAES,
    cryptFileAES,
    readDatabase
};

// const { encrypt, decrypt } = require('./crypto');

// const hash = encrypt('Vinh đẹp trai');

// console.log(hash);

// const text = decrypt(hash);

// console.log(text); // Vinh đẹp trai