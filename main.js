const allowedChars = ['a', 'b', 'c', 'A', 'B', 'C']; // can be generated automatically

function login(password) {
	return password === "CCCCCC";
}

function brute(arrayOfChars){
	arrayOfChars.forEach(element => {
  
    arrayOfChars.forEach(element1 => {

      arrayOfChars.forEach(element2 => {

      	arrayOfChars.forEach(element3 => {
        
      	  arrayOfChars.forEach(element4 => {
          
      	  	arrayOfChars.forEach(element5 => {

      				      if(login(element + element1 + element2 + element3 + element4 + element5)){
        							return console.log('possword is ' + element + element1 + element2 + element3 + element4 + element5);
                    }

      
    				})
      
    			})
      
    		})
       			
      })
      
    })   

  });
  
}



brute(allowedChars);