const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');
const instancia = require('../../data-base');

router.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar()
  res.status(200)
  res.send(
    JSON.stringify(resultados)
  )
})

router.post('/', async (req, res, next) => {
  try{
    const data = req.body;
    const fornecedor = new Fornecedor(data);
    await fornecedor.criar();
    res.status(201)
    res.send(
      JSON.stringify(fornecedor)
    )
  }catch(erro){
    next(erro)
  }
})

router.get('/:idFornecedor', async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id })
    await fornecedor.carregar()
    res.status(200)
    res.send(
      JSON.stringify(fornecedor)
    )
  } catch (erro) {
    next(erro)
  }
})

router.put('/:idFornecedor', async (req, res, next) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const data = Object.assign({}, dadosRecebidos, { id: id })
    const fornecedor = new Fornecedor(data);
    await fornecedor.atualizar()
    res.status(204)
    res.end()
  }
  catch (erro) {
    next(erro)
  }
})

router.delete('/:idFornecedor', async (req, res, next) =>{
  try{
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({id:id});
    await fornecedor.carregar()
    await fornecedor.remover()
    res.status(204)
    res.end()
  }
  catch(erro){
    next(erro)
  }
})

module.exports = router;