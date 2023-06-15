import userdb from "../Models/userSchema.js";
import bcrypt from "bcrypt"



class users {
    constructor(){
    }
        static registration = async(req,res) =>{
            const { name, email, PhoneNo , password, cpassword } = req.body
            if (!name || !email || !PhoneNo || !password || !cpassword) {
                res.status(422).json({ error: "fill all the detail" })
            }

            try{
                const preuser = await userdb.findOne({ email: email })
                if (preuser) {
                    res.status(422).json({ error: "this email already exits" })
                }
                else{
                    if (password === cpassword) {
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const FinalUser = new userdb({
                            name: name,
                            email: email,
                            PhoneNo : PhoneNo,
                            password: hashPassword,
                            cpassword: hashPassword
                        })
        
                        let storeData = await FinalUser.save()
                        res.json({data : storeData , status : 201})
                        console.log(storeData)
                      
                    }
                    else {
                        res.status(422).json({ error: "password does not match" })
                    }

                }

            }

            catch(error){
                res.send(error)
            }
        }







        static login = async(req,res) => {
        const { email, password } = req.body;
    if (!email || !password) {
        res.status(422).json({ error: "fill all the detail" })
    }
    try {
        const userValid = await userdb.findOne({ email: email })
        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password)
            if (!isMatch) {

                res.status(422).json({ error: "incorrect email or passowrd" })
            }
            else {


                res.status(201).json({ status: 201, userValid ,})
            }
        }
        else {
            res.status(422).json({ error: "you are not register user" })
        }
    }
    catch (error) {
        console.log(error)
    }

        }


        }

        export default users