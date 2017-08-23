var express= require('../config/express')();
var request = require('supertest')(express);

describe('ProdutosController',function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query('delete from produtos', function(ex,results){
            if(!ex){
                done();
            }
        })
    });

    it('listagem json',function(done){
        request.get('/produtos')
            .set('Accept','application/json')
            .expect('Content-Type',/json/)
            .expect(200,done);          
    });

    
    it('#listagem de produtos html', function (done) {
        request.get('/produtos')
            .expect('Content-Type', /html/)
            .expect(200,done)

    })

    it('#cadastro de um novo produto com dados invalidos', function (done) {
        request.post('/produtos')
            .send({titulo:"",descricao:"livro de teste"})
            .expect(400,done)

    });

    it('#cadastro de novo produto com dados validos', function(done){
        request.post('/produtos')
            .send({titulo : "titulo novo", descricao : "novo livro", preco : 20.59})
            .expect(302, done);
    });

 

    it('#cadastro de um novo produto com tudo preenchido', function (done) {
        request.post('/produtos')
            .send({titulo:"novo livro",preco:20.50,descricao:"livro de teste"})
            .expect(302, done)

    });

});