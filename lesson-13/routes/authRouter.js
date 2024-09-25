import { Router } from "express";
import { user } from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        const profile = await user.findOne({ email })

        if (profile) {
            return res.status(400).json({ message: 'Пользователь существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new user({ email, password: hashedPassword })
        await newUser.save()
        const token = jwt.sign(
            { userId: newUser.id },
            'secretic',
            { expiresIn: '1h' }
        )
        res.status(201).json({ message: 'Пользователь создан', token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Что то пошло не так' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const profile = await user.findOne({ email }) // error ORM
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
        console.log(error)
        res.status(500)
    }
})

export default router