import { Request, Response } from "express";
import { Tuition, TuitionI } from "../models/Tuition";

export class TuitionController {
  public async getAllTuitions(req: Request, res: Response) {
    try {
      const tuitions: TuitionI[] = await Tuition.findAll({
        where: { status: "ACTIVE" },
      });

      res.status(200).json({ tuitions });
    } catch (error) {
      res.status(500).json({ error: "Error fetching tuitions" });
    }
  }

  public async getTuitionById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const tuition = await Tuition.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (tuition) {
        res.status(200).json({ tuition });
      } else {
        res.status(404).json({ error: "Tuition not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching tuition" });
    }
  }

  public async createTuition(req: Request, res: Response) {
    const { registrationDate, city, payment, carId, status } = req.body;

    try {
      const body: TuitionI = {
        registrationDate,
        city,
        payment,
        carId,
        status,
      };

      const newTuition = await Tuition.create({ ...body });

      res.status(201).json(newTuition);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async updateTuition(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { registrationDate, city, payment, carId, status } = req.body;

    try {
      const body: TuitionI = {
        registrationDate,
        city,
        payment,
        carId,
        status,
      };

      const tuitionExist = await Tuition.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (tuitionExist) {
        await tuitionExist.update(body);
        res.status(200).json(tuitionExist);
      } else {
        res.status(404).json({ error: "Tuition not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTuition(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const tuitionToDelete = await Tuition.findOne({
        where: { id: pk },
      });

      if (tuitionToDelete) {
        await tuitionToDelete.destroy();
        res.status(200).json({ message: "Tuition deleted successfully" });
      } else {
        res.status(404).json({ error: "Tuition not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting tuition" });
    }
  }

  public async deleteTuitionAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;

      const tuitionToUpdate = await Tuition.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (tuitionToUpdate) {
        await tuitionToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Tuition marked as inactive" });
      } else {
        res.status(404).json({ error: "Tuition not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking tuition as inactive" });
    }
  }
}