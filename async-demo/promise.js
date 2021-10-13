const p = new Promise((resolve, reject) => {
	// Kick off some async Work
	// ...
	setTimeout(() => {
		resolve(1); //pending=> resolved, fulfilled
		reject(new Error("message")); //pending=> resolved, fulfilled
	}, 2000);
});

p.then((result) => console.log("result", result)).catch((err) =>
	console.log("Error", err.message),
);
