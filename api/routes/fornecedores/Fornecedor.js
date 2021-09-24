const TabelaFornecedor = require('./TabelaFornecedor')

class Fornecedor {
  constructor({id,empresa, email, categoria, dataCriacao, dataAtualizacao, versao}){
    this.id = id,
    this.empresa = empresa,
    this.email = email,
    this.categoria = categoria,
    this.dataCriacao = dataCriacao,
    this.dataAtualziacao = dataAtualizacao,
    this.versao = versao
  }

  async criar (){
    this.validar()
    const resultado = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    })

    this.id = resultado.id;
    this.dataCriacao = resultado.dataCriacao;
    this.dataAtualziacao = resultado.dataAtualziacao;
    this.versao = resultado.versao;
  }

  async carregar(){
    const fornecedor = await TabelaFornecedor.getId(this.id)
    this.empresa = fornecedor.empresa,
    this.email = fornecedor.email,
    this.categoria = fornecedor.categoria,
    this.dataCriacao = fornecedor.dataCriacao,
    this.dataAtualziacao = fornecedor.dataAtualizacao,
    this.versao = fornecedor.versao
  }

  async atualizar(){
    await TabelaFornecedor.getId(this.id)
    const campos = ['empresa', 'email', 'categoria']
    const dadosAtualizar = {}

    campos.forEach((campo) => {
      const valor = this[campo]
      if(typeof valor === 'string' && valor.length > 0){
        dadosAtualizar[campo] = valor
      }
    })
    if(Object.keys(dadosAtualizar).length === 0){
      throw new Error('Não foram encontrados dados para atualizar!')
    }
    await TabelaFornecedor.atualizar(this.id, dadosAtualizar);
  }

  async remover(){
    return TabelaFornecedor.remover(this.id)
  }

  validar(){
    const campos = ['empresa', 'email', 'categoria'];

    campos.forEach(campo =>{
      const valor = this[campo]
      if(typeof valor !== 'string' || valor.length === 0){
      throw new Error(`O campo ${campo} está invalido!`)
      }
    })
  }
}

module.exports = Fornecedor;