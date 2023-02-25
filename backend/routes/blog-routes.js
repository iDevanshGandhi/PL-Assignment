import express from "express";
import { getAllBlogs } from "../controllers/blog-controller";
import { addBlog } from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.post("/update/:id",updateBlog)

export default blogRouter;