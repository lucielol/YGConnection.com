import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const Register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create new user to database
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      phone,
    },
  });

  res.status(201).json({ message: "User registered successfully" });
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // find email by id
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // password verification
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // create jwt token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login successful", token });
};
