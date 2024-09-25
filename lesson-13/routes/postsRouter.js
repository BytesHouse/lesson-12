import { Router } from "express";
import { Post } from "../models/Post.js";

const router = Router();

router.post('/create', async (req, res) => {
    try {
        const { userId, post } = req.body;
        const newPost = await Post.create({
            userId, post
        })

        res.status(201).json({ message: 'Создан пост' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Что то пошло нет, post не был создан' })
    }

}) // создание постов
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.statusMessage(500).json({ message: 'Что то пошло не так' })
    }
}) // получить все посты

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.statusMessage(500).json({ message: 'Что то пошло не так' })
    }
})

export default router;