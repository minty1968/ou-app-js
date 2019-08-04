//   /*jshint esversion: 6 */
let q = 1;
let m = 0;
let obj = [];
let data = [];
let correctTotal = 0;
let examQuestionNumbers = [];
let userAnswer = [];
let flagSet = [];
let correctAnswers = [];
let wrongAnswers = [];
let unAnswered = [];
let NAQuestion = [];
let naQuestionNumbers = [];
let flaggedQuestion = [];
let fQuestionNumbers = [];
let qTopic101 = 0;
let qTopic102 = 0;
let qTopic103 = 0;
let qTopic104 = 0;
let qTopic105 = 0;
let qTopic106 = 0;
let qTopic107 = 0;
let qTopic108 = 0;
let qTopic109 = 0;
let qTopic110 = 0;
let aTopic101 = 0;
let aTopic102 = 0;
let aTopic103 = 0;
let aTopic104 = 0;
let aTopic105 = 0;
let aTopic106 = 0;
let aTopic107 = 0;
let aTopic108 = 0;
let aTopic109 = 0;
let aTopic110 = 0;

let ExamQuestions = function () {

    /////////////////////////////////////////////////////////////////
    //                                                             //
    //    This function shuffles of question Numbers generated     //
    //    from the first part of get questions function            //
    //                                                             //
    /////////////////////////////////////////////////////////////////
    function shuffleQuestionNumbers ( qArray ) {
        var cIndex = qArray.length, tValue, rIndex;
        while (0 !== cIndex) {
            rIndex = Math.floor(Math.random() * cIndex);
            cIndex -= 1;
            tValue = qArray[cIndex];
            qArray[cIndex] = qArray[rIndex];
            qArray[rIndex] = tValue;
        }
        return qArray;
    }  //  End of shuffleQuestionNumbers Function


    /////////////////////////////////////////////////////////////////////
    //                                                                 //
    //    This function will show the user how many questions they     //
    //    have answered, how many they have missed and how many they   //
    //    have flagged, it will allow then to redo the flagged and     //
    //    unanswered questions, if they have enough time left.         //
    //                                                                 //
    /////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////
    //                                            //
    //         Display end result page            //
    //                                            //
    ////////////////////////////////////////////////

    let displayExitPage = function () {
        document.getElementById('uaButton').style.display = 'none';
        document.getElementById("showImage").style.display = "none";

        userName = document.getElementById("userName").value;
        e = document.getElementById("numMaxQuestions");
        numMaxQuestions = e.options[e.selectedIndex].text;
        examType = document.getElementById("examType").value;

	    //  Check if user has started the exam or not by checking status of examQuestionNumbers
	    if ( examQuestionNumbers === undefined || examQuestionNumbers.length === 0 ) {
	        document.getElementById("examSummary").style.display = "block";
	        document.getElementById("examResult").style.display = "block";
            document.getElementById("examSummary").innerHTML = userName + " you selected to exit the LPIC-1 " + examType + " exam, without starting it.";
	        document.getElementById("examResult").innerHTML = "Sorry to see you go, please come back and try the exam again, you can answer as few as 10 Questions.";
            document.getElementById("btn-SummaryPageAllQuestions").disabled = true;
		} else {
			var examPercentage = 0;
			var a = new XMLHttpRequest();
            var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
            // Find and check the answer for the selected question
            a.open("GET", jsonURL);
            a.onreadystatechange = function(){
                if ( this.readyState == 4 && this.status == 200 ) {
                    obj = JSON.parse(this.responseText);
		            console.log("DB accessed within checkAnswers function");
                    for ( q = 0; q < numMaxQuestions; q++ ) {
			            m = examQuestionNumbers[q];
						var str = obj[m].name;
						var res = str.substring(0, 3);
	                    switch (res) {
                            case "101":
                                qTopic101++;
                                break;
                            case "102":
                                qTopic102++;
                                break;
                            case "103":
                                qTopic103++;
                                break;
                            case "104":
                                qTopic104++;
                                break;
                            case "105":
                                qTopic105++;
                                break;
                            case "106":
                                qTopic106++;
                                break;
                            case "107":
                                qTopic107++;
                                break;
                            case "108":
                                qTopic108++;
                                break;
                            case "109":
                                qTopic109++;
                                break;
                            case "110":
                                qTopic110++;
                                break;
                            default:
                                console.log("Question topic not found");
                        } // End Case Statement

                        if ( userAnswer[q] ==  obj[m].correct ) {
                            correctTotal++;
                            correctAnswers.push(m);
						    switch (res) {
                                case "101":
                                    aTopic101++;
                                    break;
                                case "102":
                                    aTopic102++;
                                    break;
                                case "103":
                                    aTopic103++;
                                    break;
                                case "104":
                                    aTopic104++;
                                    break;
                                case "105":
                                    aTopic105++;
                                    break;
                                case "106":
                                    aTopic106++;
                                    break;
                                case "107":
                                    aTopic107++;
                                    break;
                                case "108":
                                    aTopic108++;
                                    break;
                                case "109":
                                    aTopic109++;
                                    break;
                                case "110":
                                    aTopic110++;
                                    break;
                                default:
                                    console.log("Question not answered");
                            }  // End switch statement
                        } else if ( userAnswer[q] === undefined || userAnswer[q] == "" ) {
                            unAnswered.push(m);
                        } else {
                            wrongAnswers.push(m);
                        } // End of Answer check if loop
                    }  // End for loop for q variable

				    // Setup all the variables to show as percenatge of pass rate +59%
                    var correctPercentage = Math.floor(correctAnswers.length/numMaxQuestions*100);
     			    var topic101Percentage = Math.floor(aTopic101/qTopic101*100);
	    		    var topic102Percentage = Math.floor(aTopic102/qTopic102*100);
		    	    var topic103Percentage = Math.floor(aTopic103/qTopic103*100);
			        var topic104Percentage = Math.floor(aTopic104/qTopic104*100);
			        var topic105Percentage = Math.floor(aTopic105/qTopic105*100);
			        var topic106Percentage = Math.floor(aTopic106/qTopic106*100);
			        var topic107Percentage = Math.floor(aTopic107/qTopic107*100);
			        var topic108Percentage = Math.floor(aTopic108/qTopic108*100);
			        var topic109Percentage = Math.floor(aTopic109/qTopic109*100);
			        var topic110Percentage = Math.floor(aTopic110/qTopic110*100);

		    		if ( correctPercentage > 59 ) {
                                    var examPassFail = "Passed";
                                    var examResult = examPassFail.fontcolor('green');
				    } else {
				      var examPassFail = "Failed";
                                    var examResult = examPassFail.fontcolor('red');
				    }  // End examPercentage if statement
			        document.getElementById("examSummary").style.display = "block";
				    document.getElementById("examResult").style.display = "block";
				    document.getElementById("examSectionSummary").style.display = "block";
				    document.getElementById("examSummary").innerHTML = userName + " you have just completed the LPIC-1 " + examType + " exam.";
                    document.getElementById("examResult").innerHTML = "You got " + correctAnswers.length + " correct out of " + numMaxQuestions + " questions.";
				    // Here we tell the user if they passed or failed and give a summary of the topics using percentage
				    document.getElementById("examSectionSummary").innerHTML = "This means you have " + examResult + "."
                                //    document.getElementById("passFail").innerHTML = examResult;
				    // Here we'll display a summary by topic from the LPIC-1 101-400 and 102-400 objectives
				    // Displaying the first four topic sections, as these can be used for both certification exams
				    document.getElementById("examTopicSectionSummary1").style.display = "block";
				    document.getElementById("examTopicSectionSummary2").style.display = "block";
				    document.getElementById("examTopicSectionSummary3").style.display = "block";
				    document.getElementById("examTopicSectionSummary4").style.display = "block";


				    // LPIC-1 101-400 used here
                    if ( examType == "101-400" ) {
					    if ( qTopic101 > 0 ) {
                            document.getElementById("examTopicSectionSummary1").innerHTML = "Topic 101: System Architecture" + '<br />' + "You were asked " + qTopic101 + " questions, and you got " + aTopic101 + " correct  " + topic101Percentage + "%";
				        } else {
                            document.getElementById("examTopicSectionSummary1").innerHTML = "Topic 101: System Architecture" + '<br />' + "No Questions Asked in this section today.";
				        } //  End of if statement for  qTopic1xx.length
					    if ( qTopic102 > 0 ) {
                            document.getElementById("examTopicSectionSummary2").innerHTML = "Topic 102: Linux Installation and Package Management" + '<br />' + "You were asked " + qTopic102 + " questions, and you got " + aTopic102 + " correct " + topic102Percentage + "%";
				        } else {
                            document.getElementById("examTopicSectionSummary2").innerHTML = "Topic 102: Linux Installation and Package Management" + '<br />' + "No Questions Asked in this section today.";
					    } //  End of if statement for  qTopic1xx.length
					    if ( qTopic103 > 0 ) {
                            document.getElementById("examTopicSectionSummary3").innerHTML = "Topic 103: GNU and Unix Commands" + '<br />' + "You were asked " + qTopic103+ " questions, and you got " + aTopic103 + " correct  " + topic103Percentage + "%";
				        } else {
                            document.getElementById("examTopicSectionSummary3").innerHTML = "Topic 103: GNU and Unix Commands" + '<br />' + "No Questions Asked in this section today.";
					    }  //  End of if statement for  qTopic1xx.length
					    if ( qTopic104 > 0 ) {
                            document.getElementById("examTopicSectionSummary4").innerHTML = "Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard" + '<br />' + "You were asked " + qTopic104 + " questions, and you got " + aTopic104 + " correct  " + topic104Percentage + "%";
				        } else {
                            document.getElementById("examTopicSectionSummary4").innerHTML = "Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard" + '<br />' + "No Questions Asked in this section today.";
					    } //  End of if statement for  qTopic1xx.length
				    } else if ( examType == "102-400" ) {
				        // LPIC-1 102-400 used here
					    // Displaying the five and six topic sections, as these are only required for the 102-400 certification exam
				        document.getElementById("examTopicSectionSummary5").style.display = "block";
					    document.getElementById("examTopicSectionSummary6").style.display = "block";
					    if ( qTopic105 > 0 ) {
				            document.getElementById("examTopicSectionSummary1").innerHTML = "Topic 105: Shells, Scripting and Data Management" + '<br />' + "You were asked " + qTopic105 + " questions, and you got " + aTopic105 + " correct  " + topic105Percentage + "%";
				        } else {
						    document.getElementById("examTopicSectionSummary1").innerHTML = "Topic 105: Shells, Scripting and Data Management" + '<br />' + "No Questions Asked in this section today.";
				        }
					    if ( qTopic106 > 0 ) {
					        document.getElementById("examTopicSectionSummary2").innerHTML = "Topic 106: User Interfaces and Desktops" + '<br />' + "You were asked " + qTopic106 + " questions, and you got " + aTopic106 + " correct  " + topic106Percentage + "%";
				        } else {
						    document.getElementById("examTopicSectionSummary2").innerHTML = "Topic 106: User Interfaces and Desktops" + '<br />' + "No Questions Asked in this section today.";
					    }
					    if ( qTopic107 > 0 ) {
					        document.getElementById("examTopicSectionSummary3").innerHTML = "Topic 107: Administrative Tasks" + '<br />' + "You were asked " + qTopic107 + " questions, and you got " + aTopic107 + " correct  " + topic107Percentage + "%";
				        } else {
						    document.getElementById("examTopicSectionSummary3").innerHTML = "Topic 107: Administrative Tasks" + '<br />' + "No Questions Asked in this section today.";
					    }
					    if ( qTopic108 > 0 ) {
					        document.getElementById("examTopicSectionSummary4").innerHTML = "Topic 108: Essential System Services" + '<br />' + "You were asked " + qTopic108 + " questions, and you got " + aTopic108 + " correct  " + topic108Percentage + "%";
				        } else {
						    document.getElementById("examTopicSectionSummary4").innerHTML = "Topic 108: Essential System Services" + '<br />' + "No Questions Asked in this section today.";
					    }
					    if ( qTopic109 > 0 ) {
					        document.getElementById("examTopicSectionSummary5").innerHTML = "Topic 109: Networking Fundamentals" + '<br />' + "You were asked " + qTopic109 + " questions, and you got " + aTopic109 + " corrext " + topic109Percentage + "%";
					    } else {
						    document.getElementById("examTopicSectionSummary5").innerHTML = "Topic 109: Networking Fundamentals" + '<br />' + "No Questions Asked in this section today.";
					    }
					    if ( qTopic110 > 0 ) {
					        document.getElementById("examTopicSectionSummary6").innerHTML = "Topic 110: Security" + '<br />' + "You were asked " + qTopic110 + " questions, and you got " + aTopic110 + " correct  " + topic110Percentage + "%";
					    } else {
						    document.getElementById("examTopicSectionSummary6").innerHTML = "Topic 110: Security" + '<br />' + "No Questions Asked in this section today.";
					    }
				    }  // End examType if statement
			    };  // End of if statement for readyState
            }  // End of a.onreadystatechange function
            a.send();
		}
	};  // Function End

    let getQuestions = function (examQN) {
        userName = document.getElementById("userName").value;
	    e = document.getElementById("numMaxQuestions");
	    numMaxQuestions = e.options[e.selectedIndex].text;
	    examType = document.getElementById("examType").value;

	    if ( examQuestionNumbers === undefined || examQuestionNumbers.length === 0 ) {
            var a = new XMLHttpRequest();
	        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
	        if ( examType == "101-400" ) {
	            var minNumName = 101;
                var maxNumName = 104;
            } else if ( examType == "102-400" ) {
	            var minNumName = 105;
                var maxNumName = 110;
            }
            var amountTypes = numMaxQuestions / 10;
            var amountTIB = amountTypes * 2;
            var amountMulti = amountTypes * 3;
            var amountSingle = amountTypes * 5;
            var c = 0;
            var x = 0;
            var y = 0;
            var z = 0;
            var singleQN = [];
            var multipleQN = [];
            var typedQN = [];
            var examQN = [];

            // connect to DB to extract all records, then select the ones required and store in array
            a.open("GET", jsonURL);
            a.onreadystatechange = function(){
                if ( this.readyState == 4 && this.status == 200 ) {
                    obj = JSON.parse(this.responseText);
                    console.log("DB connected getQuestions function");
                    for ( c = 0; c < obj.length; c++ ) {
                        var str = obj[c].name;
                        var res = str.substring(0, 3);
		                if ( obj[c].type == "single" && res >= minNumName && res <= maxNumName ) {
		                    singleQN.push(c);
                        } else if ( obj[c].type == "multiple" && res >= minNumName && res <= maxNumName ) {
                            multipleQN.push(c);
                        } else if ( obj[c].type == "typed" && res >= minNumName && res <= maxNumName ) {
		                typedQN.push(c);
			        } // End Else and If Statement
		        } // End for loop for obj.length

        	    // Shuffle question Numbers in each type
		        singleQN = shuffleQuestionNumbers(singleQN);
                multipleQN = shuffleQuestionNumbers(multipleQN);
		        typedQN = shuffleQuestionNumbers(typedQN);

                // Set question numbers to be asked in exam
 		        for ( x = 0; x < singleQN.length; x++ ) {
		            if ( x < amountSingle ) {
		                examQuestionNumbers.push(singleQN[x]);
		            }
		        }
                for ( x = 0; x < multipleQN.length; x++ ) {
                   if ( x < amountMulti ) {
                      examQuestionNumbers.push(multipleQN[x]);
                   }
                }
                for ( x = 0; x < typedQN.length; x++ ) {
                    if ( x < amountTIB ) {
                       examQuestionNumbers.push(typedQN[x]);
		            }
                }

                    // Shuffle question Numbers to ensure random exam
                    examQuestionNumbers = shuffleQuestionNumbers(examQuestionNumbers);
                    m = examQuestionNumbers[q - 1];
                }  // End of if statement for readyState
	        };  // End of a.onreadystatechange function
            a.send();
            document.getElementById("examConfirm").style.display = "none";
	        document.getElementById("qButtons").style.display = "block";
            document.getElementById("btn-Previous").disabled = true;
	        initTimer();  //  Start exam timer now
        }  // End if statement for examQuestionNumbers undefined check
        //  Start displaying exam page header here, ready for questions
        document.getElementById("displayExamType").innerHTML = "LPIC-1 " + examType + " Exam";
        document.getElementById('displayQuestionNumber').innerHTML = q;
        document.getElementById('displayMaxQuestions').innerHTML = e.options[e.selectedIndex].text;
        var a = new XMLHttpRequest();
        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
	    m = examQuestionNumbers[q - 1];
        // Get questions based on examQuestionNumbers array using m variable value
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
            if ( this.readyState == 4 && this.status == 200 ) {
                obj = JSON.parse(this.responseText);
                if ( obj[m].type == "single" ) {                    var RadAns = document.Radio.Answer;
                    if ( userAnswer[q - 1] !== undefined ) {
                        switch (userAnswer[q - 1]) {
                            case "A":
                                document.getElementById("radio1").checked = true;
                                break;
                            case "B":
                                document.getElementById("radio2").checked = true;
                                break;
                            case "C":
                                document.getElementById("radio3").checked = true;
                                break;
                            case "D":
                                document.getElementById("radio4").checked = true;
                                break;
                            case "E":
                                document.getElementById("radio5").checked = true;
                                break;
                            default:
                                console.log( " Nothing detected for User Answer in Single answer question check " );
                                for ( var i = 0; i < RadAns.length; i++ ) {
                                    RadAns[i].checked = function() {
                                        RadAns[i].checked = false;
                                    };
                                }
                            }
                            document.getElementById("radio6").style.display = "none";
                    } else {
                       for ( var i = 0; i < RadAns.length; i++ ) {
                           RadAns[i].checked = function() {
                               RadAns[i].checked = false;
                           };
                       }
                       document.getElementById("radio6").style.display = "none";
                    }
                    document.getElementById("Single").style.display = "block";
                    document.getElementById("showImage").style.display = "none";
                    document.getElementById("flag").checked = false;
                    $("#answerSelected").text(userAnswer[q-1]);
                    document.getElementById("flagSelected").innerHTML = "N";
                    document.getElementById("Multiple").style.display = "none";
                    document.getElementById("Typed").style.display = "none";
                    if ( obj[m].imagefile == "Y" ) {
                        document.getElementById("showImage").style.display = "block";
                        $("#displayImage").attr("src",'img/'+obj[m].location);
                    }
                    document.getElementById("questionSingle").innerHTML = obj[m].question;
                    document.getElementById("a1radio").innerHTML = obj[m].answer1;
                    document.getElementById("a2radio").innerHTML = obj[m].answer2;
                    document.getElementById("a3radio").innerHTML = obj[m].answer3;
                    document.getElementById("a4radio").innerHTML = obj[m].answer4;
                    document.getElementById("a5radio").innerHTML = obj[m].answer5;
                } else if ( obj[m].type == "multiple" ) {
                  if ( userAnswer[q - 1] !== undefined ) {
                      var checkboxes = document.getElementsByTagName('input');
                        for ( var i = 0; i < checkboxes.length; i++ )  {
                            if (checkboxes[i].type == 'checkbox')   {
                                checkboxes[i].checked = false;
                                checkboxes[i].disabled = false;
                            }
                        }
                     var chr = userAnswer[q - 1];
                     var n = chr.length;
                     for ( var i = 0; i < n; i++ ) {
                         var res = chr.substring(i, i+1);
                         switch (res) {
                             case "A":
                                document.getElementById("a1check").checked = true;
                                break;
                             case "B":
                                document.getElementById("a2check").checked = true;
                                break;
                             case "C":
                                document.getElementById("a3check").checked = true;
                                break;
                             case "D":
                                document.getElementById("a4check").checked = true;
                                break;
                             case "E":
                                document.getElementById("a5check").checked = true;
                                break;
                             default:
                                console.log( " Nothing detected for User Answer in multiple answer question check " );
                                var checkboxes = document.getElementsByTagName('input');
                                for ( var i = 0; i < checkboxes.length; i++ )  {
                                    if (checkboxes[i].type == 'checkbox')   {
                                        checkboxes[i].checked = false;
                                        checkboxes[i].disabled = false;
                                    }
                                }
                             }
                        }
                    } else {
                        var checkboxes = document.getElementsByTagName('input');
                        for ( var i = 0; i < checkboxes.length; i++ )  {
                            if (checkboxes[i].type == 'checkbox')   {
                                checkboxes[i].checked = false;
                                checkboxes[i].disabled = false;
                            }
                        }
                    }
                    document.getElementById("Single").style.display = "none";
                    document.getElementById("Multiple").style.display = "block";
                    document.getElementById("showImage").style.display = "none";
                    document.getElementById("flag").checked = false;
                    $("#answerSelected").text(userAnswer[q-1]);
                    document.getElementById("flagSelected").innerHTML = "N";
                    document.getElementById("Typed").style.display = "none";
                    if ( obj[m].imagefile == "Y" ) {
                        document.getElementById("showImage").style.display = "block";
                        $("#displayImage").attr("src",'img/'+obj[m].location);
                    }
                    document.getElementById("questionMultiple").innerHTML = obj[m].question;
                    document.getElementById("message").innerHTML = obj[m].message;
                    document.getElementById("ansTotal").value = obj[m].correct.length;
                    document.getElementById("a1label").innerHTML = obj[m].answer1;
                    document.getElementById("a2label").innerHTML = obj[m].answer2;
                    document.getElementById("a3label").innerHTML = obj[m].answer3;
                    document.getElementById("a4label").innerHTML = obj[m].answer4;
                    document.getElementById("a5label").innerHTML = obj[m].answer5;
                } else if ( obj[m].type == "typed" ) {
                    document.getElementById("Single").style.display = "none";
                    document.getElementById("Multiple").style.display = "none";
                    document.getElementById("Typed").style.display = "block";
                    document.getElementById("showImage").style.display = "none";
                    if ( userAnswer[q - 1] !== undefined ) {
                        $("#answerSelected").text(userAnswer[q-1]);
                        document.getElementById('a1typed').value = userAnswer[q - 1];
                    } else {
                        document.getElementById('a1typed').focus();
                    }
                    document.getElementById("flag").checked = false;
                    document.getElementById("flagSelected").innerHTML = "N";
                    if ( obj[m].imagefile == "Y" ) {
                        document.getElementById("showImage").style.display = "block";
                        $("#displayImage").attr("src",'img/'+obj[m].location);
                    }
                    document.getElementById("questionTyped").innerHTML = obj[m].question;
                    document.getElementById("messageTyped").innerHTML = obj[m].message;
                }  // End if statement for obj type
	        }  // End of if statement for readyState
        };  // End of a.onreadystatechange function
        a.send();
    };   // End of displayQuestions function

    ////////////////////////////////////////////////////////////
    //                                                        //
    //        Here we are listening for button clicks         //
    //                                                        //
    ////////////////////////////////////////////////////////////
    let setupEventListeners = function () {

    ////////////////////////////////////////////////////////////
    //                                                        //
    //    This section is for recording the users answers     //
    //                                                        //
    ////////////////////////////////////////////////////////////

    // Records what radio button is selected and records it on an answers label
    let RadAns = document.Radio.Answer;
    let prevAns = null;
    for ( var i = 0; i < RadAns.length; i++ ) {
        RadAns[i].onclick = function() {
            if(this !== prevAns) {
                prevAns = this;
            }
            document.getElementById("answerSelected").innerHTML = this.value;
        };
    }  // End of Radio button answer recording

    // Mirror what is typed in Typed Answer Textbox with Answer label
    // We'll then use the label to record what was typed in.
    $("#a1typed").keyup(function () {
        var typedValue = $(this).val();
        $("#answerSelected").text(typedValue);
    }).keyup();

    // Checkbox answers are recorded within the count'js file
    // so no need to add in additional functionality here

    ////////////////////////////////////////////////////////////
    //                                                        //
    //         Onclick function for flag selection            //
    //                                                        //
    ////////////////////////////////////////////////////////////
    document.getElementById('flag').onclick = function() {
        if ( this.checked ) {
            document.getElementById("flagSelected").innerHTML = "Y";
            flagSet.push(m);
        } else {
            document.getElementById("flagSelected").innerHTML = "N";
            flagSet.pop(m);
        }
    };

    ////////////////////////////////////////////////////////////
    //                                                        //
    //            Exam or Flash Card choice Buttons           //
    //                                                        //
    ////////////////////////////////////////////////////////////

    // assign function to onclick property of Exam Choice button
    document.getElementById("btn-examLPIC1").addEventListener("click", function () {
       // Hide Initial Section
       document.getElementById("fc-exam").style.display = "none";
       // Show Disclaimer Section
       document.getElementById("initial").style.display = "block";
    });

    ////////////////////////////////////////////////////////////
    //                                                        //
    //         Exam choice Buttons - 101-400 and 102-400      //
    //                                                        //
    ////////////////////////////////////////////////////////////

    // assign function to onclick property of Exam Choice 101-400 button
    document.getElementById("btn-Exam101").addEventListener("click", function () {
        // Assign value for exam type
        document.getElementById("examType").value = "101-400";
        // Hide Initial Section
        document.getElementById("initial").style.display = "none";
        // Show Disclaimer Section
        document.getElementById("disclaimer").style.display = "block";
    });

    // assign function to onclick property of Exam Choice 102-400 button
    document.getElementById("btn-Exam102").addEventListener("click", function () {
        // Assign value for exam type
        document.getElementById("examType").value = "102-400";
        // Hide Initial Section
        document.getElementById("initial").style.display = "none";
        // Show Disclaimer Section
        document.getElementById("disclaimer").style.display = "block";
    });

	//////////////////////////////
    //                          //
    //     Disclaimer page      //
    //                          //
    //////////////////////////////

    // assign function to onclick property of Disclaimer dis-agree button
    document.getElementById("btn-Summary").addEventListener("click", function () {
        // Hide disclaimer Section
        document.getElementById("disclaimer").style.display = "none";
        // Show End Exam Section
        document.getElementById("exitExam").style.display = "block";
        displayExitPage();
    });

    // assign function to onclick property of Disclaimer agree button
	document.getElementById("btn-Agree").addEventListener("click", function () {
        // Hide disclaimer Section
        document.getElementById("disclaimer").style.display = "none";
        // Show User Info Section
        document.getElementById("userInfo").style.display = "block";
    });

	//////////////////////////////
    //                          //
    //     User Info page       //
    //                          //
    //////////////////////////////

    // assign function to onclick property of User Info Quit button
    document.getElementById("btn-SummaryUI").addEventListener("click", function () {
        // Hide User Info Section
        document.getElementById("userInfo").style.display = "none";
        // Show End Exam Section
        document.getElementById("exitExam").style.display = "block";
        displayExitPage();
    });
 
    // assign function to onclick property of User Info Details Confirm button
    document.getElementById("btn-ExamConfirm").addEventListener("click", function () {
        // Hide User Info Section
        document.getElementById("userInfo").style.display = "none";
        // Show Exam Confirm Section
        document.getElementById("examConfirm").style.display = "block";
        var e = document.getElementById("numMaxQuestions");
        var selectedMaxQuestions = e.options[e.selectedIndex].text;
        document.getElementById("typedUserName").innerHTML = document.getElementById("userName").value;
        document.getElementById("selectedExam").innerHTML = document.getElementById("examType").value;
        document.getElementById("selectedMaxQuestions").innerHTML = selectedMaxQuestions;
        document.getElementById("examTime").innerHTML = selectedMaxQuestions * 1.5;
    });

	////////////////////////////////
    //                            //
    //     Exam Summary page     //
    //                           //
    ///////////////////////////////

    // assign function to onclick property of Exam Summary Quit button
    document.getElementById("btn-SummaryExam").addEventListener("click", function () {
        // Hide Exam Confirm Section
        document.getElementById("examConfirm").style.display = "none";
        // Show Exam Exit Section
        document.getElementById("exitExam").style.display = "block";
        displayExitPage();
    });

    // assign function to onclick property of Exam Start Confirm button
    document.getElementById("btn-ExamStart").addEventListener("click", function () {
        // Hide Initial Section
        document.getElementById("examConfirm").style.display = "none";
        // Show Disclaimer Section
        document.getElementById("qButtons").style.display = "block";
        document.querySelector(".nav").style.display = 'block';  // Nav is a class not an id
	    getQuestions();
    });

    ///////////////////////////
    //                       //
    //     Exam Buttons      //
    //                      //
    //////////////////////////

    // assign function to onclick property of exam previous question button
    document.getElementById("btn-Previous").addEventListener("click", function () {
        var m = examQuestionNumbers[q-1];
        var u = examQuestionNumbers.indexOf(m);
	    var p = userAnswer[u];
        var uA = document.getElementById('answerSelected').innerHTML;
        userAnswer.splice(u,1,uA);
        q--;
        if ( q > 0 ) {
            if ( q == 1 ) {
                document.getElementById("btn-Previous").disabled = true;
            } else {
                document.getElementById("btn-Previous").disabled = false;
                document.getElementById("btn-Next").disabled = false;
            }
		    $('label[id*="answerSelected"]').text('');
		    getQuestions();
        } else {
            q = 1;
            document.getElementById("btn-Previous").disabled = true;
        }
    });

    // assign function to onclick property of exam next question button
    document.getElementById("btn-Next").addEventListener("click", function () {
        var m = examQuestionNumbers[q-1];
        var u = examQuestionNumbers.indexOf(m);
        var p = userAnswer[u];
        var uA = document.getElementById('answerSelected').innerHTML;
        userAnswer.splice(u,1,uA);
   		q++;
        if ( q <= e.options[e.selectedIndex].text ) {
            document.getElementById("btn-Previous").disabled = false;
            document.getElementById("btn-Next").disabled = false;
    		$('label[id*="answerSelected"]').text('');
            getQuestions();
        } else {
            q = e.options[e.selectedIndex].text;
            document.getElementById("btn-Next").disabled = true;
        }
    });

    // assign function to onclick property of exam next question button
    document.getElementById("btn-UpdateAnswer").addEventListener("click", function () {
        if ( fQuestionNumbers.length > 0 ) {
            Loop1:
            for ( n=0; n < fQuestionNumbers.length; n++ ) {
                Loop2:
                for ( q=0; q < examQuestionNumbers.length; q++ ) {
                   if ( examQuestionNumbers[q] == fQuestionNumbers[n] ) {
                        var m = examQuestionNumbers[q];
                        var fqIndex = examQuestionNumbers.indexOf(m);
                        var uA = document.getElementById('answerSelected').innerHTML;
                        fQuestionNumbers.splice(n,1);
                        userAnswer.splice(fqIndex,1,uA);
                        break Loop1;
                    }
                }
            }
        } else {
            document.getElementById("btn-ReviewFlaggedQuestions").disabled = true;
            document.getElementById("rSection").style.display = "block";
        }
        if ( naQuestionNumbers.length > 0 ) {
            Loop1:
            for ( n=0; n < naQuestionNumbers.length; n++ ) {
               Loop2:
               for ( q=0; q < examQuestionNumbers.length; q++ ) {
                   if ( examQuestionNumbers[q] == naQuestionNumbers[n] ) {
                        var m = examQuestionNumbers[q];
                        var naIndex = examQuestionNumbers.indexOf(m);
                        var uA = document.getElementById('answerSelected').innerHTML;
                        naQuestionNumbers.splice(n,1);
                        userAnswer.splice(naIndex,1,uA);
                        break Loop1;
                    }
                }
            }
        } else {
            document.getElementById("btn-ReviewUnansweredQuestions").disabled = true;
            document.getElementById("rSection").style.display = "block";
        }
        document.getElementById("uaButton").style.display = "none";
        document.getElementById("qSummary").style.display = "none";
        document.getElementById('Single').style.display = 'none';
        document.getElementById('Multiple').style.display = 'none';
        document.getElementById('Typed').style.display = 'none';
        var x = document.createEvent("MouseEvent");
        x.initMouseEvent("click", true);
        document.getElementById("btn-SummaryEndExam").dispatchEvent(x);
    });

    // assign function to onclick property of Exam end button
    document.getElementById("btn-SummaryEndExam").addEventListener("click", function () {
        var notAnswered = 0;
        document.getElementById('initial').style.display = 'none';
        document.querySelector(".nav").style.display = 'none';
        document.getElementById('disclaimer').style.display = 'none';
        document.getElementById('exitExam').style.display = 'none';
        document.getElementById('userInfo').style.display = 'none';
        document.getElementById('examConfirm').style.display = 'none';
        document.getElementById("Single").style.display = "none";
        document.getElementById("Multiple").style.display = "none";
        document.getElementById("Typed").style.display = "none";
        document.getElementById("qButtons").style.display = "none";
        document.getElementById("uaButton").style.display = "none";
        var e = document.getElementById("numMaxQuestions");
        var selectedMaxQuestions = e.options[e.selectedIndex].text;
        if ( unAnswered.length == 0 ) {
            for ( q = 0; q < selectedMaxQuestions; q++ ) {
               if ( userAnswer[q] === undefined || userAnswer[q] == "" ) {
                  unAnswered.push(examQuestionNumbers[q]);
                  notAnswered++;
               }
            }
            for ( x = 0; x < flagSet.length; x++ ) {
                for ( y = 0; y < unAnswered.length; y++ ) {
                    if ( flagSet[x] == unAnswered[y] ) {
                         flagSet.splice(x,1);
                    }
                }
            }
        }
        // Show user how many questions they had to answer
    	document.getElementById("rButtons").style.display = "inline";
	    document.getElementById("seButtons").style.display = "inline";
	    document.getElementById("btn-SummaryQuestions").disabled = true;
    	document.getElementById("reviewHeader1").innerHTML = "Your exam comprised of " + examQuestionNumbers.length + " questions.";
        if ( flagSet.length > 0 ) {
            // Show user how many questions they flagged for review
            document.getElementById("btn-ReviewFlaggedQuestions").disabled = false;
	        document.getElementById("reviewHeader2").innerHTML = "There are " + flagSet.length + " questions with the review flag selected.";
	    } else {
	    	document.getElementById("btn-ReviewFlaggedQuestions").disabled = true;
	    }
	    if ( unAnswered.length > 0 || notAnswered > 0) {
	       // Show user how many questions they didn't answer
           document.getElementById("btn-ReviewUnansweredQuestions").disabled = false;
	       document.getElementById("reviewHeader3").innerHTML = "There are " + notAnswered + " questions that have not been answered.";
	    } else {
		   document.getElementById("btn-ReviewUnansweredQuestions").disabled = true;
	    }
    });

    ////////////////////////////////////////////////////////////
    //                                                        //
    //      Review unanswered, flagged or all questions       //
    //                                                        //
    ////////////////////////////////////////////////////////////

    // assign function to onclick property of Exam end button
    document.getElementById("btn-ReviewAllQuestions").addEventListener("click", function () {
        // Show Summary Section
	    document.getElementById("qSummary").style.display = "block";
		document.getElementById("rSection").style.display = "none";
        userName = document.getElementById("userName").value;
        examType = document.getElementById("examType").value;
	    var e = document.getElementById("numMaxQuestions");
	    var selectedMaxQuestions = e.options[e.selectedIndex].text;
	    var numRows = selectedMaxQuestions / 5;
	    var numCols = selectedMaxQuestions / numRows;
	    var table = '';
	    var rows = numRows;
	    var cols = numCols;
        var a = new XMLHttpRequest();
        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
        // Find and check the answer for the selected question
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
          if ( this.readyState == 4 && this.status == 200 ) {
            obj = JSON.parse(this.responseText);
            console.log("DB accessed within btn-ReviewAllQuestions function");
            var n = 0;
            var questCheck = [];
            for ( u = 0; u < selectedMaxQuestions; u++ ) {
               m = examQuestionNumbers[u];
               for ( f = 0; f < obj.length; f++ ) {
                   if ( f == m ) {
                      questCheck.push(obj[f].question);
                   } // End if statement for f == m
               } // End for loop for f
            }   // End for loop for U variable
            for ( var r = 0; r < rows; r++ ) {
      	        table += '<tr>';
     	        for ( var c = 0; c < cols; c++ ) {
	                table += '<td>' + questCheck[n];
 		            n++;
	            }
	            table += '</tr>';
	        }
            summaryPage.innerHTML = ('<table id="summaryTable" style="width:100%" border=2>' + table + '</table>');
            var sTable = document.getElementById("summaryTable");
	        if (sTable !== null) {
                for (var i = 0; i < sTable.rows.length; i++) {
                    for (var j = 0; j < sTable.rows[i].cells.length; j++)
                        sTable.rows[i].cells[j].onclick = function () {
                        tableCoord(this);
                    };
                }
            }
          }
        };
        a.send();
        document.getElementById("rButtons").style.display = "none";
	    document.getElementById("seButtons").style.display = "block";
	    document.getElementById("btn-SummaryQuestions").disabled = false;
	    document.getElementById("btn-ReviewFlaggedQuestions").disabled = false;
        document.getElementById("btn-ReviewUnansweredQuestions").disabled = false;
        document.getElementById("btn-ReviewAllQuestions").disabled = false;
    });

    // assign function to onclick property of Exam end button
    document.getElementById("btn-ReviewFlaggedQuestions").addEventListener("click", function () {
        // Show Summary Section
		document.getElementById("rSection").style.display = "none";
	    document.getElementById("qSummary").style.display = "block";
	    var numRows = flagSet.length/2;
        var numCols = flagSet.length/numRows;
	    var table = '';
	    var rows = Math.round(numRows);
	    var cols = Math.round(numCols);
	    q = 0;
        var examPercentage = 0;
        var a = new XMLHttpRequest();
        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
        // Find and check the answer for the selected question
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
          if ( this.readyState == 4 && this.status == 200 ) {
            obj = JSON.parse(this.responseText);
            console.log("DB accessed within btn-ReviewFlaggedQuestions function");
            var n = 0;
            for ( f = 0; f < flagSet.length; f++ ) {
                var s = flagSet[f];
                for ( q = 0; q < obj.length; q++ ) {
                    if ( q == s ) {
                        flaggedQuestion.push(obj[q].question);
                        fQuestionNumbers.push(q);
                    }
                } // End for loop for q
            } // End for loop for f
            for ( var r = 0; r < rows; r++ ) {
      	        table += '<tr>';
    	        for ( var c = 0; c < cols; c++ ) {
	                table += '<td>' + flaggedQuestion[n];
 		            n++;
	            }
	            table += '</tr>';
	        }
            summaryPage.innerHTML = ('<table id="summaryTable" style="width:100%" border=2>' + table + '</table>');
            var sTable = document.getElementById("summaryTable");
	        if (sTable !== null) {
                for (var i = 0; i < sTable.rows.length; i++) {
                    for (var j = 0; j < sTable.rows[i].cells.length; j++)
                        sTable.rows[i].cells[j].onclick = function () {
                        tableCoord(this);
                    };
                }
            }
          } // End ready state if statement
        }; // End a on ready state
        a.send();
        document.getElementById("rButtons").style.display = "block";
		document.getElementById("seButtons").style.display = "block";
		document.getElementById("btn-SummaryQuestions").disabled = true;
	    document.getElementById("btn-ReviewFlaggedQuestions").disabled = true;
        document.getElementById("btn-ReviewUnansweredQuestions").disabled = false;
        document.getElementById("btn-ReviewAllQuestions").disabled = false;
    });

    // assign function to onclick property of Exam end button
    document.getElementById("btn-ReviewUnansweredQuestions").addEventListener("click", function () {
        // Show Summary Section
      	document.getElementById("rSection").style.display = "none";
	    document.getElementById("qSummary").style.display = "block";
        var e = document.getElementById("numMaxQuestions");
        var selectedMaxQuestions = e.options[e.selectedIndex].text;
        var examPercentage = 0;
        var a = new XMLHttpRequest();
        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
        // Find and check the answer for the selected question
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
          if ( this.readyState == 4 && this.status == 200 ) {
            obj = JSON.parse(this.responseText);
            console.log("DB accessed within btn-ReviewUnansweredQuestions function");
            var n = 0;
            for ( u = 0; u < selectedMaxQuestions; u++ ) {
               m = examQuestionNumbers[u];
               if ( userAnswer[u] === undefined || userAnswer[u] == "" ) {
                   for ( f = 0; f < obj.length; f++ ) {
                       if ( f == m ) {
                           NAQuestion.push(obj[f].question);
                           naQuestionNumbers.push(f);
                       } // End if statement for f == m
                   } // End for loop for f
                } // End if statement for userAnswer
            }   // End for loop for U variable
            var numRows = NAQuestion.length/2;
            var numCols = NAQuestion.length/numRows;
            var table = '';
            var rows = Math.round(numRows);
            var cols = Math.round(numCols);
            for ( var r = 0; r < rows; r++ ) {
                table += '<tr>';
                for ( var c = 0; c < cols; c++ ) {
                    table += '<td>' + NAQuestion[n];
                    n++;
                }
                table += '</tr>';
            }
            summaryPage.innerHTML = ('<table id="summaryTable" style="width:100%" border=2>' + table + '</table>');
            var sTable = document.getElementById("summaryTable");
            if (sTable !== null) {
                for (var i = 0; i < sTable.rows.length; i++) {
                    for (var j = 0; j < sTable.rows[i].cells.length; j++)
                        sTable.rows[i].cells[j].onclick = function () {
                        tableCoord(this);
                    };
                }
            }
          } // End ready state if statement
        }; // End a on ready state
        a.send();
        document.getElementById("rButtons").style.display = "block";
        document.getElementById("seButtons").style.display = "block";
	    document.getElementById("btn-SummaryQuestions").disabled = true;
	    document.getElementById("btn-ReviewFlaggedQuestions").disabled = false;
        document.getElementById("btn-ReviewUnansweredQuestions").disabled = true;
        document.getElementById("btn-ReviewAllQuestions").disabled = false;
    });

    //  Here we get the cell the user clicks on and displays that questiuon for the user to modify if required.
    function tableCoord ( tableCell ) {
        document.getElementById("rSection").style.display = "none";
        document.getElementById("rButtons").style.display = "none";
        document.getElementById("qSummary").style.display = "none";
        document.getElementById("qButtons").style.display = "none";
        var cellContent = tableCell.innerHTML;
        var startContent = cellContent.indexOf("");
        var endContent = cellContent.indexOf("?", startContent);
        var questionOnly = cellContent.substring(startContent, endContent);
        questionOnly = questionOnly + "?";
        var a = new XMLHttpRequest();
        var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
  	    var cA = "";
        // Get questions based on examQuestionNumbers array using m variable value
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
            if ( this.readyState == 4 && this.status == 200 ) {
                obj = JSON.parse(this.responseText);
                for ( d = 0; d < obj.length; d++ ) {
	                if ( obj[d].question == questionOnly ) {
                        for ( q = 0; q < obj.length; q++ ) {
                             m = examQuestionNumbers[q];
                             if ( m == d ) {
                                 cA = userAnswer[q];
                                 fIndex = flagSet.indexOf[m];
                                 flagSet.splice(fIndex,1);
                                 uIndex = unAnswered.indexOf[m];
                                 unAnswered.splice(uIndex);
                             }
                        }
                        if ( obj[d].type == "single" ) {
                            var RadAns = document.Radio.Answer;
                            if ( cA !== undefined ) {
                                switch (cA) {
                                    case "A":
                                        document.getElementById("radio1").checked = true;
                                        break;
                                    case "B":
                                        document.getElementById("radio2").checked = true;
                                        break;
                                    case "C":
                                        document.getElementById("radio3").checked = true;
                                        break;
                                    case "D":
                                        document.getElementById("radio4").checked = true;
                                        break;
                                    case "E":
                                        document.getElementById("radio5").checked = true;
                                        break;
                                    default:
                                        console.log( " Nothing detected for User Answer in Single answer question check " );
                                        for ( var i = 0; i < RadAns.length; i++ ) {
                                            RadAns[i].checked = function() {
                                               RadAns[i].checked = false;
                                            };
                                        }
                                    }
                                    document.getElementById("radio6").style.display = "none";
                            } else {
                            for ( var i = 0; i < RadAns.length; i++ ) {
                                RadAns[i].checked = function() {
                                   RadAns[i].checked = false;
                                };
                            }
                            document.getElementById("radio6").style.display = "none";
                            }
                            document.getElementById("Single").style.display = "block";
                            document.getElementById("flag").checked = false;
                            $("#answerSelected").text(cA);
                            document.getElementById("flagSelected").innerHTML = "N";
                            document.getElementById("Multiple").style.display = "none";
                            document.getElementById("Typed").style.display = "none";
                            if ( obj[d].imagefile == "Y" ) {
                                document.getElementById("showImage").style.display = "block";
                                $("#displayImage").attr("src",'img/'+obj[m].location);
                            }
                            document.getElementById("questionSingle").innerHTML = obj[d].question;
                            document.getElementById("a1radio").innerHTML = obj[d].answer1;
                            document.getElementById("a2radio").innerHTML = obj[d].answer2;
                            document.getElementById("a3radio").innerHTML = obj[d].answer3;
                            document.getElementById("a4radio").innerHTML = obj[d].answer4;
                            document.getElementById("a5radio").innerHTML = obj[d].answer5;
                        } else if ( obj[d].type == "multiple" ) {
                        if ( cA !== undefined ) {
                            var checkboxes = document.getElementsByTagName('input');
                            for ( var i = 0; i < checkboxes.length; i++ )  {
                                if (checkboxes[i].type == 'checkbox')   {
                                    checkboxes[i].checked = false;
                                    checkboxes[i].disabled = false;
                                }
                            }
                            var chr = cA;
                            var n = chr.length;
                            for ( var i = 0; i < n; i++ ) {
                                var res = chr.substring(i, i+1);
                                switch (res) {
                                    case "A":
                                        document.getElementById("a1check").checked = true;
                                        break;
                                    case "B":
                                        document.getElementById("a2check").checked = true;
                                        break;
                                    case "C":
                                        document.getElementById("a3check").checked = true;
                                        break;
                                    case "D":
                                        document.getElementById("a4check").checked = true;
                                        break;
                                    case "E":
                                        document.getElementById("a5check").checked = true;
                                        break;
                                    default:
                                        console.log( " Nothing detected for User Answer in multiple answer question check " );
                                        var checkboxes = document.getElementsByTagName('input');
                                        for ( var i = 0; i < checkboxes.length; i++ )  {
                                            if (checkboxes[i].type == 'checkbox')   {
                                                checkboxes[i].checked = false;
                                                checkboxes[i].disabled = false;
                                            }
                                        }
                                    }
                            }
                        } else {
                            var checkboxes = document.getElementsByTagName('input');
                            for ( var i = 0; i < checkboxes.length; i++ )  {
                                if (checkboxes[i].type == 'checkbox')   {
                                    checkboxes[i].checked = false;
                                    checkboxes[i].disabled = false;
                                }
                            }
                        }
                        document.getElementById("Single").style.display = "none";
                        document.getElementById("Multiple").style.display = "block";
                        document.getElementById("flag").checked = false;
                        $("#answerSelected").text(userAnswer[q-1]);
                        document.getElementById("flagSelected").innerHTML = "N";
                        document.getElementById("Typed").style.display = "none";
                        if ( obj[d].imagefile == "Y" ) {
                           document.getElementById("showImage").style.display = "block";
                           $("#displayImage").attr("src",'img/'+obj[m].location);
                        }
                        document.getElementById("questionMultiple").innerHTML = obj[d].question;
                        document.getElementById("message").innerHTML = obj[d].message;
                        document.getElementById("ansTotal").value = obj[d].correct.length;
                        document.getElementById("a1label").innerHTML = obj[d].answer1;
                        document.getElementById("a2label").innerHTML = obj[d].answer2;
                        document.getElementById("a3label").innerHTML = obj[d].answer3;
                        document.getElementById("a4label").innerHTML = obj[d].answer4;
                        document.getElementById("a5label").innerHTML = obj[d].answer5;
                    } else if ( obj[d].type == "typed" ) {
                        if ( cA !== undefined ) {
                            document.getElementById('a1typed').value = cA;
                        } else {
                            document.getElementById('a1typed').focus();
                        }
                        document.getElementById("Single").style.display = "none";
                        document.getElementById("Multiple").style.display = "none";
                        document.getElementById("Typed").style.display = "block";
                        document.getElementById("flag").checked = false;
                        $("#answerSelected").text(cA);
                        document.getElementById("flagSelected").innerHTML = "N";
                        if ( obj[d].imagefile == "Y" ) {
                            document.getElementById("showImage").style.display = "block";
                            $("#displayImage").attr("src",'img/'+obj[m].location);
                        }
                        document.getElementById("questionTyped").innerHTML = obj[d].question;
                        document.getElementById("messageTyped").innerHTML = obj[d].message;
                    }  // End if statement for obj type
                  } // End if statement for questions
                }  // End for loop for d variable
    	      }  // End of if statement for readyState
            };  // End of a.onreadystatechange function
            a.send();
            document.getElementById('uaButton').style.display = 'block';
        }  // End of tableCoord Function


    ///////////////////////////////////////////////
    //                                           //
    //      Show questions in table format       //
    //                                           //
    ///////////////////////////////////////////////

    // assign function to onclick property of button
    document.getElementById("btn-SummaryQuestions").addEventListener("click", function () {
        // Hide Question pages
        document.getElementById("Single").style.display = "none";
        document.getElementById("Multiple").style.display = "none";
        document.getElementById("Typed").style.display = "none";
        // Show Summary Question Table
        document.getElementById("qButtons").style.display = "none";
    	document.getElementById("qSummary").style.display = 'block';
        document.getElementById("seButton").style.display = 'block';
        document.getElementById("rSection").style.display = "block";
    });

    ///////////////////////////////////////////////////////
    //                                                   //
    //      Show exit exam - pass fail and summary       //
    //                                                   //
    ///////////////////////////////////////////////////////

    // assign function to onclick property of Summary Page Exit button
    document.getElementById("btn-SummaryPageExit").addEventListener("click", function () {
        // Hide Summary Page Section
        document.getElementById("qSummary").style.display = "none";
        document.getElementById("rSection").style.display = "none";
        document.getElementById('Single').style.display = 'none';
        document.getElementById('Multiple').style.display = 'none';
        document.getElementById('Typed').style.display = 'none';
    	// Hide Summary Buttons
	    document.getElementById("rButtons").style.display = "none";
	    document.getElementById("seButtons").style.display = "none";
        // Show Exit exam (Results) Section
        document.getElementById("exitExam").style.display = "block";
        displayExitPage();
	});


    ////////////////////////////////////////////////////////////////////////////
	//  Section Exit Exam  -  id: examResult  -  id: examSectionSummary  ///////
	////////////////////////////////////////////////////////////////////////////
    // assign function to onclick property of View all questions again button //
	////////////////////////////////////////////////////////////////////////////
    document.getElementById("btn-SummaryPageAllQuestions").addEventListener("click", function () {
        document.getElementById("exitExam").style.display = "none";
        document.getElementById('uaButton').style.display = 'none';
        userName = document.getElementById("userName").value;
        e = document.getElementById("numMaxQuestions");
        numMaxQuestions = e.options[e.selectedIndex].text;
        examType = document.getElementById("examType").value;
        const app = document.getElementById('endExam');
        const container = document.createElement('div');
    	container.setAttribute('class', 'container');
		app.appendChild(container);
    	var a = new XMLHttpRequest();
		var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
        // Find and check the answer for the selected question
        a.open("GET", jsonURL);
        a.onreadystatechange = function(){
            if ( this.readyState == 4 && this.status == 200 ) {
                obj = JSON.parse(this.responseText);
				for ( q = 0; q < numMaxQuestions; q++ ) {
					var uAnswer = "";
					m = examQuestionNumbers[q];
					if ( obj[m].type == "single" ) {
                      var x = userAnswer[q];
      				  switch (x) {
						case "A":
							uAnswer = " A:  " + obj[m].answer1;
							break;
						case "B":
							uAnswer = " B:  " + obj[m].answer2;
							break;
						case "C":
							uAnswer = " C:  " + obj[m].answer3;
							break;
						case "D":
							uAnswer = " D:  " + obj[m].answer4;
							break;
						case "E":
							uAnswer = " E:  " + obj[m].answer5;
							break;
					    default:
                            console.log("Question not answered 'single'");
                        }  //  End Single type switch statement
                    } else if ( obj[m].type == "multiple" ) {
	    			   var x = userAnswer[q];
					   for ( y = 0; y < userAnswer[q].length; y++ ) {
					      var z = x[y];
					      switch (z) {
						    case "A":
							    uAnsTemp = " (A):  " + obj[m].answer1;
							    break;
						    case "B":
							    uAnsTemp = " (B):  " + obj[m].answer2;
							    break;
						    case "C":
							    uAnsTemp = " (C):  " + obj[m].answer3;
							    break;
						    case "D":
							    uAnsTemp = " (D):  " + obj[m].answer4;
							    break;
						    case "E":
							    uAnsTemp = " (E):  " + obj[m].answer5;
							    break;
					        default:
                                console.log("Question not answered 'Multiple'");
                          }  //  End Multiple answer type switch statement
                        if ( y < userAnswer[q].length ) {
						    uAnswer += uAnsTemp + ", ";
                        } else {
                            uAnswer += uAnsTemp + ".";
                        }
	                  }  // End for Loop for y variable
	                } else if ( obj[m].type == "typed" ) {
    		            uAnswer = userAnswer[q];
				    }  // End if statement for wrongAnswers
					const card = document.createElement('div');
					card.setAttribute('class', 'card');
					const h3 = document.createElement('h3');
					h3.textContent = obj[m].question;
					const h4 = document.createElement('h4');
					h4.textContent = " You answered " + uAnswer;
					const h5 = document.createElement('h5');
					h5.textContent = " Correct Answer was " + obj[m].correct;
					container.appendChild(card);
					card.appendChild(h3);
					card.appendChild(h4);
					card.appendChild(h5);
				}
			}  // End of if statement for readyState
		};   // End of a.onreadystatechange function
		a.send();
	});	// End event Listener for btn-SummaryPageAllQuestions
  };  //  End of setupEventListeners function

    ////////////////////////////////////////////////////////////
    //                                                        //
    //                Initialise Application                  //
    //                                                        //
    ////////////////////////////////////////////////////////////
    return {
        init: function () {
            console.log('Application has started.');
            // This is the initial function called when the page loads, it hides everything except the initial one.
            document.getElementById('initial').style.display = 'none';
            document.querySelector(".nav").style.display = 'none';
            document.getElementById('qButtons').style.display = 'none';
            document.getElementById('showImage').style.display = 'none';
            document.getElementById('uaButton').style.display = 'none';
            document.getElementById('disclaimer').style.display = 'none';
            document.getElementById('exitExam').style.display = 'none';
            document.getElementById('userInfo').style.display = 'none';
            document.getElementById('examConfirm').style.display = 'none';
            document.getElementById('Single').style.display = 'none';
            document.getElementById('Multiple').style.display = 'none';
            document.getElementById('Typed').style.display = 'none';
            document.getElementById('qSummary').style.display = 'none';
            document.getElementById("examResult").style.display = "none";
            document.getElementById("examSectionSummary").style.display = "none";
            document.getElementById("seButtons").style.display = "none";
            document.getElementById("rButtons").style.display = "none";
	        document.getElementById("examTopicSectionSummary1").style.display = "none";
	        document.getElementById("examTopicSectionSummary2").style.display = "none";
	        document.getElementById("examTopicSectionSummary3").style.display = "none";
	        document.getElementById("examTopicSectionSummary4").style.display = "none";
	        document.getElementById("examTopicSectionSummary5").style.display = "none";
	        document.getElementById("examTopicSectionSummary6").style.display = "none";
            document.getElementById("fc-exam").style.display = "block";
            setupEventListeners ();
        }  //  End of Init Function
    };  // End of Return
}(); // End of ExamQuestions function

ExamQuestions.init();
