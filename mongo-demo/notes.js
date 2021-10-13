//Process to create documents
const mongoose = require("mongoose");
mongoose
	.connect("mongodb://localhost/playground")
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.error("Could not connect to MongoDB...", err));

//Create a schema to set the properties each item needs
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: { type: Date, default: Date.now },
	isPublished: Boolean,
});

//Set the schema model to a Class
const Course = mongoose.model("Course", courseSchema);

//create async function to build the class
async function createCourse() {
	//create object using the class function
	const course = new Course({
		name: "Angular Course",
		author: "Allan",
		tags: ["angular", "frontend"],
		isPublished: true,
	});
	//Saves it to the DB
	const result = await course.save();
	//CL it to confirm the save
	console.log(result);
}

//Run the async function
//createCourse();

// async function getCourses() {
// ! MongoDB Comparison Operators
//eq(equal), ne(not equal), gt (greater than), gte (greater than or equal to), lt (less than), lte (less than or equal to), in, nin (not in),  or,  and
// const courses = await Course
// .find({ author: "Allan", isPublished: true })
//! Create key:value pairs >> $MongoOperator: value
// .find({price: {$gte: 10, $lte: 20}})
// ! Use an array for multiple values
// .find({price: {$in: [10, 15, 20]}})
// .or([{author: 'Mosh'}, {isPublished: true}])
// .and([])
//! How to find courses that start with Allan
// .find({author: /^Allan/ })
//! How to find courses that ENDS with Allan CASE SENSITIVE TO MAKE INSENSIVE ADD I AT END
// .find({author: /Allan$/i })
// ! Contains Allan
// .find({author: /.*Allan.*/i})
// .find({ author: "Allan" })
// .limit(10)
// .sort({ name: 1 })
// .select({ name: 1, tags: 1 });
// 		.count();
// 	console.log(courses);
// }

async function getCourses() {
	const pageNumber = 2;
	const pageSize = 10;

	const courses = await Course.find({ author: "Allan", isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
	console.log(courses);
}

async function updateCourse(id) {
	//Approach: Query first
	//findById()
	const course = await Course.findById(id);
	if (!course) return;
	course.isPublished = true;
	//Modify its properties
	course.author = "Another Author";
	//save()
	const result = await course.save();
	console.log(result);

	//Approach: Update first
	//Update directly
	//Optionally: get the updated document
}
updateCourse("5a68fde3f09ad7646ddec17e");
getCourses();
