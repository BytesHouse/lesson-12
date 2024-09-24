import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
import express from 'express'
import { user } from "./models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config();
const url = process.env.MONGO_DB_URL

const client = new MongoClient(url);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Соединение успешное')
        app.listen(3005, () => {
            console.log('Сервер запущен')
        })
    } catch (error) {
        console.log('Ошибка при соединении с MongoDB')
        throw error;
    }
}

const app = express();
app.use(express.json())

app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const profile = await user.findOne({ email })

        if (profile) {
            return res.status(400).json({ message: 'Пользователь существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new user({ email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'Пользователь создан' })

    } catch (error) {
        res.status(500).json({ message: 'Что то пошло не так' })
    }
})

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const profile = await user.findOne({ email })
        if (!profile) {
            return res.status(400).json({ message: 'Не найден пользователь' })
        }
        const isMatch = await bcrypt.compare(password, profile.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный пароль' })
        }

        const token = jwt.sign(
            { userId: profile.id },
            'secretic',
            { expiresIn: '1h' }
        );
        res.json({ token, userId: profile.id })
    } catch (error) {
        res.status(500)
    }
})

connectToDatabase();