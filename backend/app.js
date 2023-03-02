const cookieParser = require("cookie-parser")
const express = require("express")
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes");
const router = require("./routes/user-routes")
    
// const router = require("./routes/user-routes");
const app = express();
app.use(express.json());
app.use(cookieParser());


mongoose.connect(
	"mongodb+srv://devanshgandhi:tieRyPPzn6PSCa8t@cluster0.as1bb3n.mongodb.net/Blog?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (!err) {
			console.log("MongoDB Connected");
		} else {
			console.log("Error in connection : " + err);
		}
	}
);

var db = mongoose.connection;

app.use(express.json())
app.set("view engine", "ejs");
// app.use(express.static("frontend"));
app.set("views", __dirname + "/views");
app.get("/login", function(req,res){
	const login = req.cookies.login
	if(login && login=="true"){
		res.redirect("/dashboard")
	}
	else{
		res.render("login.ejs")
	}
})

app.get("/signup", function(req,res){
	res.render("signup.ejs")
})

app.use(express.static("public"))

app.get("/dashboard", function(req,res){
	const username = req.cookies.username
	if(username){
		res.render("dashboard.ejs")
	}
	else{
		res.redirect("/login")
	}
})

app.use("/",router);
app.use("/",blogRouter);

app.listen(5000, function () {
	console.log("Server Running on PORT 5000" );
});