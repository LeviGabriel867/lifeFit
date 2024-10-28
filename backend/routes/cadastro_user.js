import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

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

router.get('/', async (request, response) => {
    const users = await prisma.user.findMany();
    response.status(200).json(users);
});

router.put('/:id', async (request, response) => {
    const { email, name } = request.body;
    const { id } = request.params;

    const updatedUser = await prisma.user.update({
        where: { id },
        data: { email, name }
    });

    response.status(201).json(updatedUser);
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;

    await prisma.user.delete({
        where: { id }
    });

    response.status(200).json({ message: "Usuário deletado." });
});

export default router;
