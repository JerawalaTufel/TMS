const { Task } = require("../models/Task");
const { TASK_TYPE } = require("../services/constant");
const { validateCreatTask, validateTaskInfo, validateMoveTask } = require("../services/validation");


const createTask =  (req , res) => {
    try {
        const reqParam = req.body;
        validateCreatTask(reqParam , res , async(validate) => {
            if(validate) {
                const findTask = await Task.findOne({name : reqParam.name , type : reqParam.type})
                const allTask = await Task.find({type : reqParam.type});
                const totalTask = allTask.length;
                if(findTask) {
                    return res.status(400).send({
                        "status" : 400,
                        "message" : "task already exists."
                    });
                }
                reqParam.position = (totalTask+1);
                const newTask = await Task.create(reqParam)
               
                return res.status(201).send({
                    "status" : 200,
                    "data" : newTask,
                    "message" : "task created."
                });
            }
        })   
    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message
        });
    }
}

const deleteTask = async(req , res) => {
    try {
        const queryParams = req.params;
    
        const findTask = await Task.findOne({_id : queryParams.id})
        if(!findTask) {
            return res.status(400).send({
                "status" : 400,
                "message" : "task is not exists."
            });
        }
        const deletedCategory = await Task.findByIdAndDelete(queryParams.id);
        
        return res.status(201).send({
            "status" : 200,
            "data" : deletedCategory,
            "message" : "task deleted successfully."
        });   
    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message
        });
    }
}

const addTaskInfo = (req , res) => {

    const reqParam = req.body;
    
    validateTaskInfo(reqParam , res , async(validate) => {

        if(validate){
            const findTask = await Task.findOne({_id : reqParam.id})
            if(!findTask) {
                return res.status(400).send({
                    "status" : 400,
                    "message" : "task is not exist."
                });
            }
            
            const addDetailsToTask = await Task.findByIdAndUpdate(reqParam.id , reqParam , { new: true });
        
            return res.status(201).send({
                "status" : 200,
                "data" : addDetailsToTask,
                "message" : "task if added!."
            }); 
        } 
    })

}

const listAllTheTask = async (req , res) => {
    
    const taskTypes = [TASK_TYPE.todo, TASK_TYPE.progress, TASK_TYPE.done];

    const tasks = await Task.find({ type: { $in: taskTypes } }).sort({position : 'desc', updatedAt: 'asc'});

    const categorizedTasks = {
    TODO: tasks.filter(task => task.type === TASK_TYPE.todo),
    PROGRESS: tasks.filter(task => task.type === TASK_TYPE.progress),
    DONE: tasks.filter(task => task.type === TASK_TYPE.done),
    };

    return res.status(200).send({
    status: 200,
    data: categorizedTasks,
    });


}

const moveTask =  (req , res) => {
    const reqParam = req.body;

    validateMoveTask(reqParam , res , async(validate) => {
        if(validate) {
            const findTask = await Task.findOne({_id : reqParam.id})
            if(!findTask) {
                return res.status(400).send({
                    "status" : 400,
                    "message" : "task is not exists."
                });
            }
            let updatedObj = {
                type : reqParam.type,
                position : reqParam.up_position
            }
            
            if(reqParam.up_position === null){
                const findTasksOfType = await Task.find({type : reqParam.type})
                updatedObj.position = findTasksOfType.length +1
                const findTaskWithObjPosition = await Task.find({type : reqParam.type , position: updatedObj.position})
                if(findTaskWithObjPosition) {
                    updatedObj.position = updatedObj.position + 1;
                }
            }  else {
                const tasksToUpdate = await Task.find({ type: reqParam.type, position: { $gte: reqParam.up_position } });

                if (tasksToUpdate.length > 0) {
                    const taskIdsToUpdate = tasksToUpdate.map(task => task._id);
                
                    // Increment the position of all found tasks by one
                    await Task.updateMany({ _id: { $in: taskIdsToUpdate } }, { $inc: { position: 1 } });
                }                

            }
            const updatedTask = await Task.findByIdAndUpdate(reqParam.id , updatedObj , { new: true });

           
            return res.status(201).send({
                "status" : 200,
                "data" : updatedTask,
                "message" : "task moved!."
            }); 
        }
    })
}

const listTypeOfTask = (req , res) => {
    const taskTypes = {"TODO" : TASK_TYPE.todo, "PROGRESS" :TASK_TYPE.progress, "DONE" : TASK_TYPE.done};
    return res.status(200).send({
        status: 200,
        data: taskTypes,
        });
}


module.exports = {createTask ,deleteTask , addTaskInfo ,listAllTheTask ,moveTask,listTypeOfTask}