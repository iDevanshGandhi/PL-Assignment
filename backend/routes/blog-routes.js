import express from "express";
import { deleteBlog, getAllBlogs, getById, updateBlog } from "../controllers/blog-controller";
import { addBlog } from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);

export default blogRouter;