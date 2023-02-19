import { Request, Response } from "express";
import { Op, Transaction } from "sequelize";
import { sequelize } from "../../../config/DataBase";

import {
  BlobServiceClient,
  StorageSharedKeyCredential,
} from "@azure/storage-blob";
import { config } from "dotenv";
import { Protocolo } from "../models/Protocolo";

config();
export class ProtocolosControllers {
  public static blobService = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING!
  );

  public static async createProtocolo(req: Request, res: Response) {
    try {
      const { accesionId, usuarioId } = req.body;
      const protocolo = req.file;

      if (!protocolo)
        return res.status(400).json({ error: "Falta documento de protocolo" });

      if (protocolo.mimetype !== "application/pdf")
        return res.status(400).json({ error: "Solo archivos PDF permitidos" });

      const containerClient =
        ProtocolosControllers.blobService.getContainerClient("protocolos");

      const blob = containerClient.getBlockBlobClient(protocolo.originalname);
      await blob.uploadData(protocolo.buffer);
      await Protocolo.create({
        accesionId: accesionId,
        protocoloUrl: blob.url,
        usuarioId: usuarioId,
      });
      return res.status(200).json({ message: "Protocolo creado con éxito" });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
