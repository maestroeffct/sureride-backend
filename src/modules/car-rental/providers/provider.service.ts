import { prisma } from "../../../config/db";

export async function createProvider(data: {
  businessName: string;
  businessType?: string;
  email: string;
  phone?: string;
}) {
  return prisma.provider.create({
    data: {
      businessName: data.businessName,
      businessType: data.businessType,
      email: data.email,
      phone: data.phone,
      status: "DRAFT",
    },
  });
}

export async function updateProvider(id: string, data: any) {
  return prisma.provider.update({
    where: { id },
    data,
  });
}

export async function getProvider(id: string) {
  return prisma.provider.findUnique({
    where: { id },
    include: {
      contact: true,
      location: true,
      documents: true,
      finance: true,
      cars: true,
    },
  });
}

export async function listProviders() {
  return prisma.provider.findMany({
    include: {
      contact: true,
      location: true,
      documents: true,
      finance: true,
    },
  });
}

export async function submitProvider(id: string) {
  return prisma.provider.update({
    where: { id },
    data: {
      status: "SUBMITTED",
    },
  });
}

export async function approveProvider(id: string) {
  return prisma.provider.update({
    where: { id },
    data: {
      status: "APPROVED",
    },
  });
}

export async function rejectProvider(id: string, reason: string) {
  return prisma.provider.update({
    where: { id },
    data: {
      status: "REJECTED",
    },
  });
}
