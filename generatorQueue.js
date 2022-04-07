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
	qSize = 0;
	isTaskFinished = false;
	result;

	constructor(concurrency = 20) {
		this.concurrency = concurrency;
	}

	isFullQueue() {
		return this.qSize === this.concurrency;
	}

	enqueue(task) {
			this.tasks.push(task);
			if (!this.isFullQueue()) {
				this.#execute();
		}
	}

	#execute() {
		if (this.tasks.length < 1 || this.isTaskFinished) {
			return;
		}
		this.qSize += 1;
		const shiftTask = this.tasks.shift()
		shiftTask[0].call(this, shiftTask[1]).then(
			(value) => {
				this.qSize -= 1;
				this.result([value[0], shiftTask[1]])
				this.#execute()
			});
	}

	onFulfilled(task) {
		this.result = task;
	}

}

const q = new Queue();
const iterator = brute();

for (let i = 0; i < q.concurrency; i++) {
	q.enqueue([login, iterator.next().value])
}


q.onFulfilled((result) => {
	if (result[0]) {
		console.log(result[1])
		q.isTaskFinished = true;
		return;
	}
	q.enqueue([login, iterator.next().value]);
})
