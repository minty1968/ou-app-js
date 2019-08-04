let obj = [];
let f = 0;
let fcAnswer = false;
let currentQuestion = 0;
let fcType = "";
let examQuestionNumbers = [];

let FlashCardQuestions = function () {


 let getFCQuestion = function () {
   document.getElementById("fcInitial").style.display = "none";
   document.getElementById("fcResult").style.display = "none";
   document.getElementById("fctSummary").style.display = "none";

   var a = new XMLHttpRequest();
   var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
   if ( fcType == "101-400" ) {
	    var minNumName = 101;
      var maxNumName = 104;
      var fcMin = 0;
      var fcMax = 79;
   } else if ( fcType == "102-400" ) {
	   var minNumName = 105;
     var maxNumName = 110;
     var fcMin = 80;
     var fcMax = 143;
   }
   currentQuestion = Math.floor(Math.random() * (fcMax - fcMin) ) + fcMin;
   // Get questions based on examQuestionNumbers array using m variable value
   a.open("GET", jsonURL);
   a.onreadystatechange = function(){
     if ( this.readyState == 4 && this.status == 200 ) {
       obj = JSON.parse(this.responseText);

         var m = currentQuestion;
         var str = obj[m].name;
         var res = str.substring(0, 3);

       if ( obj[m].type == "single" && res >= minNumName && res <= maxNumName ) {
         var RadAns = document.Radio.Answer;
         if ( fcAnswer == false ) {
           for ( var i = 0; i < RadAns.length; i++ ) {
             RadAns[i].checked = function() {
               RadAns[i].checked = false;
             };
           }
         }
         document.getElementById("fcradio6").style.display = "none";
         document.getElementById("fcSingle").style.display = "block";

         document.getElementById('answerSelected').innerHTML = "";
         document.getElementById("fcMultiple").style.display = "none";
         document.getElementById("fcTyped").style.display = "none";

         if ( obj[m].imagefile == "Y" ) {
             document.getElementById("fcImage").style.display = "block";
             $("#displayFcImage").attr("src", 'img/' + obj[m].location);
         }

         document.getElementById("questionfcSingle").innerHTML = obj[m].question;
         document.getElementById("fc1radio").innerHTML = obj[m].answer1;
         document.getElementById("fc2radio").innerHTML = obj[m].answer2;
         document.getElementById("fc3radio").innerHTML = obj[m].answer3;
         document.getElementById("fc4radio").innerHTML = obj[m].answer4;
         document.getElementById("fc5radio").innerHTML = obj[m].answer5;
       } else if ( obj[m].type == "multiple" && res >= minNumName && res <= maxNumName ) {
         var checkboxes = document.getElementsByTagName('input');
         for ( var i = 0; i < checkboxes.length; i++ )  {
           if (checkboxes[i].type == 'checkbox')   {
             checkboxes[i].checked = false;
             checkboxes[i].disabled = false;
           }
         }
         document.getElementById("fcSingle").style.display = "none";
	    	 document.getElementById("fcTyped").style.display = "none";
         document.getElementById("fcMultiple").style.display = "block";

         document.getElementById('answerSelected').innerHTML = "";

         if ( obj[m].imagefile == "Y" ) {
             document.getElementById("fcImage").style.display = "block";
             $("#displayFcImage").attr("src", 'img/' + obj[m].location);
         }

         document.getElementById("questionfcMultiple").innerHTML = obj[m].question;
         document.getElementById("fcMessage").innerHTML = obj[m].message;
         document.getElementById("ansTotal").value = obj[m].correct.length;
         document.getElementById("a1label").innerHTML = obj[m].answer1;
         document.getElementById("a2label").innerHTML = obj[m].answer2;
         document.getElementById("a3label").innerHTML = obj[m].answer3;
         document.getElementById("a4label").innerHTML = obj[m].answer4;
         document.getElementById("a5label").innerHTML = obj[m].answer5;
       } else if ( obj[m].type == "typed" && res >= minNumName && res <= maxNumName ) {
          document.getElementById('a1typed').focus();
          document.getElementById("fcSingle").style.display = "none";
          document.getElementById("fcMultiple").style.display = "none";
          document.getElementById("fcTyped").style.display = "block";

         if ( obj[m].imagefile == "Y" ) {
            document.getElementById("fcImage").style.display = "block";
            $("#displayFcImage").attr("src", 'img/' + obj[m].location);
         }

          document.getElementById('answerSelected').innerHTML = "";
          document.getElementById("questionfcTyped").innerHTML = obj[m].question;
          document.getElementById("fcTypedMessage").innerHTML = obj[m].message;
       }  // End if statement for obj type
	   document.getElementById('fcButtons').style.display = 'block';

	}  // End of if statement for readyState
   };  // End of a.onreadystatechange function
   a.send();
 }  // End of tableCoord Function


  let checkFCAnswer = function (dontKnow) {
	var a = new XMLHttpRequest();
    var jsonURL = "http://michaelsharpe.uk/api/lpic1/";
    // Find and check the answer for the selected question
    a.open("GET", jsonURL);
    a.onreadystatechange = function(){
      if ( this.readyState == 4 && this.status == 200 ) {
        obj = JSON.parse(this.responseText);
	      console.log("DB accessed within checkAnswers function");
        for ( c = 0; c < obj.length; c++ ) {
	        var m = currentQuestion;
		      var str = obj[m].name;
		      var res = str.substring(0, 3);
		      document.getElementById('fcResult').style.display = 'block';
          if ( document.getElementById('answerSelected').innerHTML ==  obj[m].correct ) {
   		       document.getElementById('fcResult').style.color = "green";
             document.getElementById('fcResult').innerHTML = "Well Done - Correct Answer";
          } else { // End of Answer check if loop
      			 document.getElementById('fcResult').style.color = "red";
             document.getElementById('fcResult').innerHTML = "Unlucky - Wrong Answer - Try Again";
			       document.getElementById('fctSummary').style.display = 'block';
          }
          if ( dontKnow == true ) {
              document.getElementById('fcResult').style.color = "blue";
              document.getElementById('fcResult').innerHTML = "Answer was " + obj[m].correct;
              document.getElementById('fctSummary').style.display = 'block';
          }
        }  // End for loop for q variable

		// LPIC-1 101-400 used here
        if ( fcType == "101-400" ) {
    		  if ( res == 101 ) {
		        document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 101: System Architecture";
		      } else if ( res == 102 ) {
				    document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 102: Linux Installation and Package Management";
			    } else if ( res == 103 ) {
				    document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 103: GNU and Unix Commands";
			    } else if ( res == 104 ) {
				    document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 104: Devices, Linux Filesystems, Filesystem Hierarchy Standard";
			    }
	      } else if ( fcType == "102-400" ) {
		    // LPIC-1 102-400 used here
		    if ( res == 105 ) {
		      document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 105: Shells, Scripting and Data Management";
		    } else if ( res == 106 ) {
				  document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 106: User Interfaces and Desktops";
		    } else if ( res == 107 ) {
				  document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 107: Administrative Tasks";
		    } else if ( res == 108 ) {
				  document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 108: Essential System Services";
		    } else if ( res == 109 ) {
				  document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 109: Networking Fundamentals";
		    } else if ( res == 110 ) {
				  document.getElementById("fctSummary").innerHTML = "More info on this question can be found in the Topic 110: Security";
		    }
	    };  // End LPIC-1 102-400
  	}  // End of if statement for readyState
  };  // End of a.onreadystatechange function
  a.send();
};  // End of checkFCAnswer function

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

    // assign function to onclick property of exam next question button
    document.getElementById("btn-FCNext").addEventListener("click", function () {
      getFCQuestion();
    });

	// assign function to onclick property of exam next question button
    document.getElementById("btn-ShowAnswer").addEventListener("click", function () {
      checkFCAnswer();
    });

       // assign function to onclick property of exam next question button
    document.getElementById("btn-fcPass").addEventListener("click", function () {
      var fcPass = true;
      checkFCAnswer(fcPass);
    });


       // assign function to onclick property of exam next question button
    document.getElementById("btn-fc101").addEventListener("click", function () {
      fcType = "101-400"
      getFCQuestion();
    });

       // assign function to onclick property of exam next question button
    document.getElementById("btn-fc102").addEventListener("click", function () {
      fcType = "102-400"
      getFCQuestion();
    });


  };  // End of setupEventListeners function

    ////////////////////////////////////////////////////////////
    //                                                        //
    //                Initialise Application                  //
    //                                                        //
    ////////////////////////////////////////////////////////////
    return {
        init: function () {
            console.log('Application has started.');
            // This is the initial function called when the page loads, it hides everything except the initial one.
            document.getElementById('fcSingle').style.display = 'none';
            document.getElementById('fcMultiple').style.display = 'none';
            document.getElementById('fcTyped').style.display = 'none';
	          document.getElementById('fcImage').style.display = 'none';
            document.getElementById('fcButtons').style.display = 'none';
            document.getElementById('fcResult').style.display = 'none';
            document.getElementById('fctSummary').style.display = 'none';
            document.getElementById('fcInitial').style.display = 'block';
            setupEventListeners();
        }  //  End of Init Function
    };  // End of Return

}(); // End of ExamQuestions function

FlashCardQuestions.init();
