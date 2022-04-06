const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f'];

async function login(password) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve( [password === 'faf', password])
		},  Math.random() * 4000);
	})
}

function* brute(maxLength = 6) {
	for (let passwordLength = 1; passwordLength <= maxLength; passwordLength++) {
		let passwordArray = createPasswordFromArray(passwordLength);
		do {
			yield createStringFromArray(passwordArray);
			passwordArray = getNextPasswordArray(passwordArray);
		} while (passwordArray);
	}
}

function createPasswordFromArray(arrayLength) {
	const passwordArray = [];
	for (let i = 0; i < arrayLength; i++) {
		passwordArray.push(0);
	}
	return passwordArray;
}

function createStringFromArray(passwordArray) {
	let password = '';
	for (let i = 0; i < passwordArray.length; i++) {
		password += allowedChars[passwordArray[i]];
	}
	if (password === 'undefined') {
		console.log(password)
	}
	return password;
}

function  getNextPasswordArray(passwordArray) {
	for (let i = passwordArray.length - 1; i >= 0; i--) {
		if (passwordArray[i] < allowedChars.length - 1) {
			passwordArray[i]++
			return passwordArray;
		}
		passwordArray[i] = 0;
	}
	return null;
}

class Queue {
	concurrency;
	tasks = [];
	passwordsArray = [];
	qSize = 0;
	isTaskFinished = false;
	isWorking = true;
	result;


	constructor(concurrency = 20) {
		this.concurrency = concurrency;
	}

	isFullQueue() {
		return this.qSize === this.concurrency;
	}

	enqueue(task, password) {
			this.tasks.push(task);
			this.passwordsArray.push(password);
			if (!this.isFullQueue()) {
				this.#execute();
		}
	}

	#execute() {
		if (this.tasks.length < 1) {
			if (this.isWorking) {
				iterate();
			}
			return;
		}
		this.qSize += 1;
		this.tasks.shift().call(this, this.passwordsArray.shift()).then(
			(value) => {
				this.onFulfilled(value[0], value[1]);
			});
	}

	onFulfilled(value, password) {
		if (value) {
			this.isTaskFinished = true;
			this.result = password;
			return;
		}
		this.qSize -= 1;
		this.#execute()
	}

}

const q = new Queue();
const iterator = brute();

for (let i = 0; i < q.concurrency; i++) {
	q.enqueue(login, iterator.next().value)
}

function iterate () {
	if (q.isTaskFinished) {
		console.log(q.result)
		q.isWorking = false;
		return;
	}
	q.enqueue(login, iterator.next().value);
}




