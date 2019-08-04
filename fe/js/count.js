/*
	This function is used to restrict the number of answers the end user can select.
	Each checkbox the user clicks increases the newCount variable by one, once it
	reaches the max count specified in maxCount it will generate a JavaScript alert.
*/

function KeepCount() {
	var newCount = 0
	var maxCount = document.getElementById("ansTotal").value
	var a1Checked = false;
	var a2Checked = false;
	var a3Checked = false;
	var a4Checked = false;
	var a5Checked = false;

    // If a1 is clicked this will add 1 to new Count and set a1Checked to True
	if (document.getElementById("a1check").checked) {
		newCount = newCount + 1;
		a1Checked = true;
	}

	// If a2 is clicked this will add 1 to new Count and set a2Checked to True
	if (document.getElementById("a2check").checked) {
		newCount = newCount + 1;
		a2Checked = true;
	}

	// If a3 is clicked this will add 1 to new Count and set a3Checked to True
	if (document.getElementById("a3check").checked) {
		newCount = newCount + 1;
		a3Checked = true;
	}

	// If a4 is clicked this will add 1 to new Count and set a4Checked to True
	if (document.getElementById("a4check").checked) {
		newCount = newCount + 1;
		a4Checked = true;
	}

	// If a5 is clicked this will add 1 to new Count and set a5Checked to True
	if (document.getElementById("a5check").checked) {
		newCount = newCount + 1;
		a5Checked = true;
	}

    // Check to see if new Count and maxCount are equal, if so then all checkboxes that haven't been clicked will be disabled
	if (newCount == maxCount) {
		// If a1 is checked then set disabled to false
		if (a1Checked) {
			document.getElementById("a1check").disabled = false;
			document.getElementById("answerSelected").innerHTML += "A";
		}
		// If a2 is checked then set disabled to false
		if (a1Checked === false) {
			document.getElementById("a1check").disabled = true;
		}
		// If a2 is checked then set disabled to false
		if (a2Checked) {
			document.getElementById("a2check").disabled = false;
			document.getElementById("answerSelected").innerHTML += "B";
		}
		// If a2 is unchecked then set disabled to true
		if (a2Checked === false) {
			document.getElementById("a2check").disabled = true;
		}
		// If a3 is checked then set disabled to false
		if (a3Checked) {
			document.getElementById("a3check").disabled = false;
			document.getElementById("answerSelected").innerHTML += "C";
		}
		// If a3 is unchecked then set disabled to true
		if (a3Checked === false) {
			document.getElementById("a3check").disabled = true;
		}
		// If a4 is checked then set disabled to false
		if (a4Checked) {
			document.getElementById("a4check").disabled = false;
			document.getElementById("answerSelected").innerHTML += "D";
		}
		// If a4 is unchecked then set disabled to true
		if (a4Checked === false) {
			document.getElementById("a4check").disabled = true;
		}
		// If a5 is checked then set disabled to false
		if (a5Checked) {
			document.getElementById("a5check").disabled = false;
			document.getElementById("answerSelected").innerHTML += "E";
		}
		// If a5 is unchecked then set disabled to true
		if (a5Checked === false) {
			document.getElementById("a5check").disabled = true;
		}
		// If any of the non disabled checkboxes are unchecked then all checkboxes will have disabled set to false
	} else {
		document.getElementById("a1check").disabled = false;
		document.getElementById("a2check").disabled = false;
		document.getElementById("a3check").disabled = false;
		document.getElementById("a4check").disabled = false;
		document.getElementById("a5check").disabled = false;
		document.getElementById("answerSelected").innerHTML = "";
	}
}

