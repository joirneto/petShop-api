const ModeloTabelaFornecedor = require('../routes/fornecedores/ModeloTabelaFornecedor');

ModeloTabelaFornecedor
  .sync()
  .then(()=>console.log("Tabela criada com sucesso"))
  .catch(console.log("Erro"))