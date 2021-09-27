const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')
const formatosAceitos = require('./Serializador').formatosAceitos
const SerializadorErros = require('./Serializador').SerializadorErros

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) =>{
  let formatoReq = req.header('Accept');

  if(formatoReq === '*/*'){
    formatoReq = 'application/json'
  }
  
  if (formatosAceitos.indexOf(formatoReq) === -1){
    res.status(406)
    res.end()
    return
  }

  res.setHeader('Content-Type', formatoReq);
  next()
})

app.use('/api/fornecedores',router)

app.use((erro, req, res, next)=>{
  let status = 500;

  if(erro instanceof NaoEncontrado){
    status = 404
  } 

  if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
    status = 400
  }

  if(erro instanceof ValorNaoSuportado){
    status = 406
  } 
  
  const serializador = new SerializadorErros(
    res.getHeader('Content-Type')
  )
  res.status(status);
  res.send(
    serializador.serializar({
      mensagem: erro.message,
      id: erro.idErro
    })
  )
})

app.listen(config.get('api.port'), ()=>{
  console.log("Servidor ok!");
});