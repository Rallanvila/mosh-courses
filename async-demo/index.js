console.log("before");
// getUser(1, (user) => {
// 	getRepositories(user.gitHubUsername, (repo) => {
// 		getCommits(repo, (commits) => {
// 			console.log(commits);
// 		});
// 	});
// });
const commit = ["commit"];

// getUser(1)
// 	.then((user) => getRepositories(user.getHubUsername))
// 	.then((repos) => getCommits(repos[0]))
// 	.then((commits) => console.log("Commits", commits))
// 	.catch((err) => console.log("Error: ", err.message));

//Async and Await approach
async function displayCommits() {
	try {
		const user = await getUser(1);
		const repos = await getRepositories(user.gitHubUsername);
		const commits = await getCommits(repos[0]);
		console.log(commits);
	} catch (err) {
		console.log("Error: ", err.message);
	}
}
displayCommits();

console.log("after");

function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Reading a user from a database...");
			resolve({ id: id, gitHubUsername: "Allan" });
			return;
		}, 2000);
	});
}
function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Getting repositories from the DB");
			// resolve({ repositories: ["repo1", "repo2", "repo3"] });
			reject(new Error("Could not get the repos"));
		}, 2000);
	});
}
function getCommits(commits) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log("Calling GitHub API...");
			resolve(["commits"]);
		});
	});
}

//Callbacks
//Promise
//Async/await
