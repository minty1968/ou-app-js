//   /*jshint esversion: 6 */

let crudQuestions = function () {

    ////////////////////////////////////////////////////////////
    //                                                        //
    //        Here we are listening for button clicks         //
    //                                                        //
    ////////////////////////////////////////////////////////////

    let setupEventListeners = function () {
      console.log('Event listeners have started');

      ////////////////////////////////////////////////////////////
      //    This section used for type in the box questions     //
      ////////////////////////////////////////////////////////////

      // We'll then use the label to record what was typed in.
      $("#typedQuestion").keyup(function () {
          var typedValue = $(this).val();
          $("#dbQuestion").text(typedValue);
      }).keyup();

    // We'll then use the label to record what was typed in.
    $("#typedMessage").keyup(function () {
        var typedValue = $(this).val();
        $("#dbMessage").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#typedAnswer").keyup(function () {
        var typedValue = $(this).val();
        $("#dbCorrectAnswer").text(typedValue);
    }).keyup();

    ////////////////////////////////////////////////////////////
    //    This section used for multi answer questions       //
    ////////////////////////////////////////////////////////////

    // We'll then use the label to record what was typed in.
    $("#multipleAnswerQuestion").keyup(function () {
        var typedValue = $(this).val();
        $("#dbQuestion").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswerMessage").keyup(function () {
        var typedValue = $(this).val();
        $("#dbMessage").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswer1").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer1").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswer2").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer2").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswer3").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer3").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswer4").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer4").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#multipleAnswer5").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer5").text(typedValue);
    }).keyup();

    // Records what radio button is selected and records it on an answers label
    function checkboxChecked () {
      if ( document.getElementById('dbCB1').checked ) {
        document.getElementById("dbCorrectAnswer").innerHTML += "A";
      }
      if ( document.getElementById("dbCB2").checked ) {
        document.getElementById("dbCorrectAnswer").innerHTML += "B";
      }
      if ( document.getElementById("dbCB3").checked ) {
        document.getElementById("dbCorrectAnswer").innerHTML += "C";
      }
      if ( document.getElementById("dbCB4").checked ) {
        document.getElementById("dbCorrectAnswer").innerHTML += "D";
      }
      if ( document.getElementById("dbCB5").checked ) {
        document.getElementById("dbCorrectAnswer").innerHTML += "E";
      }
    }  // End of Checkbox answer recording


    ////////////////////////////////////////////////////////////
    //    This section used for single answer questions       //
    ////////////////////////////////////////////////////////////

    // We'll then use the label to record what was typed in.
    $("#singleAnswerQuestion").keyup(function () {
        var typedValue = $(this).val();
        $("#dbQuestion").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#singleAnswer1").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer1").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#singleAnswer2").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer2").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#singleAnswer3").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer3").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#singleAnswer4").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer4").text(typedValue);
    }).keyup();

    // We'll then use the label to record what was typed in.
    $("#singleAnswer5").keyup(function () {
        var typedValue = $(this).val();
        $("#dbAnswer5").text(typedValue);
    }).keyup();

    // Records what radio button is selected and records it on an answers label
    let RadAns = document.Radio.dbsAnswer;
    let prevAns = null;
    for ( var i = 0; i < RadAns.length; i++ ) {
       RadAns[i].onclick = function() {
          if ( this !== prevAns ) {
             prevAns = this;
          }
          document.getElementById("dbCorrectAnswer").innerHTML = this.value;
       };
    }  // End of Radio button answer recording

 $("#qID").keyup(function () {
        var typedValue = $(this).val();
        $("#dbID").text(typedValue);
    }).keyup();

    // assign function to the on click property of confirm button
    document.getElementById("btn-AdminConfirm").addEventListener("click", function () {
      document.getElementById('getGrid').style.display = 'block';
      const app = document.getElementById('getGrid');
      const container = document.createElement('div');
      container.setAttribute('class', 'container');
      app.appendChild(container);

      switch ( document.getElementById("dbActionCrud").innerHTML ) {
        case "GET":
          switch ( document.getElementById("dbGetCrud").innerHTML ) {
             case "/":
               var a = new XMLHttpRequest();
               var jsonURL = 'http://michaelsharpe.uk/api/lpic1/';
               // Find and check the answer for the selected question
               a.open(document.getElementById("dbActionCrud").innerHTML, jsonURL);
               a.onreadystatechange = function(){
                 if ( this.readyState == 4 && this.status == 200 ) {
                   obj = JSON.parse(this.responseText);
                   console.log("DB accessed within btn-AdminConfirm function  -  /");
                   for ( x = 0; x < obj.length; x++ ) {
                     const card = document.createElement('div');
                     card.setAttribute('class', 'card');
                     const h1 = document.createElement('h1');
                     h1.textContent = obj[x]._id;
                     const h3 = document.createElement('h3');
                     h3.textContent = obj[x].name
                     const h5 = document.createElement('h5');
                     h5.textContent = obj[x].question;
                     container.appendChild(card);
                     card.appendChild(h1);
                     card.appendChild(h3);
                     card.appendChild(h5);
                   };
                 }  // End if statement for ready state
               }  // End a ready state change
               a.send();
               break;
             case "/TopicName/":
               var a = new XMLHttpRequest();
               var jsonURL = 'http://michaelsharpe.uk/api/lpic1/TopicName/' + document.getElementById("dbSubTopic").innerHTML;
               // Find and check the answer for the selected question
               a.open(document.getElementById("dbActionCrud").innerHTML, jsonURL);
               a.onreadystatechange = function(){
                 if ( this.readyState == 4 && this.status == 200 ) {
                   obj = JSON.parse(this.responseText);
                   console.log("DB accessed within btn-AdminConfirm function  -  TopicName");
                   for ( x = 0; x < obj.length; x++ ) {
                     if ( obj[x].name == document.getElementById("dbSubTopic").innerHTML ) {
                       const card = document.createElement('div');
                       card.setAttribute('class', 'card');
                       const h1 = document.createElement('h1');
                       h1.textContent = obj[x]._id;
                       const h3 = document.createElement('h3');
                       h3.textContent = obj[x].name
                       const h5 = document.createElement('h5');
                       h5.textContent = obj[x].question;
                       container.appendChild(card);
                       card.appendChild(h1);
                       card.appendChild(h3);
                       card.appendChild(h5);
                     };
                   };
                 }  // End if statement for ready state
               }  // End a ready state change
               a.send();
               break;
             case "/QuestionType/":
               var a = new XMLHttpRequest();
               var jsonURL = 'http://michaelsharpe.uk/api/lpic1/QuestionType/' + document.getElementById("dbQuestionType").innerHTML;
               a.open(document.getElementById("dbActionCrud").innerHTML, jsonURL);
               a.onreadystatechange = function(){
                 if ( this.readyState == 4 && this.status == 200 ) {
                   obj = JSON.parse(this.responseText);
                   console.log("DB accessed within btn-AdminConfirm function  -  QuestionType");
                   for ( x = 0; x < obj.length; x++ ) {
                     if ( obj[x].qType == document.getElementById("dbQuestionType").innerHTML ) {
                       const card = document.createElement('div');
                       card.setAttribute('class', 'card');
                       const h1 = document.createElement('h1');
                       h1.textContent = obj[x]._id;
                       const h3 = document.createElement('h3');
                       h3.textContent = obj[x].name
                       const h5 = document.createElement('h5');
                       h5.textContent = obj[x].question;
                       container.appendChild(card);
                       card.appendChild(h1);
                       card.appendChild(h3);
                       card.appendChild(h5);
                     };
                   };
                 }  // End if statement for ready state
               }  // End a ready state change
               a.send();
               break;
             case "/:id":
               var a = new XMLHttpRequest();
               var jsonURL = 'http://michaelsharpe.uk/api/lpic1/' + document.getElementById("dbID").innerHTML;
               a.open(document.getElementById("dbActionCrud").innerHTML, jsonURL);
               a.onreadystatechange = function(){
                 if ( this.readyState == 4 && this.status == 200 ) {
                   obj = JSON.parse(this.responseText);
                   console.log("DB accessed within btn-AdminConfirm function  -  /:id");
                   for ( x = 0; x < obj.length; x++ ) {
                     if ( obj[x]._id == document.getElementById("dbID").innerHTML ) {
                       const card = document.createElement('div');
                       card.setAttribute('class', 'card');
                       const h1 = document.createElement('h1');
                       h1.textContent = obj[x]._id;
                       const h3 = document.createElement('h3');
                       h3.textContent = obj[x].name
                       const h5 = document.createElement('h5');
                       h5.textContent = obj[x].question;
                       container.appendChild(card);
                       card.appendChild(h1);
                       card.appendChild(h3);
                       card.appendChild(h5);
                     };
                   };
                 }  // End if statement for ready state
               }  // End a ready state change
               a.send();
               break;
            default:
               console.log("No GET request found");
          };
        case "PUT":

          break;
        case "POST":

          break;
        case "DELETE":

          break;
        default:
          console.log( "Entered CRUD switch case statement for btn-confirm click" );
      }
    });


       // assign function to the on change property of CRUD DropDOwn List
       document.getElementById("selectCrud").addEventListener("change", function () {
         crudQuestions.init();
         var e = document.getElementById("selectCrud");
         var crudAction = e.options[e.selectedIndex].value;
         document.getElementById("dbActionCrud").innerHTML = crudAction;

         switch ( document.getElementById("dbActionCrud").innerHTML ) {
             case "GET":
               document.getElementById('getBy').style.display = 'block';
               break;
             case "POST":
               document.getElementById('questionType').style.display = 'block';
               break;
             case "PUT":
               document.getElementById('qID').style.display = 'block';
               break;
             case "DELETE":
               document.getElementById('qID').style.display = 'block';
               break;
            default:
               console.log("No CRUD request found");
        };
       });

       // assign function to the on change property of CRUD DropDOwn List
       document.getElementById("selectGetBy").addEventListener("change", function () {

         var e = document.getElementById("selectGetBy");
         var getAction = e.options[e.selectedIndex].value;
         document.getElementById('dbGetCrud').innerHTML = getAction;

         if ( document.getElementById("dbGetCrud").innerHTML == "/TopicName/" || document.getElementById("dbActionCrud").innerHTML == 'POST' ) {
           document.getElementById('examMainTopic').style.display = 'block';
         }

         if ( document.getElementById("dbGetCrud").innerHTML == "/QuestionType/" ) {
           document.getElementById('questionType').style.display = 'block';
         }

         if ( document.getElementById("dbGetCrud").innerHTML == "/:id" ) {
           document.getElementById('qID').style.display = 'block';
         }
     });

       // assign function to the on change property of CRUD DropDOwn List
       document.getElementById("selectQuestionType").addEventListener("change", function () {
         var e = document.getElementById("selectQuestionType");
         var getQType = e.options[e.selectedIndex].value;

         if ( document.getElementById("dbActionCrud").innerHTML == "POST" && document.getElementById("dbQuestionType").innerHTML == "single" ) {
	         document.getElementById('formSingle').style.display = 'block';
           document.getElementById('formMultiple').style.display = 'none';
           document.getElementById('formTyped').style.display = 'none';
	       } else if ( document.getElementById("dbActionCrud").innerHTML == "POST" && document.getElementById("dbQuestionType").innerHTML == "multiple" ) {
	         document.getElementById('formMultiple').style.display = 'block';
           document.getElementById('formSingle').style.display = 'none';
           document.getElementById('formTyped').style.display = 'none';
	       } if ( document.getElementById("dbActionCrud").innerHTML == "POST" && document.getElementById("dbQuestionType").innerHTML == "typed" ) {
	         document.getElementById('formTyped').style.display = 'block';
           document.getElementById('formSingle').style.display = 'none';
           document.getElementById('formMultiple').style.display = 'none';
	       }
         document.getElementById("dbQuestionType").innerHTML = getQType;
       });


        // assign function to the on chnage property of Exam Topic DropDOwn List
        document.getElementById("SelectExamMainTopic").addEventListener("change", function () {

           var e = document.getElementById("SelectExamMainTopic");
           var eTopic = e.options[e.selectedIndex].value;

           switch (eTopic) {
             case "101":
               document.getElementById('examSubTopic101').style.display = 'block';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "102":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'block';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "103":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'block';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "104":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'block';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "105":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'block';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "106":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'block';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "107":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'block';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "108":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'block';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "109":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'block';
               document.getElementById('examSubTopic110').style.display = 'none';
               break;
             case "110":
               document.getElementById('examSubTopic101').style.display = 'none';
	             document.getElementById('examSubTopic102').style.display = 'none';
               document.getElementById('examSubTopic103').style.display = 'none';
               document.getElementById('examSubTopic104').style.display = 'none';
               document.getElementById('examSubTopic105').style.display = 'none';
               document.getElementById('examSubTopic106').style.display = 'none';
               document.getElementById('examSubTopic107').style.display = 'none';
               document.getElementById('examSubTopic108').style.display = 'none';
               document.getElementById('examSubTopic109').style.display = 'none';
               document.getElementById('examSubTopic110').style.display = 'block';
               break;
             default:
               console.log("Exam Topic not found");
          }  //  End Switch Statement
        });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic101").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic101");
         var selectExamSubTopic101 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic101;
         document.getElementById('getGrid').style.display = 'none';
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic102").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic102");
         var selectExamSubTopic102 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic102;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic103").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic103");
         var selectExamSubTopic103 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic103;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic104").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic104");
         var selectExamSubTopic104 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic104;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic105").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic105");
         var selectExamSubTopic105 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic105;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic106").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic106");
         var selectExamSubTopic106 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic106;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic107").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic107");
         var selectExamSubTopic107 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic107;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic108").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic108");
         var selectExamSubTopic108 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic108;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic109").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic109");
         var selectExamSubTopic109 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic109;
       });

       // assign function to the on change property of Exam Topic DropDOwn List
       document.getElementById("selectExamSubTopic110").addEventListener("change", function () {
         var e = document.getElementById("selectExamSubTopic110");
         var selectExamSubTopic110 = e.options[e.selectedIndex].text;
		     if ( document.getElementById('questionType').style.display != 'block' ) {
           document.getElementById('questionType').style.display = 'block';
		     }
         document.getElementById("dbSubTopic").innerHTML = selectExamSubTopic110;
       });

   }  //  End of setupEventListeners function


    ////////////////////////////////////////////////////////////
    //                                                        //
    //                Initialise Application                  //
    //                                                        //
    ////////////////////////////////////////////////////////////
    return {
        init: function () {
            console.log('Application has started.');
            // This is the initial function called when the page loads, it hides everything except the initial one.
            document.getElementById('getGrid').style.display = 'none';
			      document.getElementById('getBy').style.display = 'none';  // Form ID for Select Option with ID getCrud
			      document.getElementById('questionType').style.display = 'none';
			      document.getElementById('qID').style.display = 'none';
            document.getElementById('examMainTopic').style.display = 'none';
            document.getElementById('examSubTopic101').style.display = 'none'; // Exam sub Topic 101
            document.getElementById('examSubTopic102').style.display = 'none'; // Exam sub Topic 102
            document.getElementById('examSubTopic103').style.display = 'none'; // Exam sub Topic 103
            document.getElementById('examSubTopic104').style.display = 'none'; // Exam sub Topic 104
            document.getElementById('examSubTopic105').style.display = 'none'; // Exam sub Topic 105
            document.getElementById('examSubTopic106').style.display = 'none'; // Exam sub Topic 106
            document.getElementById('examSubTopic107').style.display = 'none'; // Exam sub Topic 107
            document.getElementById('examSubTopic108').style.display = 'none'; // Exam sub Topic 108
            document.getElementById('examSubTopic109').style.display = 'none'; // Exam sub Topic 109
            document.getElementById('examSubTopic110').style.display = 'none'; // Exam sub Topic 110
            document.getElementById('formSingle').style.display = 'none';  // single answer form
            document.getElementById('formMultiple').style.display = 'none';  // Multi answer form
            document.getElementById('formTyped').style.display = 'none';  // Type in the box form
            document.getElementById('formImageFile').style.display = 'none';  // Image file yes or no
            document.getElementById('formImageLocation').style.display = 'none';  // Image file location

            document.getElementById("dbActionCrud").innerHTML = "";
            document.getElementById("dbGetCrud").innerHTML = "";
            document.getElementById("dbID").innerHTML = "";
            document.getElementById("dbQuestionType").innerHTML = "";
            document.getElementById("dbSubTopic").innerHTML = "";
            document.getElementById("dbQuestion").innerHTML = "";
            document.getElementById("dbMessage").innerHTML = "";
            document.getElementById("dbImageFile").innerHTML = "";
            document.getElementById("dbImageLocation").innerHTML = "";
            document.getElementById("dbAnswer1").innerHTML = "";
            document.getElementById("dbAnswer2").innerHTML = "";
            document.getElementById("dbAnswer3").innerHTML = "";
            document.getElementById("dbAnswer4").innerHTML = "";
            document.getElementById("dbAnswer5").innerHTML = "";
            document.getElementById("dbCorrectAnswer").innerHTML = "";

            setupEventListeners ();
        }  //  End of Init Function
    };  // End of Return
}(); // End of crudQuestions function

crudQuestions.init();
