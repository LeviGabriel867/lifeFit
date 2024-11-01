import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Rota de cadastro
router.post('/', async (request, response) => {
    const { email, name } = request.body;

    const userExists = await prisma.user.findUnique({
        where: { email }
    });

    if (userExists) {
        return response.status(422).json({ msg: 'Usuário já cadastrado' });
    }

    const newUser = await prisma.user.create({
        data: { email, name }
    });

    response.status(201).json(newUser);
});

// Rota para listar todos os usuários
router.get('/', async (request, response) => {
    const users = await prisma.user.findMany();
    response.status(200).json(users);
});

// Rota para atualizar um usuário
router.put('/:id', async (request, response) => {
    const { email, name } = request.body;
    const { id } = request.params;

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(id, 10) },
        data: { email, name }
    });

    response.status(201).json(updatedUser);
});

// Rota para deletar um usuário
router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    await prisma.user.delete({
        where: { id: parseInt(id, 10) }
    });

    response.status(200).json({ message: "Usuário deletado." });
});

// Rota de login
router.post('/login', async (request, response) => {
    const { email } = request.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return response.status(404).json({ message: "Usuário não cadastrado" });
        } else {
            // Redirecionamento ou resposta personalizada
            response.status(200).json({ message: "Login bem-sucedido", user });
        }
    } catch (error) {
        response.status(500).json({ message: "Erro no login", error });
    }
});

export default router;
