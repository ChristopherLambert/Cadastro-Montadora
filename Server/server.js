//Express
var express = require('express'); //import do mÃƒÂ³dulo
var app = express(); //Cria uma instancia do express
var bodyParser = require('body-parser');
app.listen(5000); //App irÃƒÂ¡ responder na porta 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');    
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
	res.end('Servidor ON POHA!');
});
//Mongose 
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("conectado");
});

//Esquema MONTADORAS
var montadoraSchema = new mongoose.Schema({
    name: String,
    ano: Number,
    photo: String,
});
var Montadora = mongoose.model('Montadora', montadoraSchema);

//Post new montadora
app.post('/newmontadora', function(req, res) {
    var pol = new Montadora({
      name: req.body.nome,
      ano: req.body.ano,
      photo: req.body.photo,
    });
  
    pol.save(function(err, pol) {
      if (err) return  res.json({msg: 'error'});
      return res.json({msg: 'Montadora cadastrada com sucesso'});
    });
});

app.get('/getFull', function(req, res) {
  Montadora.find({}, function(err, pols) {
    res.json(pols);
    //  res.send(pols.reduce(function(polMap, item) {
    //    polMap[item.id] = item;
    //      return polMap;
    //  }, {}));
  });
  // return list(Montadora.find())
});
  

