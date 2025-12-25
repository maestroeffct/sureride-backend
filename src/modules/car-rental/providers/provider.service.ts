import { prisma } from "../../../config/db";
import { ProviderStatus } from "@prisma/client";

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
      status: ProviderStatus.DRAFT,
    },
  });
}

export async function updateProvider(
  id: string,
  data: {
    businessName?: string;
    businessType?: string;
    email?: string;
    phone?: string;
  }
) {
  const provider = await prisma.provider.findUnique({ where: { id } });

  if (!provider) throw new Error("Provider not found");

  if (provider.status !== ProviderStatus.DRAFT) {
    throw new Error("Cannot edit provider after submission");
  }

  return prisma.provider.update({
    where: { id },
    data,
  });
}

export async function submitProvider(id: string) {
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: {
      contact: true,
      location: true,
      documents: true,
      finance: true,
    },
  });

  if (!provider) throw new Error("Provider not found");

  if (
    !provider.contact ||
    !provider.location ||
    !provider.documents ||
    !provider.finance
  ) {
    throw new Error("Provider profile incomplete");
  }

  if (provider.status !== ProviderStatus.DRAFT) {
    throw new Error("Provider already submitted");
  }

  return prisma.provider.update({
    where: { id },
    data: { status: ProviderStatus.SUBMITTED },
  });
}

export async function approveProvider(id: string) {
  const provider = await prisma.provider.findUnique({ where: { id } });

  if (!provider) throw new Error("Provider not found");

  if (provider.status !== ProviderStatus.SUBMITTED) {
    throw new Error("Provider must be SUBMITTED first");
  }

  return prisma.provider.update({
    where: { id },
    data: { status: ProviderStatus.APPROVED },
  });
}

export async function rejectProvider(id: string, reason: string) {
  const provider = await prisma.provider.findUnique({ where: { id } });

  if (!provider) throw new Error("Provider not found");

  return prisma.provider.update({
    where: { id },
    data: {
      status: ProviderStatus.REJECTED,
      rejectionReason: reason,
    },
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
    include: { contact: true, location: true, documents: true, finance: true },
  });
}
