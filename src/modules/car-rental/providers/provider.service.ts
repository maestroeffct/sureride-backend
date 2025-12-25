import { prisma } from "../../../config/db";

export function listProviders() {
  return prisma.provider.findMany({
    include: {
      cars: true,
    },
  });
}

export function getProviderById(id: string) {
  return prisma.provider.findUnique({
    where: { id },
    include: { cars: true },
  });
}

export function updateProviderStatus(id: string, isActive: boolean) {
  return prisma.provider.update({
    where: { id },
    data: { isActive },
  });
}
