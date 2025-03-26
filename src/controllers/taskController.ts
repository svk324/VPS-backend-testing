import { Request, Response } from "express";
import Task from "../models/Task";
import { CreateTaskDTO, UpdateTaskDTO } from "../types/task";

// Get all tasks
export const getAllTasks = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get a single task by ID
export const getTaskById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create a new task
export const createTask = async (
  req: Request<{}, {}, CreateTaskDTO>,
  res: Response
): Promise<void> => {
  try {
    const { title, description } = req.body;

    if (!title) {
      res.status(400).json({ message: "Title is required" });
      return;
    }

    const newTask = await Task.create({
      title,
      description,
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update a task
export const updateTask = async (
  req: Request<{ id: string }, {}, UpdateTaskDTO>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete a task
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingTask = await Task.findById(id);

    if (!existingTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
