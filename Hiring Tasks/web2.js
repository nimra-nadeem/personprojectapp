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
// DO NOT EDIT - END /////////////////////////////////////////////////////////////////////////////


welcomeInstruct = " <h2> Welcome! </h2> <p> This is a basic survey to get some information about you. </p> <br /> <br /> To begin, click the button below!";
  
// WELCOME SCREEN
var welcomeScreen = function(){
	root_block = document.getElementById('root');
	
	//container block
	let welcome = document.createElement('div');
	welcome.id = "welcome";
	welcome.className = "container";
	welcome.innerHTML = "";
	root_block.appendChild(welcome);
	
		//gray box with title and instructions
		//"<h2>" + titleofsurvey + "</h2>" + 
		let jumbo = document.createElement('div');
		jumbo.className = "jumbotron";
		jumbo.innerHTML =  welcomeInstruct + "<br /><br />" + "<button id='begin_task' type='button' class='btn btn-primary'	onclick='beginTask()'>Begin</button>";
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
	
		let jumbo = document.createElement('div');
		jumbo.id = "jumbo";
		jumbo.className = "jumbotron";
		jumbo.innerHTML =  '';
		task.appendChild(jumbo);
		
		/* ******************************************************************
		insert survey question 1 html
		********************************************************************/
		var surveyQ1 =`
		1.	Which of these animals do you have in your home? Select all that apply: <br>

		<input type="checkbox" id="dog" name="dog" value="Dog"> 
		<label for="dog"> Dog </label><br>

		<input type="checkbox" id="cat" name="cat" value="Cat">
		<label for="cat"> Cat </label><br>

		<input type="checkbox" id="fish" name="fish" value="Fish">
		<label for="fish"> Fish </label><br>

		<input type="checkbox" id="bird" name="bird" value="Bird">
		<label for="bird"> Bird </label><br>

		<input type="checkbox" id="other" name="other" value="Other">
		<label for="other"> Other </label><br>

		<div style="text-align: right;"><button id="next" type="button" style="margin:2px" class="btn btn-primary">Next</button></div>`;
		/********************************************************************/
		
	jumbo.innerHTML = surveyQ1;
	//document.getElementById('responseOptions').insertAdjacentHTML('beforeend', image);
	document.getElementById("welcome").style.display = "none";
	recordResponses();
};


//create empty array to store the results in memory
var results = [];
var first = true;

//START SURVEY TASK 1
var recordResponses = function(){
	
	setTimeout(function(){
		$("#task button").on("click", function () {
			
			// write code to push the checked items to an array
			if (document.getElementById('dog').checked) {
				results.push('dog');
			}
			if (document.getElementById('cat').checked) {
				results.push('cat');
			}
			if (document.getElementById('fish').checked) {
				results.push('fish');
			}
			if (document.getElementById('bird').checked) {
				results.push('bird');
			}
			if (document.getElementById('other').checked) {
				results.push('other');
			}
			  
			var Q2_content;
  			//create next function for page 2
  			// include conditional statements to direct user to the correct page
			  // refer to the instruction sheet for guidance on where users should go

			
			if (results.includes('dog')) {
				Q2_content = `
					2. What is your dog's name? <br /> <br />

					<input type="text" id="dogans" name="q2ans"><br><br>

					<div style="text-align: right;"><button id="next" type="button" style="margin:2px" class="btn btn-primary" onclick = "handledog()" >Next</button></div>`;

			} else if (results.length == 0) {
				Q2_content = `
				2.	Please rate how often you think about getting a pet using the following scale: <br /> <br />

				<div class="btn-group-vertical" onclick="this.blur();">
		
					<button type="button" class="btn btn-primary text-left" id="choose1" value="1" name="radioGroup" onclick = "handlenone(this.value)">
					Never
					</button>
					<button type="button" class="btn btn-primary text-left" id="choose2" value="2" name="radioGroup" onclick = "handlenone(this.value)">
					Rarely
					</button>
					<button type="button" class="btn btn-primary text-left" id="choose3" value="3" name="radioGroup" onclick = "handlenone(this.value)">
					Sometimes
					</button>
					<button type="button" class="btn btn-primary text-left" id="choose4" value="4" name="radioGroup" onclick = "handlenone(this.value)">
					Quite a bit
					</button>
					<button type="button" class="btn btn-primary text-left" id="choose5" value="5" name="radioGroup" onclick = "handlenone(this.value)">
					All the time
					</button>
				</div>

				<div style="text-align: right;"><button id="next" type="button" style="margin:2px" class="btn btn-primary" onclick = "handledog()" >Next</button></div>`;

			} else {
				Q2_content = `
				2. What is your animal's name? <br /> <br />

				<input type="text" id="animalans" name="q2ans"><br><br>

				<div style="text-align: right;"><button id="next" type="button" style="margin:2px" class="btn btn-primary" onclick = "handleanimal()" >Next</button></div>`;

			}
			document.getElementById("jumbo").innerHTML = Q2_content;
			surveyQ2();
		});	
	}, 625);
	
};

var handledog = function() {
	results.push({"dog name": document.getElementById("dogans").value})
	done();
}

var handleanimal = function() {
	results.push({"animal name": document.getElementById("animalans").value})
	done();
}

var handlenone = function(val) {
		results.push({"Desire to have a pet (1-5)": val});
		done();
}

//next survey page -- repeat for additional survey questions
var surveyQ2 = function(){
	console.log("render survey q2");
	
	console.log(results);
	

};

//COMPILE RESULTS AND RENDER
var done = function(){
	document.getElementById("task").style.display = "none";
	console.log("Finished!");
	console.log(results);
	let thankyou = document.createElement('h2');
	thankyou.id = "thankyou";
	thankyou.innerHTML = 'You\'re done!';
	root_block.appendChild(thankyou);

	thankyou = document.createElement('p');
	thankyou.innerHTML = 'Thank you so very much for your time - your information is very valuable to us!';
	root_block.appendChild(thankyou);
};
