import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true,
        trim :true,
    },

    email : {
        type : String , 
        required : true,
       unique : true,
    
    },
    PhoneNo :{
        type : String,
        require: true,
        minlength: 10
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
})


const userdb = new mongoose.model("users" ,userSchema)

export default userdb