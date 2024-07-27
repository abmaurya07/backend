const Task = require('../models/Task');
const mongoose = require('mongoose');

exports.createTask = async (req, res) => {
  try {
    console.log('create task called');
    console.log('req.user.id:', req.user.id);
    console.log('req.body:', req.body);
    const task = new Task({ ...req.body, user: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    try {
      // Fetch and sort tasks based on the createdAt date, then skip and limit results
      const tasks = await Task.find({ user: req.user.id })
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
        .skip(skip)
        .limit(limit);
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

exports.getInProgressTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  try {
    const tasks = await Task.find({ user: req.user.id, status: 'In Progress' }).skip(skip).limit(limit);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDoneTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;
  try {
    const tasks = await Task.find({ user: req.user.id, status: 'Done' }).skip(skip).limit(limit);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getToDoTasks = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;  
    const skip = (page - 1) * limit;
  try {
    const tasks = await Task.find({ user: req.user.id, status: 'To Do' }).skip(skip).limit(limit);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateTask = async (req, res) => {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id }, // Ensure the task belongs to the user
        req.body,
        { new: true }
      );
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }
      
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found or not authorized' });
      }
      
      res.status(204).json({ message: 'Task deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.bulkDeleteTasks = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!Array.isArray(ids)) {
          return res.status(400).json({ message: 'Invalid data format' });
        }

        // Validate ObjectIds and ensure they belong to the authenticated user
        const objectIds = ids.map(id => {
            if (mongoose.Types.ObjectId.isValid(id)) {
              return new mongoose.Types.ObjectId(id);
            } else {
              throw new Error(`Invalid ObjectId: ${id}`);
            }
        });

        // Delete only tasks that belong to the authenticated user
        const result = await Task.deleteMany({ _id: { $in: objectIds }, user: req.user.id });

        if (result.deletedCount === 0) {
          return res.status(404).json({ message: 'No tasks found or not authorized' });
        }

        res.status(200).json({ message: 'Tasks deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.taskSummary = async (req, res) => {
    try {
      // Count all tasks for the authenticated user
      const totalTasks = await Task.countDocuments({ user: req.user.id });
  
      // Count tasks by their status for the authenticated user
      const toDoCount = await Task.countDocuments({ user: req.user.id, status: 'To Do' });
      const inProgressCount = await Task.countDocuments({ user: req.user.id, status: 'In Progress' });
      const doneCount = await Task.countDocuments({ user: req.user.id, status: 'Done' });
  console.log('Task Summary:', totalTasks, toDoCount, inProgressCount, doneCount);
      res.status(200).json({
          taskSummary: {
              'All': totalTasks,
              'To Do': toDoCount,
              'In Progress': inProgressCount,
              'Done': doneCount
            }
      });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
