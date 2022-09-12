const { Users, Posts } = require('../db');

const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// router.use()

router.post('/users', async (req, res) => {
    const { name, role, email, password, username, avatar } = req.body;
    try {
        let user = await Users.create({
            name, 
            role, 
            email, 
            password, 
            username, 
            avatar
        })
        res.json(user);
    } catch (err) {
        res.status(404).send(err)
    }
});

router.post('/posts', async (req, res) => {
    const { description, title, content, email } = req.body;
    try {
        let post = await Posts.create({
            description,
            title,
            content
        });
        let user = await Users.findOne({ where: {email} });
        post.setUser(user);
        res.json(post);
    } catch (err) {
        res.status(404).send(err);
    }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;


// {
//     "description" : "asdasdasdasdasdasdasdasdasdasdasdasd",
//     "title" : "zxcaxzczxczxczxc",
//     "content" : "ghjghjghjghjghjghjghjghjghj",
//     "email" : "nicomolina191@hotmail.com"
// }
