const { createTask, deleteTask, addTaskInfo, listAllTheTask, moveTask ,listTypeOfTask} = require('../controller/taskController');

const apiRoute = require('express').Router();

apiRoute.post('/create-task' , createTask)
apiRoute.delete('/delete-task/:id',deleteTask)
apiRoute.post('/add-info',addTaskInfo)
apiRoute.get('/list-task' , listAllTheTask)
apiRoute.post('/move-task', moveTask)
apiRoute.get('/type-list', listTypeOfTask)

module.exports = apiRoute