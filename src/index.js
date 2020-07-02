require('dotenv').config()
const routes = require('./routes');
const express = require('express');
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express();

//Conexão com o BD
mongoose.connect(process.env.MONGO_URL ,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use(cors()); //todos os dominios acessam
app.use(express.json());
app.use(morgan('dev'));
app.use("/files", express.static(path.resolve(__dirname,'..', 'tmp', 'uploads')))//cria uma rota para mostrar os arquivos enviados

app.use(routes);


app.listen(process.env.PORT || 3000);