import express from 'express';

const app = express();
app.use(express.json());

process.on('uncaughtException', (err) => {
    console.error('[ERRO DE PROCESSO - uncaughtException]: ', err.message);
});
process.on('unhandledRejection', (reason) =>{
    console.error('[PROMISE REJEITADA - uncaughtRejection]: ', reason);
});
  app.get('/sucesso', (req, res) => {
    res.json({sucess: true, message: 'Operação Realizada com sucesso!'});
  });

  app.get('/erro-sincrono', (req, res, next) => {
    try{
        throw new Error('Falha ao processar a Regra de Negócios! ');
    }
    catch(erro){
        next(erro);
    }
  });

  app.get('/erro-assincrono', async(req, res, next) => {
    try{
        await Promise.reject(new Error('Erro na consulta no banco de dados externo'));
    }catch(erro){
        next(erro);
    }
  });

  app.use((err, req, res, next) =>{

    console.error(`[LOG DE ERRO INTERNO]: ${err.stack}`);

    const status = err.status || 500;
    res.status(status).json({
        sucess: false,
        message: err.message || 'Erro interno do Servidor'
    });

  });

  app.listen(3000,() =>{
    console.log('Servidor imortal rodando na porta 3000');
  });

