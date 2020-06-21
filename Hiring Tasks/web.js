// DO NOT EDIT - START
function loadScript(url, callback)
    {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function loadBootstrap() {
    var head = document.getElementsByTagName('head')[0];
    var link1 = document.createElement('link');
    link1.rel = "stylesheet";
    link1.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    head.appendChild(link1);
}

function loadStyle() {
    loadBootstrap();
}
function wait(ms){
	var start = new Date().getTime();
	var end = start;
	while(end < start + ms){
		end = new Date().getTime();
	}
} 

window.onload = function(e){
	const meta = document.createElement('meta'); 
	meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'); 
	meta.setAttribute('name', 'viewport'); 
	document.head.appendChild(meta);


    const metaTag = document.createElement('metaTag');
    metaTag.name = "viewport";
    metaTag.content = "width = device-width, initial-scale = 1.0";
    document.getElementsByTagName('head')[0].appendChild(metaTag);
	
	metaTag.name = "handheldfriendly";
	metaTag.content = "true";
	document.getElementsByTagName('head')[0].appendChild(metaTag);
	
	metaTag.name = "mobileoptimized";
	metaTag.content = "240";
	document.getElementsByTagName('head')[0].appendChild(metaTag);
    //var html = document.getElementsByTagName('html')[0];
    //html.setAttribute('style','height:' + window.outerWidth + 'px !important');
    //html.setAttribute('style','width:' + window.outerWidth + 'px !important');
	
	
    var onjQLoad = function() {
      // load Bootstrap
      loadScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", onBootstrapload);
      console.log("onjQLoad");
    };
    var onBootstrapload = function() {
      // load FontAwesome
      loadScript("https://use.fontawesome.com/releases/v5.0.8/js/all.js", welcomeScreen);
      console.log("onBootstrapload");
    };
    loadStyle();
    //load jQuery
    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", onjQLoad);
};

getCSRFToken = function() {
 return document.getElementsByTagName("meta")["csrf-token"].content;
};
// DO NOT EDIT - END


welcomeInstruct = "To begin, click the button below!";
instruct1 = "You will see pairs of personality traits that may or may not apply to you. In response to each statement, please indicate the extent to which you agree or disagree with that statement. You should rate the extent to which the pair of traits applies to you, even if one characteristic applies more strongly than the other.";
instruct2 = "I see myself as:";

// INSERT SURVEY QUESTIONS INTO ARRAY(s)
var item = ['Extraverted, Enthusiastic', 'Critical, Quarrelsome', 'Dependable, Self-Disciplined', 'Anxious, Easily upset', 'Open to new experiences, Complex', 'Reserved, Quiet', "Sympathetic, Warm", "Disorganized, Careless", "Calm, Emotionally Stable", "Conventional, Uncreative"];
  
//var item = ['Extraverted, Enthusiastic', 'Critical, Quarrelsome', 'Dependable, Self-Disciplined'];
  

// WELCOME SCREEN
var welcomeScreen = function(){
	root_block = document.getElementById('root');

	let survey_title = document.createElement('h2');
	survey_title.id = "survey_title";
	survey_title.innerHTML = 'Ten-Item Personality Index (TIPI) Survey';
	root_block.appendChild(survey_title);
	
	//container block
	let welcome = document.createElement('div');
	welcome.id = "welcome";
	welcome.className = "container";
	welcome.innerHTML = "";
	root_block.appendChild(welcome);

	
	//gray box with title and instructions
	let jumbo = document.createElement('div');
	jumbo.className = "jumbotron";
	jumbo.innerHTML =  instruct1 + "<br /><br />" + welcomeInstruct + "<br /><br />" + "<button id='begin_task' type='button' class='btn btn-primary'	onclick='beginTask()'>Begin</button>";
	welcome.appendChild(jumbo);
};

// RE-RENDER THE SURVEY SECTIONS AND CONTENT (this isn't efficient, but oh well, for now.)
var beginTask = function(){
	//when a user clicks "Begin" the "welcome" block goes away and the survey block appears
	let task = document.createElement('div');
	task.id = "task";
	task.className = "container";
	task.innerHTML = "";
	root_block.appendChild(task);
	
		//'<h2>' + titleofsurvey +  '</h2>' +
		let jumbo2 = document.createElement('div');
		jumbo2.className = "jumbotron";
		jumbo2.innerHTML =  '<div id="instruct">' + instruct2 + '</div><div id="stimulus_prompt"><span id="stim1" style="font-weight: bold;"> </span></div><hr><div id="responseOptions">' ;
		task.appendChild(jumbo2);
		
		/* ******************************************************************
		EDIT YOUR RESPONSE SCALE HERE
		********************************************************************/
		var responseScale =`
		<div class="btn-group-vertical" onclick="this.blur();">
		
			<button type="button" class="btn btn-primary text-left" id="choose1" value="1" name="radioGroup">
			Disagree strongly
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose2" value="2" name="radioGroup">
			Disagree moderately
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose3" value="3" name="radioGroup">
			Disagree a little
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose4" value="4" name="radioGroup">
			Neither agree nor disagree
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose5" value="5" name="radioGroup">
			Agree a little
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose6" value="6" name="radioGroup">
			Agree moderately
			</button>
			<button type="button" class="btn btn-primary text-left" id="choose7" value="7" name="radioGroup">
			Agree strongly
			</button>
		</div>`;

		/*var image = '<div align="right"> <button type="button" class="btn btn-primary   btn-xs btn-transparent text-right" id="choose8" value="0" name="radioGroup"> Skip </button> </div>'*/

		/********************************************************************/
		
	document.getElementById('responseOptions').insertAdjacentHTML('beforeend', responseScale);
	//document.getElementById('responseOptions').insertAdjacentHTML('beforeend', image);
	document.getElementById("welcome").style.display = "none";
	runTask();
};

//create empty array to store the results in memory
var results = [];
var rating = 0;
var curi = 0;
var itemArray = item.length;
var first = true;

//START SURVEY TASK 1
var runTask = function(){
	//add a transition between survey items
	document.activeElement.blur();
	
		if (first == false) {
		setTimeout(function(){
			document.activeElement.blur();
			document.getElementById("stim1").style.opacity=1;
			document.getElementById("stim1").innerHTML = "<br />" + item[curi] + "<br />";
			document.getElementById("responseOptions").style.opacity=1;
		}, 300);
	}
	else {	
		document.getElementById("stim1").innerHTML = "<br />" + item[curi] + "<br />";
		document.activeElement.blur();
	}

	setTimeout(function(){
		$("#responseOptions button").on("click", function () {
			//trigger animation-like behavior on click
			document.getElementById("stim1").style.opacity=0.1; 
			document.getElementById("responseOptions").style.opacity=0.1; 
			first = false;

			rating = this.value;
			
			results.push({
				"item": item[curi],
				"rating":parseInt(rating),
			});
			//results.push(parseInt(rating));

			console.log("item" + " " + (curi) + ", " + "rating = " + rating);
			$("#responseOptions button").off("click");
			curi = ++ curi;

			if (curi < itemArray) {
				runTask();
			}
			else {
				compileResults();
			}
		});	
	}, 625);
	
};

//COMPILE RESULTS AND RENDER
var compileResults = function(){
	document.getElementById("task").style.display = "none";

	
	// create a var for each subscale with its calculation.
	// var names should match var names being pushed into the results array
	var reversed, openness, agree, cons, extra, stable;


	// insert calc code here

	// extra: 1, 6R
	reversed = 8 - results[5].rating;
	extra = (results[0].rating + reversed)/2;

	// agree: 2R, 7
	reversed = 8 - results[1].rating;
	agree = (results[6].rating + reversed)/2;

	// cons: 3, 8R
	reversed = 8 - results[7].rating;
	cons = (results[2].rating + reversed)/2;

	// stable: 4R, 9
	reversed = 8 - results[3].rating;
	stable = (results[8].rating + reversed)/2;

	// openness: 5, 10R
	reversed = 8 - results[9].rating;
	openness = (results[4].rating + reversed)/2;


	let final_page = document.createElement('h2');
	final_page.id = "final_page";
	final_page.innerHTML = "Awesome, you're done!";
	root_block.appendChild(final_page);

	let result_para = document.createElement('p');
	result_para.id = "result_para";
	result_para.innerHTML = "Here are your results:";
	root.appendChild(result_para);

	var result_list = document.createElement('ul');
	result_list.id = "result_list";
	result_list.innerHTML = "";
	result_para.appendChild(result_list);

	result_item = document.createElement('li');
	result_item.id = "result_item";
	result_item.innerHTML = "You are " + Math.ceil((extra/7)*100) + "% extraverted";
	result_list.appendChild(result_item);

	result_item = document.createElement('li');
	result_item.id = "result_item";
	result_item.innerHTML = "You are " + Math.ceil((agree/7)*100) + "% agreeable";
	result_list.appendChild(result_item);
	
	result_item = document.createElement('li');
	result_item.id = "result_item";
	result_item.innerHTML = "You are " + Math.ceil((cons/7)*100) + "% conscientious";
	result_list.appendChild(result_item);

	result_item = document.createElement('li');
	result_item.id = "result_item";
	result_item.innerHTML = "You are " + Math.ceil((stable/7)*100) + "% emotionally stable";
	result_list.appendChild(result_item);

	result_item = document.createElement('li');
	result_item.id = "result_item";
	result_item.innerHTML = "You are " + Math.ceil((openness/7)*100) + "% open to new experiences";
	result_list.appendChild(result_item);
		
	// push to results array DO NOT CHANGE
	results.push({"openn": openness}, {"agree": agree}, {"cons": cons}, {"extra": extra}, {"stable": stable});
	console.log(results);
	
	var user_id = $("#user_id").html();
	var study_id = $("#study_id").html();
    
	// FOR WEB DO NOT CHANGE
	var redirect = function(response) {window.location = response.redirect_url;};
	$.post({
		url: "/studies.json",
		headers: {
			'X-CSRF-Token': getCSRFToken(),
			//'X-CSRF-Token': 123,
		},
		dataType: 'json',
		data: {
	 		study: {
	 			user_id: user_id,
	 			study_id: study_id,
	 			custom_study_results: JSON.stringify(results),
	 			//score: score
	 		}
	 	},
	 	success: redirect
	});	

	//FOR MOBILE ONLY
	//var resultData = { custom_study_results: (results) , score:score } 
	//var str= JSON.stringify(resultData); setTimeout(function () { //window.ReactNativeWebView.postMessage(str); },500);
};
