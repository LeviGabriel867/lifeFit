import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/', async (request, response) => {
    const { exercicio, repeticoes, series } = request.body;
    const { userId } = request.params;

    try {
        const newTreino = await prisma.treino.create({
            data: { exercicio, repeticoes, series, userId }
        });
        response.status(201).json(newTreino);
    } catch (error) {
        response.status(500).json({ error: "Erro ao criar o treino." });
    }
});

router.get('/', async (request, response) => {
    const treinos = await prisma.treino.findMany();
    response.status(200).json(treinos);
});

export default router;
