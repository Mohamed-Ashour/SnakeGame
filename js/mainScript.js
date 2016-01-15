//************************ Mina Code **************************/
	
	function register(){
		
		
		var regName = document.getElementById('regName');
		var colorSelect = document.getElementById('colorSelect');		
		// DataStorge Get Data 
			
			
			
			if(regName.value !="")
			{
				
					
				
				var nallJobs = localStorage.users;
				var  nmobj = JSON.stringify(nallJobs);
				var nsobj = JSON.parse(nallJobs);
				
				
				var flag = 0;
				for(var i = 0 ; i < nsobj.users.length ; i++)
				{
					if(nsobj.users[i].username == regName.value)
					{
						
						flag =1;
						break;	
					}
				}
				
				if(parseInt(flag) == 0)
				{
					
					// Enter The New User To DataStorage
					var usersObj = JSON.parse(localStorage.users);
					var user = {
						'username':regName.value,
						'color':colorSelect.value ,
						'topscore':0,
						'badges':0 
					}
					console.log("bbbbb");
					usersObj.users.push(user);
					var jObj = JSON.stringify(usersObj);
					localStorage.users = jObj;
					alert("Registeration Complete ");
					logInForm();
					
					//location.href='index.html';
				}
				else
				{
					alert("Sorry This Name Already Taken");	
				}
			}
			else{
				alert("Please Enter user Name");
				document.getElementById("regName").focus();	
			}
			
		
	}	
	
	
	
	function login(){
			var loginName = document.getElementById('loginName');
			// DataStorge Get Data 
			
			var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			
			var flag =0;
			for(var i = 0 ; i < sobj.users.length ; i++)
			{
				if(sobj.users[i].username == loginName.value)
				{
				
					localStorage.currentUser = i;
					localStorage.isLoged="true";	
					flag =1;	
					break;
					
				}
			}
			
			if( parseInt(flag) == 0)
			{	
				alert("Sorry This User Not Registered");
				document.getElementById("loginName").focus();				
				
			}
			else
			{
				location.href='snake.html';	
			}
	}
	
	function getColor(){
			var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			
			//console.log(sobj.users[localStorage.currentUser].color);
			return sobj.users[localStorage.currentUser].color;
	}
	
	function getName(){
		var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			return sobj.users[localStorage.currentUser].username;
	}
	function getScore(){
		var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			return sobj.users[localStorage.currentUser].topscore;
	}
	
	function topScore(score){
		var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
		
		
		var flag=0;
		if(localStorage.topScore < score)
		{
			localStorage.topScore = score ;
			flag = 1;
		}
		if(parseInt( score) > parseInt( sobj.users[localStorage.currentUser].topscore))
		{
			sobj.users[localStorage.currentUser].topscore = score;
			var newjObj = JSON.stringify(sobj);
			localStorage.users=newjObj;
		}
		
		
		//return flag;
		
	}
	
	function setBadges(score){
		
		var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
		sobj.users[localStorage.currentUser].badges=score;
			var newjObj = JSON.stringify(sobj);
			localStorage.users=newjObj;
	}
	
	function getBadges(){
		var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
		return	sobj.users[localStorage.currentUser].badges;
	}
	
	
	
	function checkLoged()
	{
		
		var path = window.location.pathname;
		var PageName = path.split("/").pop();
		if(PageName == "snake.html" && localStorage.isLoged == "false" )
		{
			location.href='index.html';	
		}
	}
	
	function getPageName()
	{
		var path = window.location.pathname;
		var pageName = path.split("/").pop();
		return pageName;
	}
	
	function logOut()
	{
		localStorage.isLoged=false;
		localStorage.currentUser='';
		location.href='index.html';	
	}
	
	
	
	function printBadges()
	{
		var newCanvContent='';
		for(var i=0;i < getBadges() ; i++){
			 
			newCanvContent +='<img src="img/star.png" width="20" height="20">'
			}
			return newCanvContent;
	}

	function printMyBadges(badges)
	{
		var newCanvContent='';
		for(var i=0;i < getBadges() ; i++){
			 
			newCanvContent +='<img src="img/star.png" width="20" height="20">'
			}
			return newCanvContent;
	}

	/* View Login Form */
	function logInForm()
	{
		var myconvas=document.getElementById("my-canvas");	
		myconvas.innerHTML='<div id="loginForm" ><h1 align="center" >LogIn Page</h1><label>User Name : </label><input type="text" id = "loginName" class"mytext" placeholder="Enter Your User Name" style="display:block;width:70%;padding:5px;margin-left:110px;"><br><button style="float:right;margin-right:15px;" id="login" onClick="login()">Enter</button></div>';	
	}

	/*  View Registeration Form */

	function registerForm()
	{
		var myconvas=document.getElementById("my-canvas");	
		myconvas.innerHTML=
		'<div id="registerForm"><h1 align="center">Registration Page</h1><label >User Name</label><input type="text" id ="regName" placeholder="Enter User Name" style="display:block;width:70%;padding:5px;margin-left:110px;margin-top:10px;"><br><label>Character Style :</label><input type="color" id="colorSelect" style="display:block;width:70%;padding:5px;margin-left:110px;margin-top:10px;"><br><button id="register" style="float:right;margin-right:15px;" onClick="register()">register</button>'
		;	
	}


			
