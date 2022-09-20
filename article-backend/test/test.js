const knex = require('../db/knex');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');

describe('Test for articles',()=>{
    before('Drop Tables for testing', (done)=>{
        knex.migrate.rollback()
        .then(()=>{
            done();
        });
    })
    before('Run migration and seeds' , (done)=>{
        knex.migrate.latest()
        .then(()=>{
            return knex.seed.run();
        }).then(()=> done() );
    });

    it('should run the migrations',(done)=>{
        console.log('Migrating');
        done();
    });

    it('get all articles.', function(done) {
        request(app)
          .get('/api/articles')
          .expect('Content-Type', /json/)
          .expect(200)
          .then(response => {
            expect(response.body).to.be.a('array');
            expect(response.body.length).to.be.equal(3);
            done();
          })
      });
    it('get article by id.', function(done) {
        request(app)
          .get('/api/articles/1')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
      it('post new article ', function(done) {
        request(app)
          .post('/api/articles')
          .send({heading:"CreateArticle", content: 'new article'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .end(function(err, res) {
            if (err) return done(err);
            return done();
          });
      });
    
});