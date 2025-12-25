import { Request, Response } from "express";
import { prisma } from "../../../config/db";
import { ProviderStatus } from "@prisma/client";

export async function uploadProviderDocuments(req: Request, res: Response) {
  const { id } = req.params;

  const provider = await prisma.provider.findUnique({ where: { id } });
  if (!provider) {
    return res.status(404).json({ message: "Provider not found" });
  }

  if (provider.status !== ProviderStatus.DRAFT) {
    return res.status(400).json({
      message: "Cannot upload documents after submission",
    });
  }

  const files = req.files as {
    businessCert?: Express.Multer.File[];
    idDocument?: Express.Multer.File[];
  };

  if (!files?.businessCert || !files?.idDocument) {
    return res.status(400).json({ message: "Documents are required" });
  }

  const record = await prisma.providerDocument.upsert({
    where: { providerId: id },
    update: {
      businessCert: files.businessCert[0].path,
      idDocument: files.idDocument[0].path,
    },
    create: {
      providerId: id,
      businessCert: files.businessCert[0].path,
      idDocument: files.idDocument[0].path,
    },
  });

  res.json(record);
}
