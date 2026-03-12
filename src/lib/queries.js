import prisma from "./prisma.js";

async function findUserByEmail(email) {
  const user = await prisma.user.findFirst({
    where: { email: email },
    select: { id: true, email: true, passwordHash: true, createdAt: true },
  });

  return user;
}

async function findUserById(id) {
  const user = await prisma.user.findFirst({
    where: { id: id },
    select: { id: true, email: true, createdAt: true },
  });

  return user;
}

async function createUser(email, passwordHash) {
  const user = prisma.user.create({
    data: {
      email,
      passwordHash,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export { findUserByEmail, findUserById, createUser };
