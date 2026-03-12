import prisma from "./prisma.js";

async function findUser(email) {
  const user = await prisma.user.findFirst({
    where: { email: email },
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

export { findUser, createUser };
