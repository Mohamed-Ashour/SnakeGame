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
					console.log("aAAAAAAAA");
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
		var PageName =window.location.href.split('storge/');
		if(PageName[1] == "snake.html" && localStorage.isLoged == "false" )
		{
			location.href='index.html';	
		}
	}
	
	function getPageName()
	{
		var pageName =window.location.href.split('storge/');
		return pageName[1];
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
			 
			newCanvContent +='<img src="img/star.jpg" width="20" height="20">'
			}
			return newCanvContent;
	}
	/* View Login Form */
	function logInForm()
	{
		var myconvas=document.getElementById("my-canvas");	
		myconvas.innerHTML='<div id="loginForm"><h1 align="center">Log in Form</h1><label>User Name : </label><input type="text" id = "loginName" class"mytext" placeholder="Enter Your User Name" style="display:block;width:70%;padding:5px;margin-left:110px;"><br><button style="float:right;margin-right:15px;" id="login" onClick="login()">Enter</button></div>';	
	}

	/*  View Registeration Form */

	function registerForm()
	{
		var myconvas=document.getElementById("my-canvas");	
		myconvas.innerHTML=
		'<div id="registerForm"><h1 align="center">Registration Form</h1><label >User Name</label><input type="text" id ="regName" placeholder="Enter User Name" style="display:block;width:70%;padding:5px;margin-left:110px;margin-top:10px;"><br><label>Character Style :</label><input type="color" id="colorSelect" style="display:block;width:70%;padding:5px;margin-left:110px;margin-top:10px;"><br><button id="register" style="float:right;margin-right:15px;" onClick="register()">register</button>'
		;	
	}



/*************** Page OnLoad *********************/

		
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
	
	if(localStorage.isLoged == "true" ){
		var statusBar=document.getElementById("statusBar");
		var canvContent=document.getElementById("my-canvas");
		var allJobs = localStorage.users;
		var  mobj = JSON.stringify(allJobs);
		var sobj = JSON.parse(allJobs);
		statusBar.innerHTML = '<label style="display:block;float:left;font-size:24px;">'+getName()+'</label> <a id="registerBtn" onClick="logOut()">logout</a><label style="display:block;float:right;margin-right:5px;">Your Heigh Score : '+getScore()+'</label>';
		canvContent.innerHTML = '<h2 align="center">Home Page</h2><div><label><b>User Name : </b></label>'+getName()+'</div><div><br><label><b>Style : </b></label><label style="background:'+ getColor() +';width:100px;">Snake\'s Color </label></div><div><br><label><b>User Top Score: </b></label>'+getScore()+'</div><div><br><label><b>User Badges : </b></label>'+ printBadges() +'</div>';
	}
			
			
			/*		
			if(localStorage.isLoged == "true" && getPageName() == "snake.html" ){
				
				// Delete From Here 
				
			}
			
			
			*/
			
			
			
	
	
	
	
	