window.onload = function(){			
			
			// Check If user Logged Or No
		checkLoged();
		
		// Create Some Default Storage 
		if(typeof(localStorage.isLoged) == "undefined")
		{ 	
			localStorage.isLoged="false";	
		}
		
		if(typeof localStorage.isNotFirst == "undefined"){
			localStorage.isNotFirst = "true";
			var usersObj = {'users':[]};
			var jObj = JSON.stringify(usersObj);
			localStorage.users = jObj;
			localStorage.topScore = 0;
		}
		
		
		if(localStorage.isLoged == "true"  && getPageName() != "snake.html"){
			var statusBar=document.getElementById("statusBar");
			var canvContent=document.getElementById("my-canvas");
			var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			statusBar.innerHTML = '<label style="display:block;float:left;font-size:24px;color:#FFF;">'+getName()+'</label><a id="registerBtn" onClick="logOut()">logout</a>&nbsp; <a id="registerBtn" class="registerBtn" href="snake.html"> Play</a><label style="display:block;float:right;margin-right:5px;color:#FFF;">Your Heigh Score : '+getScore()+'</label>';
			canvContent.innerHTML = '<h2 align="center">Home Page</h2><div><label><b>User Name : </b></label>'+getName()+'</div><div><br><label><b>Style : </b></label><label style="background:'+ getColor() +';width:100px;">Snake\'s Color </label></div><div><br><label><b>User Top Score: </b></label>'+getScore()+'</div><div><br><label><b>User Badges : </b></label>'+ printBadges() +'</div> <div><br><label><b>Game High Score: </b></label>'+ localStorage.topScore +'</div>';
		}
		
		if(localStorage.isLoged == "true"  && getPageName() == "snake.html"){
			var statusBar=document.getElementById("snakeStatusBar");
			var allJobs = localStorage.users;
			var  mobj = JSON.stringify(allJobs);
			var sobj = JSON.parse(allJobs);
			statusBar.innerHTML = '<label style="display:block;float:left;font-size:18px;margin-top:5px;margin-left:-7px ;">Player : '+getName()+'</label>  <label style="float:left; margin-left:10px;"> </label>  <a id="registerBtn" onClick="logOut()  ;">logout</a>&nbsp; <a id="registerBtn" class="registerBtn" href="index.html"> Home</a><label style="display:block;float:right;margin-right:30px;margin-top:6px;">Your Heighest Score : '+getScore();
			
		}
				
				
						
				if(localStorage.isLoged == "true" && getPageName() == "snake.html" ){
				
				// Delete From Here 
				main();
	
			}
		
}		


/**************************** End Of My Code Mina *******************************/
			
			
			
var
COLS = 50,
ROWS = 26,

EMPTY = 0,
SNAKE = 1,
FRUIT = 2,

LEFT  = 0,
UP    = 1,
RIGHT = 2,
DOWN  = 3,

KEY_LEFT  = 37,
KEY_UP    = 38,
KEY_RIGHT = 39,
KEY_DOWN  = 40,

canvas,wall_x=0,
wall_y=0, ctx, keystate, frames,score,myscore;



var LEVEL = 1
var SPEED = 5
BADGES = getBadges();

bg_sound = document.getElementById("background_sound");
hit_sound = document.getElementById("hit_sound");
food_sound = document.getElementById("food_sound");

star = document.getElementById("star");

///////////////////////////////////////////MohamedAshour///////////////////////////////////////////////

grid = {
	width : null,
	height : null,
	_grid : null,

	init : function (dflt, cols, rows) {
		this.width = cols;
		this.height = rows;
		this._grid = [];
		for(var x=0; x<cols; x++){
			this._grid.push([]);
			for (var y=0; y<rows; y++){
				this._grid[x].push(dflt);
			}
		}
	},

	set : function(val, x, y) {
		this._grid[x][y] = val;
	},

	get : function (x, y) {
		return this._grid[x][y];
	}
}


snake = {
	direction : null,
	last : null,
	_queue : null,

	init : function (d, x, y) {
		this.direction = d;
		this._queue = [];
		this.insert(x, y);
	},

	insert : function(x, y){
		this._queue.unshift({x:x, y:y})
		this.last = this._queue[0];
	},

	remove : function(){
		return this._queue.pop();
	}
}

function setFood(){
	emptyFields =[];
	for(var x=0; x<grid.width; x++){
		for(var y=0; y<grid.height; y++){
			if(grid.get(x,y) === EMPTY){
				emptyFields.push({x:x,y:y});
			}
		}
	}
	var foodPos = emptyFields[Math.floor(Math.random()*emptyFields.length)];
	grid.set(FRUIT, foodPos.x, foodPos.y)
}



///////////////////////////////////////////Mohamed Ashour///////////////////////////////////////////////
	
	
	
///////////////////////////////////////// kareem //////////////////////////////////////
	
// function init  initiate game object or reset the game 

