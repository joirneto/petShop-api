const router = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor')

router.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar()
  res.send(
    JSON.stringify(resultados)
  )
})

router.post('/', async (req, res) => {
  const data = req.body;
  const fornecedor = new Fornecedor(data);
  await fornecedor.criar();

  res.send(
    JSON.stringify(fornecedor)
  )
})

router.get('/:idFornecedor', async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id })
    await fornecedor.carregar()
    res.send(
      JSON.stringify(fornecedor)
    )
  } catch (erro) {
    res.send(
      JSON.stringify({
        mensagem: erro.message
      })
    )
  }
})

router.put('/:idFornecedor', async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const dadosRecebidos = req.body;
    const data = Object.assign({}, dadosRecebidos, { id: id })
    const fornecedor = new Fornecedor(data);
    await fornecedor.atualizar()
    res.end()
  }
  catch (erro) {
    res.send(
      JSON.stringify({
        mensagem: erro.message
      })
    )
  }
})

module.exports = router;