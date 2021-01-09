var c = 0;


function increaseCounter() {
	c++;
	counter.innerText = c;
}

function decreaseCounter() {
	if(c >= 1) {
		c--;
		counter.innerText = c;
	}
}

function changeName() {
	let newname = cnameinput.value;
	cname.innerText = newname;
}