const Modelo = require('./ModeloTabelaFornecedor');

module.exports = {
  listar (){
    return Modelo.findAll()
  },
  inserir(fornecedor){
    return Modelo.create(fornecedor)
  },
  async getId(id){
    const fornecedor = await Modelo.findOne({
      where: {
        id:id
      }
    })

    if(!fornecedor){
      throw new Error("Fornecedor não encontrado!")
    }

    return fornecedor
  },
  atualizar(id, dadosAtualizar){
    return Modelo.update(
      dadosAtualizar,
      {
        where: {id:id}
      }
    )
  },
  remover(id){
    return Modelo.destroy({
      where: {id:id}
    })
  }

}