import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client';
// import jwt from "jsonwebtoken";

import bcrypt from 'bcrypt';


const app = express();
const prisma = new PrismaClient(); 

app.use(cors());
app.use(express.json()); // permite enviar JSON no body

// function authMiddleware(req: any, res: any, next: any) {
//     const authHeader = req.headers.authorization; // pega o token do cabeçalho
//     if (!authHeader) return res.status(401).json({ error: "Token faltando" });

//     const token = authHeader.split(" ")[1]; // separa "Bearer <token>"

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//         req.user = decoded; // adiciona os dados do usuário na requisição
//         next();             // segue para a rota final
//     } catch (err) {
//         return res.status(401).json({ error: "Token inválido" });
//     }
// }

// ======================
// Rota de registro
// ======================
app.post('/register', async (req: Request, res: Response) => {
    const { 
        username, email, password, 
        isStudent, isTeacher,
        birthDate: birthDateObject,
        graduationBelt,
        degree, phone, photo,
        academyName
    }: { 
        username: string; 
        email: string; 
        password: string;
        isStudent?: boolean;
        isTeacher?: boolean;
        birthDate: { day: string; month: string; year: string };
        graduationBelt?: string;
        degree?: number;
        phone?: string;
        photo?: string;
        academyName?: string;
    } = req.body;
    
    // Validação de campos
    if (!username || !email || !password || (isTeacher && !academyName)) {
        return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
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
        
        // Formata a data de nascimento
        const birthDateString = `${birthDateObject.year}-${birthDateObject.month}-${birthDateObject.day}T00:00:00.000Z`;
        
        // Prepara os dados de criação do perfil do professor
        let teacherProfileCreation = undefined;
        if (isTeacher && academyName) {
            teacherProfileCreation = {
                create: {
                    academy: {
                        connectOrCreate: {
                            where: { name: academyName },
                            create: { name: academyName }
                        }
                    }
                }
            };
        }

        // Cria o usuário e o perfil relacionado em uma única transação
        const userData: any = {
            username,
            email,
            password: hashedPassword,
            birthDate: new Date(birthDateString).toISOString(),
            graduationBelt: graduationBelt !== undefined ? graduationBelt : null,
            degree: degree !== undefined ? degree : null,
            phone: phone !== undefined ? phone : null,
            photo: photo !== undefined ? photo : null,
        };
        if (isStudent) {
            userData.student = { create: {} };
        }
        if (teacherProfileCreation) {
            userData.teacher = teacherProfileCreation;
        }

        const user = await prisma.user.create({
            data: userData,
            include: {
                student: true,
                teacher: {
                    include: { academy: true }
                }
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
        // const token = jwt.sign(
        //     { userId: user.id, email: user.email },   // payload
        //     process.env.JWT_SECRET as string,        // chave secreta
        //     { expiresIn: "1h" }                      // expira em 1 hora
        // );
        
        // Enviar token junto com info do usuário
        res.json({ message: "Login bem-sucedido!", user: { id: user.id, email: user.email, username: user.username } });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao tentar logar" });
    }
});

// app.get("/perfil", authMiddleware, (req: any, res: any) => {
//     // Aqui só chega se o token for válido
//     res.json({ user: req.user });
// });

// // get dados
// app.get("/dados", authMiddleware, (req: any, res: any) => {
//     // Aqui só chega se o token for válido
//     res.json({ 
//         message: "Acesso permitido!",
//         user: req.user
//     });
// });


// ======================
// Add Aula
// ======================

// Rota para adicionar uma nova aula recorrente
app.post('/classesAdd', async (req: Request, res: Response) => {
    try {
        const { name, dayOfWeek, startTime, endTime, teacherId, academyId, date } = req.body;

        // Adicione um console.log para ver os dados recebidos no backend
        console.log("Dados recebidos no backend:", req.body);

        const newClass = await prisma.class.create({
            data: {
                name,
                dayOfWeek,
                startTime,
                date,
                teacherId,
                academyId,
                // Opcionais
                endTime: endTime || null,
                // room: room || null, // Removido porque não existe no modelo
            },
        });

        res.status(201).json({ message: "Aula adicionada com sucesso!", class: newClass });
    } catch (error) {
        // Loga o erro exato do Prisma
        console.error("Erro ao tentar criar a aula:", error);
        res.status(500).json({ error: "Erro interno no servidor ao tentar criar a aula." });
    }
});

// ======================
// Search Aula
// ======================

// Nova rota para listar todas as classes
app.get('/classesRefresh', async (req: Request, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: { // Inclui o objeto teacher
          include: {
            user: true, // Inclui o objeto user dentro do teacher
          },
        },
        academy: true,
      },
      orderBy: {
        id: 'asc', // Ordena as classes pelo ID para uma visualização consistente
      },
    });
    res.json(classes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar as classes.' });
  }
});

// ======================
// Start server
// ======================

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});