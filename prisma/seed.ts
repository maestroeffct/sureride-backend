import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@sureride.com";
  const password = "admin123456";

  // 1️⃣ SUPER ADMIN ROLE
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "System Super Administrator",
      isSystem: true,
    },
  });

  // 2️⃣ PERMISSIONS
  const permissions = [
    // Core admin
    "admin.users.read",
    "admin.users.write",
    "admin.roles.read",
    "admin.roles.write",
    "admin.permissions.read",
    "admin.permissions.write",

    // System
    "settings.manage",
    "payments.view",

    // 🚗 Rental module
    "rental.providers.view",
    "rental.providers.create",
    "rental.providers.update",
    "rental.providers.submit",
    "rental.providers.approve",

    "rental.cars.view",
    "rental.cars.create",
    "rental.cars.update",
    "rental.cars.approve",
  ];

  for (const key of permissions) {
    const permission = await prisma.permission.upsert({
      where: { key },
      update: {},
      create: {
        key,
        description: key.replace(/\./g, " "),
      },
    });

    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permission.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: permission.id,
      },
    });
  }

  // 3️⃣ Create SUPER ADMIN USER
  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        roleId: superAdminRole.id,
      },
    });

    console.log("✅ SUPER_ADMIN created");
  } else if (!existingAdmin.roleId) {
    await prisma.admin.update({
      where: { id: existingAdmin.id },
      data: { roleId: superAdminRole.id },
    });

    console.log("✅ SUPER_ADMIN role assigned");
  }

  console.log("✅ Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
