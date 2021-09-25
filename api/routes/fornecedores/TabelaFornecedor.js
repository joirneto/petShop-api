const Modelo = require('./ModeloTabelaFornecedor');
const NaoEncontrado = require('../../erros/NaoEncontrado');

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
      throw new NaoEncontrado()
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