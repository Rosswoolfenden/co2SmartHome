const config = require('../config');
const logging = require("../logging/logging");
const log = logging.createLogger("validate");
const validater = require('email-validator');
const maria = require('../db/mariaDB/mysqlConnect');
const bycrypt = require('bcrypt');
const saltRounds = 10;


exports.register = async (details) => {
    const email = details.email;
    let password = details.password;
    try {
        const valid = await validate(email, password);
        if (!valid) {
            return ({Error: "invaid email adress or password"});
        }
        const count = await checkUserExsits(email);
        if (!count) {
            return ({Error: 'Email already exists in database'});
        }
        const salt = bycrypt.genSaltSync(saltRounds);
        password = bycrypt.hashSync(password, salt)
        
        return addUser(email, password);

    } catch (e) {
        return {Error: "Unable to complete at this time"}
    }
} 

async function addUser(email ,password) {
    try {
        values =[email, password];
        const add = await maria.sqlQuery('INSERT INTO users(email, password) VALUES (?, ?)', values);
        return({success: 'Added to database'});
    } catch (e) {
        return ({Error: 'Failed to add to database, try again later'});
    }
}

async function checkUserExsits (email) {
    const count = await maria.sqlQuery('SELECT COUNT(*) FROM users WHERE email = ?', [email]);
    if (Object.values(count[0]) == 0) {
        return true;
    } else {
        return false;
    }
}

async function validate (email, password) {
    if (!validater.validate(email)) {
        log.error('Invalid email adress');
        return false;
    }
    // todo : better password validation
    if (password.length < 5) {
        return false;
    }
    return true;
}

exports.login = async (details) => {
    const email = details.email;
    const password =  details.password;
    try {
        const exists = await checkUserExsits(email);
        if (exists) {
            return ({Error: 'Email does not exist, please register'});
        }

        const user = await maria.sqlQuery(`SELECT * FROM users WHERE email = ?`, [email]);
        const hashPassword = user[0].password;
        if( bycrypt.compareSync(password, hashPassword)) {
            return ({success: `Succesfully logged on`, user: user[0].ID});
        } else {
            return ({Error: 'Passwords do not match'});
        }
    } catch (e) { 
        log.error(e);
        return ({Error: 'Failed to login, try again later'});
    }

}