const knex = require('./knex');

module.exports = {
    getAllArticles(){
        return knex('article').select('*');
    }
}