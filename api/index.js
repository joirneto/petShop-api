const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos')

const app = express();

app.use(bodyParser.json());

app.use('/api/fornecedores',router)

app.use((erro, req, res, next)=>{
  let status = 500;

  if(erro instanceof NaoEncontrado){
    status = 404
  } 

  if(erro instanceof CampoInvalido || erro instanceof DadosNaoFornecidos ){
    status = 400
  }
  
  res.status(status);
  res.send(
    JSON.stringify({
      mensagem: erro.message,
      id: erro.idErro
    })
  )
})

app.listen(config.get('api.port'), ()=>{
  console.log("Servidor ok!");
});