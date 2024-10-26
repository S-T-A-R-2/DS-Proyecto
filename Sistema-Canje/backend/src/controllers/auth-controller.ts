//import Encrypter from '../libs/encrypter.js'
//import {createAccessToken} from '../libs/jwt.js'
//import jwt from 'jsonwebtoken'
//import { TOKEN_SECRET } from '../config.js'
import User from '../models/user-model.js'

export const register = async (req, res) => {
    const {username, name, email, password } = req.body
    try {
        const users = await User.find({username : username});
        if (res.length > 0) {
            console.log("Usuario ya existente");
            res.json({message: "Error: Usuario existente."});
        } else {
            const newUser = new User({
                username,
                name,
                email,
                password
            });
            const savedUser = newUser.save();
            res.json(savedUser);
        }
    } catch (error : any) {
        res.json({message: "Error: Usuario existente."});
    }

    /*const encrypter = new Encrypter(process.env.ENCRYPT_KEY)
    const email_e = encrypter.encrypt(email);
    const password_e = encrypter.encrypt(password);
    const name_e = encrypter.encrypt(name);*/
    
};

/*export const register = async (req, res) => {
    const {email, password, name, username} = req.body;
    //Encryption
    for await(const result of client.queryIterable(ps)) {
        console.log(`Retrieved ${result.rows.length} rows`);
        console.log(result.rows);
        if (result.rows.length > 0) {
            res.json({Message: "Ya existe"});
            return true;
        }
    }
    const user = {
        username: username,
        email: email_e,
        password: password_e,
        name: name_e
    };
    await client.put('user', user);
    const token = await createAccessToken({ id: username, username });
    res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: false
    });
    res.json({ message: "User registered", username, email, name });
}*/

/*export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        let ps = await client.prepare(
            'DECLARE $username STRING;  SELECT * ' +
            'FROM user WHERE username = $username');
            ps.set('$username', username);
        for await(const result of client.queryIterable(ps)) {
            if (result.rows.length == 0) {
                return res.status(404).json({ messages: ['User not found'] });
            }
            
            const user = result.rows[0];
            const encrypter = new Encrypter(process.env.ENCRYPT_KEY);
            const decryptedPassword = encrypter.decrypt(user.password);

            if (decryptedPassword !== password) {
                return res.status(401).json({ messages: ['Incorrect Password'] });
            }
            const token = await createAccessToken({ id: username, username });
            res.cookie('token', token, {
                sameSite: 'none',
                secure: true,
                httpOnly: false
            });
            return res.status(200).json({ message: 'Login successful', username });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ messages: ['Error logging in user', error.message] });
    }
};

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async (req, res) => {
    let ps = await client.prepare(
        'DECLARE $username STRING;  SELECT * ' +
        'FROM user WHERE username = $username');
        ps.set('$username', req.user.username);
    for await(const result of client.queryIterable(ps)) {
        if (result.rows.length == 0) {
            return res.status(404).json({ messages: ['User not found'] });
        }
        const user = result.rows[0];
        const encrypter = new Encrypter(process.env.ENCRYPT_KEY);
        return res.json({user: req.user.username, email: encrypter.decrypt(user.email), name: encrypter.decrypt(user.name), password: encrypter.decrypt(user.password)});
    }
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies
    if (!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    jwt.verify(token, TOKEN_SECRET, async (err, decoded) => {
        if (err) return res.status(403).json({message: "authorization denied"});
        const {username} = decoded;
        
        let ps = await client.prepare(
            'DECLARE $username STRING;  SELECT * ' +
            'FROM user WHERE username = $username');
            ps.set('$username', username);
        for await(const result of client.queryIterable(ps)) {
            if (result.rows.length == 0) {
                return res.status(404).json({ messages: ['authorization deniedd'] });
            }
            const user = result.rows[0];
            const encrypter = new Encrypter(process.env.ENCRYPT_KEY);
            return res.json({
                username,
                email: encrypter.decrypt(user.email),
                name: encrypter.decrypt(user.name),
                password: encrypter.decrypt(user.password)
            });
        }
    });
};*/