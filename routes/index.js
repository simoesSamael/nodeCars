
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  const registros = await global.db.listarCarros()
  res.render('index', { title: 'Express', registros });
});

router.get('/novoCarro', function(req, res) {
  res.render('formCarros', { titulo: 'Novo Carro' , acao: 'novoCarro'})
}); 

router.get('/alteraCarro/:id', async function(req, res) {
  
});

router.get('/apagaCarro/:id', async function(req, res) {
  const codigo = parseInt(req.params.id);
  await global.db.apagaCarros(codigo);
  res.redirect('/');
}); 

router.post('/novoCarro', async function(req, res){
  const modelo = req.body.edtModelo;
  const ano = req.body.edtAno;
  const marca = req.body.selMarca;

  await global.db.inserirCarro({modelo, ano, marca});
  res.redirect('/')
})

module.exports = router;
