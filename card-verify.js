function verify(cardNum){

	let cardBreakdown = numSplit(cardNum);

	let standardSplit = cardBreakdown[0];

	let multiSplit = cardBreakdown[1];

	let checkSum = 0;

	//Sum all of the standard numbers
	standardSplit.map(num => {
		checkSum += num;
	})

	let tmpMultiCheckSum = multiSplit.map(item => {
		let res = item * 2;
		return res;
	})

	
	if((checkSum + addNumbers(tmpMultiCheckSum)) % 10 === 0){
		console.log(`Card (${cardNum}) is valid!\nProvider: ${getProvider(cardNum)}`)	;
	} else{
		console.log(`Card number ${cardNum} is invalid`);
	}

	console.log('\n')
}

function addNumbers(arr){
	let sum = 0;
	for(let i = 0; i < arr.length; i++){
		if(arr[i] > 9){
			let item = arr[i];
			while(item > 0){
				let rightMost = item;
				rightMost %= 10;
				sum += rightMost;
				item = Math.floor(item / 10);
			}
		}
		else{
			sum += arr[i];
		}
	}
	return sum;
}



function numSplit(num){
	//Init variables
	let count = 1,
	rightMost = num,
	first = [],
	second = [];
	//Loop to get right most number;
	while(num > 0){

		rightMost = num;
		rightMost %= 10;

		num = Math.floor(num / 10);

		if(count % 2 == 0){
			second.push(rightMost);
		} 
		else{
			first.push(rightMost);
		}
		count++;
	}
	return [first, second];
}

function getProvider(card){
	let cardString = card.toString();
	let cardLength = cardString.length; //length of card

	if((cardLength === 13 || cardLength === 16) && getNthNumbers(cardString, 1) === 4){
		//visa
		return 'Visa';
	}
	else if(cardLength === 15 && [34, 37].includes(getNthNumbers(cardString, 2))){
		//Amex
		return 'Amex'
	}
	else if(cardLength === 16 && [51,52,53,54,55].includes(getNthNumbers(cardString, 2))){
		//Master
		return 'Master';
	}
	else{
		return 'Provider not known';
	}
}

function getNthNumbers(card, n){
	let cardLen = Math.floor(Math.log10(card)+1);
	return cardLen >= n ? Math.trunc(card / Math.pow(10, cardLen - n)) : card;
}


//AMEX
verify(378282246310005);

//Master
verify(5105105105105100);

//Visa
verify(4012888888881881);