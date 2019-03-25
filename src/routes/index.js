const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async (req,res) => {
    // res.send('Hello world');
    //renderizo /view/index, no le digo la url porque la
    //defini en app.js
    const tasks = await Task.find();
    res.render('index',{
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    
    res.redirect('/');
});


router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;

    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();

    res.redirect('/');
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);

    res.render('edit',{task});

});

router.post('/saveEdit', async (req, res) => {
    console.log(req.body.id);
    const task = await Task.findById(req.body.id);
    task.title = req.body.title;
    task.description = req.body.description;
    task.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({
        _id: id
    });
    res.redirect('/');
})

module.exports = router;