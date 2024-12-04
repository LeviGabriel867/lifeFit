import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();

app.use(express.json())
app.use(cors( ))

app.get('/signup/:id', async (req, res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.params.id
        }
    }); 
    res.status(200).json(user);                                                                                                                                                                                                                                            
})

app.get('/login', async(req, res)=>{
    const {name, password} = req.body;
    try{
       const user = await prisma.user.findUnique({
        where: user.name = name

        
    });
    if(!user || user.password !== password){
        return res.status(401).json({error: "Nome ou senha inválida"});
    }

    res.status(200).json({id: user.id, name: user.name});

}
    catch(error){
        res.status(500).json({error: "Erro no login"})
    }
}) 
    
    

app.post('/signup', async (req, res)=>{
    const {name, password} = req.body;

    if(!name || !password){
        return res.status(400).json({error:"Name e password devem ser preenchidos"});
    }
    
    try{
        
        const userUnique = await prisma.user.findFirst({
            where: { name },
        });
        if(userUnique){
            return res.status(409).json({error: "Error, nome de usuário deve ser único. "})
        }

            const hashPassword = await bcrypt.hash(password,10);

            const user = await prisma.user.create({
                data:{
                    name,
                    password: hashPassword,
                },
            });
        res.status(201).json(user)  
        
        
    }
    catch (error){
        console.error(error)
        res.status(500).json({error: "Falha ao criar usuário"});
    }
    
});

app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ error: "Name e password devem ser preenchidos" });
  }

  try {
    // Busca o usuário pelo campo name
    const user = await prisma.user.findFirst({
      where: { name },
    });

    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Compara a senha fornecida com o hash no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    // Retorna dados do usuário sem a senha
    return res.status(200).json({
        name: user.name,
        id:user.id
      //user: { id: user.id, name: user.name },
    });
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});


const port = 3000;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
});