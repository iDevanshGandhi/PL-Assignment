const mongoose = require("mongoose");
const blog = require("../model/blog");
const user = require("../model/user");

const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try {
        blogs = await blog.find();
    } catch (err) {
        return console.log(err)
    }
    if (!blogs){
        return res.status(404).json({message: "No Blogs Found"});
    }
    return res.status(200).json({blogs});
}

const addBlog = async(req,res,next)=>{
    const {title,description,image,user} = req.body;
    try {
        existingUser = await user.findById(user);
    } catch(err) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json({message: "Unable to Find the User By this ID"});
    }
    const blog = new blog({
        title,
        description,
        image,
        user,
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save(session);
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err});
    }
    return res.status(200).json({ blog });
};

const updateBlog = async (req, res, next)=> {
    const {title,description} = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await blog.findByIdAndUpdate(blogId, {
            title,
            description   
            })
    } catch (err) {
        return console.log(err)
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to Update the Blog"});
    }
    return res.status(200).json({ blog });
}

const getById = async (req, res, next)=> {
    // const {title,description} = req.body;
    const id = req.params.id;
    let blog;
    try {
        blog = await blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!blog) {
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next)=> {
    // const {title,description} = req.body;
    const id = req.params.id;
    let blog;
    try {
        blog = await blog.findIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (err) {
        return console.log(err);
    }
    if(!blog) {
        return res.status(500).json({message: "Unable to Delete"});
    }
    return res.status(200).json({ message: "Deleted Successfully" });
};

const getByUserId = async (req, res, next)=> {
    // const {title,description} = req.body;
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await user.findById(userId).populate("blogs");
        // await blog.user.blogs.pull(blog);
        // await blog.user.save();
    } catch (err) {
        return console.log(err);
    }
    if(!userBlogs) {
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({ blogs: userBlogs });
};

module.exports = {
    getAllBlogs, addBlog, updateBlog, getById, getByUserId, deleteBlog
};