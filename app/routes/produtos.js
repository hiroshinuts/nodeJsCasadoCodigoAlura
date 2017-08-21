module.exports = function(app) {
    app.get("/produtos",function(req, res) {

        var connection = app.infra.connectionFactory();
        var produtosBanco = new app.infra.ProdutosDAO(connection);
        produtosBanco.lista(function(err, results){
            res.format({
                html: function(){
                    res.render('produtos/lista',{lista:results});
                },
                json: function(){
                    res.json(results);
                }
            }); 
        });

        connection.end();

    });

    app.get('/produtos/form', function(req,res){
        res.render('produtos/form');
    });

    app.post('/produtos', function(req,res){

        var produto = req.body;
                      
        var connection = app.infra.connectionFactory();
        var ProdutosDAO = new app.infra.ProdutosDAO(connection);
        ProdutosDAO.salva(produto, function(err, results){
            res.redirect('/produtos');
        });
        connection.end();
    });
   

    app.get('/produtos/delete/:id', function(req, res){
        var id = req.params.id; 
        var connection = app.infra.connectionFactory();
        var ProdutosDao = new app.infra.ProdutosDAO(connection);
        ProdutosDao.delete(id, function(err, results){
            if (err){
                return next(err);
            }
            res.redirect("/produtos");                    
        });
        connection.end();
    });

}