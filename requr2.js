const allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function login(password) {
    return password === 'aaaa1';
}


function brute(maxLength= 5) {
    let arrayOfPasswords = [];
    for(let i = 1; i <= maxLength; i++) {
        generatePasswords(allowedChars, i, arrayOfPasswords);
    }

    console.log(arrayOfPasswords)
    for (let password of arrayOfPasswords) {
        if (login(password)) {
            return password;
        }
    }
    return null;
}

function generatePasswords(arrayOfChars, maxLength, passwords, str='') {
    if (str.length === maxLength) {
        passwords.push(str);
        // console.log(passwords)
        return;
    }

    for(let i of arrayOfChars) {
        generatePasswords(arrayOfChars, maxLength, passwords,str + i)
    }
}

console.time()
console.log(brute())
console.timeEnd()