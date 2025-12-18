import { PrismaClient, AdminRole } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@sureride.com";
  const password = "admin123456";

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await prisma.admin.create({
    data: {
      email,
      password: hashedPassword,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  console.log("SUPER_ADMIN seeded");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
