const express = require("express")
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes");
const router = require("./routes/user-routes")
    
// const router = require("./routes/user-routes");
const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);

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



app.listen(5000, function () {
	console.log("Server Running on PORT 5000" );
});