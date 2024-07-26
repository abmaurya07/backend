const express = require('express');
const router = express.Router();
const { createTask, getTasks, getToDoTasks, getInProgressTasks, getDoneTasks, updateTask, deleteTask, bulkDeleteTasks, taskSummary } = require('../controllers/taskController');
const auth = require('../middleware/auth');

router.post('/tasks', auth, createTask);
router.get('/tasks',auth, getTasks);
router.get('/tasks/todo', auth, getToDoTasks);
router.get('/tasks/inprogress', auth, getInProgressTasks);
router.get('/tasks/done', auth, getDoneTasks);
router.get('/tasks/summary', auth, taskSummary);
router.delete('/tasks/bulk-delete', auth, bulkDeleteTasks)
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;
