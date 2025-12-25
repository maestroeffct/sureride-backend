import { Request, Response } from "express";
import * as ProviderService from "./provider.service";

export async function createProvider(req: Request, res: Response) {
  const { businessName, businessType, email, phone } = req.body;

  if (!businessName || !email) {
    return res
      .status(400)
      .json({ message: "Business name and email required" });
  }

  const provider = await ProviderService.createProvider({
    businessName,
    businessType,
    email,
    phone,
  });

  res.status(201).json(provider);
}

export async function updateProvider(req: Request, res: Response) {
  const provider = await ProviderService.updateProvider(
    req.params.id,
    req.body
  );
  res.json(provider);
}

export async function getProvider(req: Request, res: Response) {
  const provider = await ProviderService.getProvider(req.params.id);
  res.json(provider);
}

export async function listProviders(req: Request, res: Response) {
  const providers = await ProviderService.listProviders();
  res.json(providers);
}

export async function submitProvider(req: Request, res: Response) {
  const provider = await ProviderService.submitProvider(req.params.id);
  res.json(provider);
}

export async function approveProvider(req: Request, res: Response) {
  const provider = await ProviderService.approveProvider(req.params.id);
  res.json(provider);
}

export async function rejectProvider(req: Request, res: Response) {
  const { reason } = req.body;
  const provider = await ProviderService.rejectProvider(req.params.id, reason);
  res.json(provider);
}
