const Joi = require('joi');
const { TASK_TYPE } = require('./constant');


module.exports = {
    validateCreatTask : (req, res, cb) => {
        const creatTaskSchema = Joi.object({
            name : Joi.string().required(),
            type : Joi.number().valid(TASK_TYPE.todo , TASK_TYPE.progress , TASK_TYPE.done).required()
        })
        const { error } = creatTaskSchema.validate(req);
        if(error){
           

            return res.status(400).send({
                "status" : 400,
                "message" : error.details[0].message
            });
          }
          return cb(true);
    },

    validateTaskInfo : (req , res , cb) => {
        const creatTaskInfoSchema = Joi.object({
            id : Joi.string().required(),
        }).unknown();
        const { error } = creatTaskInfoSchema.validate(req);
        if(error){
           
            return res.status(400).send({
                "status" : 400,
                "message" : error.details[0].message
            });
          }
          return cb(true);
    },

    validateMoveTask : (req , res , cb) => {
        const createMoveTaskSchema = Joi.object({
            id : Joi.string().required(),
            type : Joi.number().valid(TASK_TYPE.todo , TASK_TYPE.progress , TASK_TYPE.done).required(),
            up_position : Joi.number().allow(null).required(),
        })
        const { error } = createMoveTaskSchema.validate(req);
        if(error){
            
            return res.status(400).send({
                "status" : 400,
                "message" : (error.details[0].message)
            });
          }
          return cb(true);
    }
}