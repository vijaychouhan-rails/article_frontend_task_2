const express = require('express');
const { response } = require('../app');
const router = express.Router();
const db = require('../db/knex');//knex connection

function isValidId(req,res,next) {
    if(!isNaN(req.params.id)) return next();
    next(new Error('Invalid id'));
}

router.get('/', (req,res)=>{
    db
    .from('article')
    .select('*')
    .orderBy('id', 'desc')
    .then(articles =>{
        res.json(articles);
    })
});

//Get article by id
router.get('/:id',isValidId, (req,res)=>{
    db
    .from('article')
    .select('*')
    .where('id',req.params.id)
    .then(article =>{
        if(article.length > 0){
        res.json(article[0]);
        }else{
            res.sendStatus(404)
        }
    })
});
router.patch('/:id', (req,res)=>{
    req.body.updated_at = new Date();
    db('article')
    .where('id',req.params.id)
    .update(req.body)
    .returning('*')
    .then(article =>{
        res.json(article[0]);
    })
});
router.delete('/:id', (req,res)=>{
    db('article')
    .where('id',req.params.id)
    .delete()
    .then(article =>{
        res.status(204).json({remarks:"successfully deleted article"});
    })
});

router.post('/', (req,res)=>{
    db
    .insert(req.body)
    .into('article')  
    .returning("*")  
    .then(articles =>{
        console.log("HElllo",articles);
        res.status(201).json(articles[0]);
    })
});

module.exports = router;