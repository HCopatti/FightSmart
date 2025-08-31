import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";

import bcrypt from 'bcrypt';


const app = express();
const prisma = new PrismaClient(); 

app.use(cors());
app.use(express.json()); // permite enviar JSON no body

function authMiddleware(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization; // pega o token do cabeçalho
    if (!authHeader) return res.status(401).json({ error: "Token faltando" });
    
    const token = authHeader.split(" ")[1]; // separa "Bearer <token>"
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded; // adiciona os dados do usuário na requisição
        next();             // segue para a rota final
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}

// ======================
// Rota de registro
// ======================
app.post('/register', async (req: Request, res: Response) => {
    const { username, email, password }: { username: string; email: string, password: string } = req.body;
    
    
    // Validação de campos
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
    }
    try {
        // Checa se usuário já existe
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "Usuário já registrado" });
        }
        
        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Cria usuário no banco
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        
        res.json({ message: "Usuário registrado com sucesso!", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }   
});

// ======================
// Rota de login
// ======================

app.post('/login', async (req: Request, res: Response) => {
    const { email, password }: { email: string; password: string } = req.body;
    
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Email ou senha inválidos" });
        }
        
        // 🔑 Gerar JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email },   // payload
            process.env.JWT_SECRET as string,        // chave secreta
            { expiresIn: "1h" }                      // expira em 1 hora
        );
        
        // Enviar token junto com info do usuário
        res.json({ message: "Login bem-sucedido!", token, user: { id: user.id, email: user.email, username: user.username } });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao tentar logar" });
    }
});

app.get("/perfil", authMiddleware, (req: any, res: any) => {
    // Aqui só chega se o token for válido
    res.json({ user: req.user });
});

// get dados
app.get("/dados", authMiddleware, (req: any, res: any) => {
    // Aqui só chega se o token for válido
    res.json({ 
        message: "Acesso permitido!",
        user: req.user
    });
});


// ======================
// Start server
// ======================

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});