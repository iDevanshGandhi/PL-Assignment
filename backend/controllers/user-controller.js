const user = require("../model/user")

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
        return res.status(400).json({message: "User Already Exists! Login Instead"})
    }
    const user = new user({
        name,
        email,
        phoneno,
        password
    });

    try {
        await user.save()
    } catch (err) {
      return  console.log(err);
    }

    return res.status(201).json({user})
};

module.exports = getAllUser