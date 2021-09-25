const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const router = require('./routes/fornecedores');
const NaoEncontrado = require('./erros/NaoEncontrado')

const app = express();

app.use(bodyParser.json());

app.use('/api/fornecedores',router)

app.use((erro, req, res, next)=>{
  if(erro instanceof NaoEncontrado){
    res.status(404)
  } else{
    res.status(400)
  }
  
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