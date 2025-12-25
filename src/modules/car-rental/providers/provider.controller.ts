import { Request, Response } from "express";
import * as ProviderService from "./provider.service";

export async function listProviders(req: Request, res: Response) {
  const providers = await ProviderService.listProviders();
  res.json(providers);
}

export async function getProvider(req: Request, res: Response) {
  const provider = await ProviderService.getProviderById(req.params.id);
  res.json(provider);
}

export async function toggleProvider(req: Request, res: Response) {
  const { isActive } = req.body;
  const provider = await ProviderService.updateProviderStatus(
    req.params.id,
    isActive
  );
  res.json(provider);
}
