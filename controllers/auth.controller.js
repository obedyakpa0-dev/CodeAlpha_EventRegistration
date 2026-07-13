const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        if (!email || !username || !password) {
            return res.status(400).json({ message: "Field missing input" });
        };

        const result = await db.query('SELECT * FROM users WHERE email =$1', [email]);
        if (result.rows[0]) {
            return res.status(400).json({ message: "User already exists" });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.query(
          "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
          [username, email, hashedPassword],
        );
        const newUser = user.rows[0];
        const token = generateToken(newUser.id);
        res.status(201).json({
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    };

};



const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Field missing input" });
        };


        const result = await db.query('SELECT * FROM users WHERE email =$1', [email]);
        const user = result.rows[0];
        if(!user) return res.status(401).json({ message: "Invalid Credentials" });
        const match= await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid Credentials" });
        };

        const token = generateToken(user.id);
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    };

};

const me=(async (req, res)=>{
    res.status(200).json(req.user)
});


const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET,{expiresIn: '4d'})
}


module.exports = { register, login, me };




