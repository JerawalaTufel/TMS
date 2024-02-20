const { string } = require("joi");
const Mongoose  = require("mongoose");
const { TASK_TYPE } = require("../services/constant");


 const Task = new Mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    type : {
        type: Number,
        enum: [TASK_TYPE.todo , TASK_TYPE.progress , TASK_TYPE.done],
        require: true
    },
    position : {
        type: Number,
        default: null
    },
    desc : {
        type: String,
        default: null
    },
    comment : {
        type: String,
        default: null
    }
 }, {
    timestamps : true
  })

 exports.Task = Mongoose.model('Task' , Task)