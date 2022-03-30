const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const maxLength = 10;

function login(password) {
return password === "99Ac9aa";
}


function brute(maxLength = 10) {
	for (let passwordLength = 1; passwordLength <= maxLength; passwordLength++) {
		let passwordArray = createPasswordArray(passwordLength);


		do {
			let password = createPasswordFromArray(passwordArray);
			if (login(password)) {
				return password;
			}

			passwordArray = getNextPasswordArray(passwordArray);
		} while (passwordArray);
	}
	return null;

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
	for(let i = passwordArray.length -1; i >= 0; i--) {
		if (passwordArray[i] < allowedChars.length) {
			passwordArray[i]++;
			return passwordArray;
		}
		passwordArray[i] = 0;
	}

	return null

}
console.time();
console.log(brute());
console.timeEnd();


