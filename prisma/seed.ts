import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@sureride.com";
  const password = "admin123456";

  // 1️⃣ Create SUPER_ADMIN role
  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: {
      name: "SUPER_ADMIN",
      description: "System Super Administrator",
      isSystem: true,
    },
  });

  // 2️⃣ Define permissions
  const permissions = [
    "admin.users.read",
    "admin.users.write",
    "admin.roles.read",
    "admin.roles.write",
    "admin.permissions.read",
    "admin.permissions.write",
    "payments.view",
    "settings.manage",
  ];

  // 3️⃣ Create permissions & link to role
  for (const key of permissions) {
    const permission = await prisma.permission.upsert({
      where: { key },
      update: {},
      create: {
        key,
        description: key.split(".").join(" "),
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

  // 4️⃣ Create admin user if not exists
  let admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    const hashedPassword = await bcrypt.hash(password, 12);

    admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        roleId: superAdminRole.id,
      },
    });

    console.log("SUPER_ADMIN admin created");
  } else if (!admin.roleId) {
    // Safety: assign role if admin existed without one
    await prisma.admin.update({
      where: { id: admin.id },
      data: {
        roleId: superAdminRole.id,
      },
    });

    console.log("SUPER_ADMIN role assigned to existing admin");
  } else {
    console.log("Admin already exists");
  }
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
