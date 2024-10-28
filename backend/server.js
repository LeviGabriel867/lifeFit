import express from "express";
import cors from 'cors';
import usuarioRoutes from './routes/cadastro_user.js'
import treinosRoutes from './routes/treinos.js'



const app = express();

app.use(express.json()); 
app.use(cors());

app.use('/usuarios', usuarioRoutes);
app.use('/treinos', treinosRoutes);

app.listen(3000, ()=>{
    console.log("Servidor rodando na porta 3000");
});