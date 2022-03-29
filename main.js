const allowedChars = ['a', 'b', 'c', 'A', 'B', 'C']; // can be generated automatically

function login(password) {
	return password === "CaCbBA";
}

function brute(arrayOfChars){


	for(let element of arrayOfChars) {
		if (login(element)) {
			return console.log('possword is ' + element);

		}
	}
	for(let element of arrayOfChars) {
		for (let element1 of arrayOfChars) {
			if (login(element + element1)) {
				return console.log('possword is ' + element + element1);

			}
		}

	}
		for (let element of arrayOfChars) {
			for (let element1 of arrayOfChars) {
				for (let element2 of arrayOfChars) {
					if (login(element + element1 + element2)) {
						return console.log('possword is ' + element + element1 + element2);

					}
				}
			}

		}
			for (let element of arrayOfChars) {
				for (let element1 of arrayOfChars) {
					for (let element2 of arrayOfChars) {
						for (let element3 of arrayOfChars) {
							if (login(element + element1 + element2 + element3)) {
								return console.log('possword is ' + element + element1 + element2 + element3);

							}
						}
					}
				}
			}

				for (let element of arrayOfChars) {
					for (let element1 of arrayOfChars) {
						for (let element2 of arrayOfChars) {
							for (let element3 of arrayOfChars) {
								for (let element4 of arrayOfChars) {
									if (login(element + element1 + element2 + element3 + element4)) {
										return console.log('possword is ' + element + element1 + element2 + element3 + element4);

									}
								}
							}
						}
					}

					for (let element of arrayOfChars) {
						for (let element1 of arrayOfChars) {
							for (let element2 of arrayOfChars) {
								for (let element3 of arrayOfChars) {
									for (let element4 of arrayOfChars) {
										for (let element5 of arrayOfChars) {
											if (login(element + element1 + element2 + element3 + element4 + element5)) {
												return console.log('possword is ' + element + element1 + element2 + element3 + element4 + element5);
											}
										}
									}
								}
							}
						}
					}
				}


			}


brute(allowedChars);
