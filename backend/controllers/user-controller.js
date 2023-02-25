const user = require("../model/user")
import bcrypt from "bcryptjs";

const getAllUser = async(req,res,next)=>{
    let users;
    try {
        users = await user.find();
    } catch (err) {
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({users});
};

export const signup = async(req,res,next)=>{
    const {name, email, phoneno, password} = req.body;
    let exisitingUser;
    try {
        exisitingUser = await user.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (exisitingUser) {
        return res
        .status(400)
        .json({message: "User Already Exists! Login Instead"})
    }
    const hashedPassword = bcrypt.hashSync(password);

    const user = new user({
        name,
        email,
        phoneno,
        password: hashedPassword
    });

    try {
        await user.save()
    } catch (err) {
      return  console.log(err);
    }

    return res.status(201).json({user})
};

export const login = async(req,res,next)=>{
    const {email, password} = req.body;
    let exisitingUser;
    try {
        exisitingUser = await user.findOne({email});
    } catch (err) {
        return console.log(err);
    }
    if (!exisitingUser) {
        return res
        .status(404)
        .json({message: "Couldn't Find the User with this Email"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password,exisitingUser.password);
    if (!isPasswordCorrect) {
        return res
        .status(400)
        .json({message: "Incorrect Password"})
    }
    return res.status(400).json({message: "Login Successfull"})
};

module.exports = getAllUser