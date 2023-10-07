import { Request, Response } from "express";
import Tool from "../models/tools";

export const createTool = async (req: Request, res: Response) => {
  const newTool = new Tool({
    name: req.body.name,
    thumbnail: req.body.thumbnail,
    proficiency: req.body.proficiency,
    toolType: req.body.toolType,
  });
  const result = await newTool.save();

  res.status(201).json(result);
};

export const getAllTools = async (req: Request, res: Response) => {
  const tools = await Tool.find().exec();
  res.status(200).json(tools);
};

export const getTool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tools = await Tool.findById(id);
  res.status(200).json(tools);
};

export const updateTool = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tool = await Tool.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json(tool);
};
