const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// function login(password) {
// 	return password === "a999";
// }

// async function login(password) {
// 	return new Promise((resolve) => {
// 		setTimeout(() => {
// 			resolve(password === "ab")
// 		},  Math.random() * 2000);
// 	})
// }
let numberOfIterations = 1;
let arrayOfGeneratedPasswords = [];
function brute(maxLength = 4) {

	return {
		next: function () {
			arrayOfGeneratedPasswords = [];
			for (let passwordLength = numberOfIterations; passwordLength <= maxLength;) {
				let passwordArray = createPasswordArray(passwordLength);
				do {
					let password = createPasswordFromArray(passwordArray);
					arrayOfGeneratedPasswords.push(password);
					passwordArray = getNextPasswordArray(passwordArray);
					// if (login(password)) {
					// 	return password;
					// }
				} while (passwordArray);
				numberOfIterations++
				break;
			}
		}
	}
	// return null;
}

function createPasswordArray(arrayLength) {
	const passwordArray = [];
	for (let i = 0; i < arrayLength; i++) {
		passwordArray.push(0);
	}
	return passwordArray;
}


function createPasswordFromArray(passwordArray){
	let password = '';
	for (let i = 0; i < passwordArray.length; i++) {
		password += allowedChars[passwordArray[i]];
	}
	return password;
}

function getNextPasswordArray(passwordArray) {
	for (let i = passwordArray.length - 1; i >= 0; i--) {
		if (passwordArray[i] < allowedChars.length - 1) {
			passwordArray[i]++;
			return passwordArray;
		}
		passwordArray[i] = 0;
	}
	return null;
}

function chunkArray(array, chunk) {
	let nextIndex = 0;
	return {
		next: function () {
			return nextIndex < array.length ? {
				value: array.slice(nextIndex, nextIndex += chunk)} : null;
		}
	}
}


async function login(password) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve( [password === 'fdb9991', password])
		},  Math.random() * 2000);
	})
}


class Queue {
	concurrency;
	tasks = [];
	passwordsArray;
	qSize = 0;
	isTaskFinished = false;
	result;

	constructor(concurrency = 4) {
		this.concurrency = concurrency;
	}

	isFullQueue() {
		return this.qSize === this.concurrency;
	}

	enqueue(task, passwords) {
		this.passwordsArray = passwords;
		for (let i = 0; i < passwords.length + this.concurrency; i++) {
			this.tasks.push(task);
			if (!this.isFullQueue()) {
				this.#execute();
			}
		}
	}

	onFulfilled(value, password) {
		if (value) {
			this.isTaskFinished = true;
			this.result = password;
			return console.log(value, password);
		}
		this.qSize -= 1;
		this.#execute()
	}

	trim() {
		this.tasks.shift();
		this.passwordsArray.shift()
	}

	#execute() {
		if (this.tasks.length < 1) {
			return this.onResolve();
		}
		this.qSize += 1;
		this.tasks[0].call(this, this.passwordsArray[0]).then(
			(value) => {
				console.log(value)
				// if (value) {
				//     console.log(value, this.passwordsArray[0])
				// }
				this.onFulfilled(value[0], value[1]);
			});
		this.trim();
	}

	onResolve() {
		console.log([this.isTaskFinished, this.result, 'potato']);
	}
}

const q = new Queue();
function brutePassword(address) {
	const q = new Queue();
	const iterator = brute(8);
	iterator.next()
	let iteratorJunior = chunkArray(arrayOfGeneratedPasswords, 100);
	let iterationData;
	for (let i = 0; i < 2; i++) {
		iterationData = iteratorJunior.next();
		//console.log(iterationData)
		if (iterationData === null) {
			iterator.next()
			iteratorJunior = chunkArray(arrayOfGeneratedPasswords, 100);
			iterationData = iteratorJunior.next();
		}
		if (iterationData !== null) {
			q.enqueue(address, iterationData['value']);
		}
	}

}

brutePassword(login);