function init ()
{
	myscore = 0
	score = 0
	bg_sound.load();
	bg_sound.play();
	bg_sound.loop=true;


	grid.init(EMPTY,COLS,ROWS);  // start arg in init 

	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);

	setFood();
}


function next()
{
	myscore = 0;
	bg_sound.volume = .2;
	bg_sound.load();
	bg_sound.play();

	bg_sound.loop=true;


	grid.init(EMPTY,COLS,ROWS);  // start arg in init 

	var sp = {x:Math.floor(COLS/2), y:ROWS-1};
	snake.init(UP, sp.x, sp.y);
	grid.set(SNAKE, sp.x, sp.y);

	setFood();
}

/*
function main  create canvas dynamic (if needed)

call functions

add events for keys 
 

*/


function main() {
	// create canvas
	
	canvas = document.createElement("canvas");
	canvas.width = COLS*20;
	canvas.height = ROWS*20;
	ctx = canvas.getContext("2d");
	
	
	// append it to html body 
	document.body.appendChild(canvas);

	// sets an base font for bigger score display
	ctx.font = "12px blue";

	frames = 0;
	keystate = {};
	
	// keeps track of the keyboard input
	document.addEventListener("keydown", function(evt) {
		keystate[evt.keyCode] = true;
	});
	
	
	document.addEventListener("keyup", function(evt) {
		delete keystate[evt.keyCode];
	});

	
	// intatiate game objects and starts the game loop
	init();
	loop();
}
/*
 Ahmed alaa begin his work
 */
function loop() {
	update();
	draw();
	window.requestAnimationFrame(loop, canvas);
}


function update() {
	frames++;

	
	if (frames%SPEED === 0) {
        
        var nx = snake.last.x;
		var ny = snake.last.y;
		var w=grid.width-1;
		var h= grid.height-1;
		bg_sound.play();
		bg_sound.volume = .3;
		update_direction();

        if(snake.direction==LEFT)
		    nx--;
		else if(snake.direction==UP)
		   ny--;	
		else if(snake.direction==RIGHT)
		    nx++;
       else if(snake.direction==DOWN)
		    ny++; 			
	

		if (wall_x > nx || nx > w ||wall_y > ny || ny >h ||grid.get(nx, ny) === SNAKE)
		{
			bg_sound.pause();
			hit_sound.play();
			
			LEVEL = 1;
			SPEED = 5;

			topScore(score);
			setBadges(BADGES);
			alert("Game Over");
			location.href='snake.html';
			return init();
		}
        if (grid.get(nx, ny) === FRUIT) {
			score+=10;
			myscore += 10;
			bg_sound.pause();
			food_sound.play();
			setFood();
		} else {
			var tail = snake.remove();
			grid.set(EMPTY, tail.x, tail.y);
		}
		   grid.set(SNAKE, nx, ny);
		   snake.insert(nx, ny);

		if(frames > 6000 && getBadges()< 3 ){

			setBadges(3)
			BADGES = 3;
		}
		else if(frames > 4000 && getBadges()< 2){
			setBadges(2);
			BADGES = 2;		}

		else if(frames > 2000 && getBadges()< 1){
			setBadges(1);
			BADGES = 1;
		}

		if (myscore >= 100 & LEVEL == 2){
		LEVEL = 3;
		SPEED = 3;
		alert("Level 3");
		return next();
		}

		if (myscore >= 100 & LEVEL == 1){
		LEVEL = 2;
		SPEED = 4;
		alert("Level 2");
		return next();
		}

	}
}

function update_direction() {
    if (keystate[KEY_LEFT] && snake.direction !== RIGHT) {
	snake.direction = LEFT;
	}
	else if (keystate[KEY_UP] && snake.direction !== DOWN) {
		snake.direction = UP;
	}
	else if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {
		snake.direction = RIGHT;
	}
	else if (keystate[KEY_DOWN] && snake.direction !== UP) {
		snake.direction = DOWN;
	}
}

	function draw() {
		draw_allcells();
		ctx.fillStyle = "#000";
		ctx.font="12px Georgia";
		ctx.fillText("SCORE: " + score, 10, canvas.height-10);
		ctx.fillText("LEVEL: " + LEVEL, canvas.width -70, canvas.height-10);
		ctx.fillText("Survival Badges: ", 10, 20);
		var place = 10;
		for (var i = 0; i < BADGES; i++) {
			ctx.drawImage(star, place, 30, 25, 25);
			place+= 30;			
		};
	}

	function draw_allcells() {
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	var x=0;
	var y=0
		while ( x < grid.width) {
		for (y=0; y < grid.height; y++) {
		if(grid.get(x, y)==EMPTY)
		ctx.fillStyle = "#fff0ee";
		else if(grid.get(x, y)==SNAKE)
{		ctx.fillStyle = getColor();
		ctx.strokeStyle="#fff0ee";
		ctx.strokeRect(x*tw, y*th, tw, th);}
		else if(grid.get(x, y)==FRUIT)
		{ctx.fillStyle = "#f00dde";}
		ctx.fillRect(x*tw, y*th, tw, th);
		}
		x++;
	}
}
/*
 Ahmed alaa finish his work
 */
 