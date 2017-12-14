
let process = {
	menu:function(){
		let content = 
			<div class="page theme-red">
				<div class="views">
					<div class="view view-main">
						<div class="navbar navbar-fixed">
							<div class="navbar-inner">
								<div class="center">Alarm App</div>
							</div>
						</div>
						<div class="content-block">
							<div id="MyrealTime"></div>
						</div>
						<div class="content-block">
							<input type="time" id="time" placeholder="00:00" />
						</div>	
							<form class="list-block">
  								<ul id="alarmlist">
  								<a href="#" class="button button-big color-red" onClick={addNew}>Add new Alarm</a>
    								<li class="item-divider"><span id="realTime"></span></li>
    								<li>
      									<div class="item-content">
        									<div class="item-inner" id="alarmlist-loader">
        									</div>
      									</div>
    								</li>		
  								</ul>	
							</form>
						</div>
					</div>
				<div id="DIV"></div>
			</div>;
		ReactDOM.render(content,document.getElementById('root'));
		save();
	},
	loadAlarmList:function(){
		let content = <div>

		</div>;
		ReactDOM.render(content,document.getElementById('alarmlist-loader'));
	},
	alarmSound:function(){
		let sound = 
		<div>
			<audio id="audio" autoPlay><source type="audio/mpeg" src="./audio/horse.ogg"></source>
			</audio>
			<audio autoPlay loop>
			<source type="audio/mpeg" src="./audio/alarm.mp3"></source></audio>;
		</div>;
		ReactDOM.render(sound,document.getElementById('DIV'));		
	},

	loading:function(){
		let content = <div>
					Loading...
				</div>;
		ReactDOM.render(content,document.getElementById('root'));
	}
}
//
process.menu();
realTIME();
var realTime;
function realTIME() {
	var date = new Date();
    var _date = date.toDateString();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    if(hours === "00"){
        hours = "12";
    }
var hr,ms = 0,t;
var newtime;
realTime = document.getElementById('time').value;

for(var x = 0; x < 24;x++){							//hours
	if(hr < 10 || hr === 0){
		hr = "0" + x;
	}else{
		hr = x;
	}
	for(var y = 0; y < 60;y++){
		if(ms < 9){
			ms = "0" + y;
		}else{
			ms = y;
		}
		if(hr > 12){
			newtime = hr -12 +":"+ms;
		}else{
			newtime = hr +":"+ms;
		}
		if(realTime == newtime){
			realTime = newtime;
		}
		//console.log(realTime,time);
	}
}
    var time = hours + ":" + minutes+" "+am_pm;
   	document.getElementById('MyrealTime').innerText = hours + ":" + minutes+" "+am_pm;
    //console.log(time +"   "+ realTime +" xxx");
    setTimeout(realTIME,1000);
}

function addNew() {
	var caption = prompt("Give your alarm a caption");
	var time = document.getElementById('time').value;
	console.log(time);
	var parent = document.getElementById('alarmlist');
	var list = document.createElement('li');
	var itemContent = document.createElement('div');
	itemContent.className = "item-content";
	var itemInner =document.createElement('div');
	itemInner.className = "item-inner";
	var titleLabel = document.createElement('div');
	titleLabel.className = "item-title label";
	titleLabel.id = "item-title-label";
	titleLabel.innerText = caption;
	var itemInput = document.createElement('div');
	itemInput.className = "item-input";
	var labelSwitch = document.createElement('label');
	labelSwitch.className = "label-switch";
	var input = document.createElement('input');
	input.type = "checkbox";
	input.value = "";
	var check = document.createElement('div');
	check.className = "checkbox";
	var alarmTime = document.createElement('span');
	//alarmTime.id = "alarmTime";
	alarmTime.innerText = time;

	//labelSwitch.appendChild(input);
	//labelSwitch.appendChild(check);
	//itemInput.appendChild(labelSwitch);
	itemInner.appendChild(titleLabel);
	itemInner.appendChild(itemInput);
	itemInner.appendChild(alarmTime);
	itemContent.appendChild(itemInner);
	list.appendChild(itemContent);
	parent.appendChild(list);


	var hr,ms,sc = 0;
	var ap = "AM";
	localStorage.setItem("alarmtime",time);
	//console.log(hr,ms,sc)
	//console.log(time+"  "+realTime);
	if(time == realTime){
		console.log('alarm!');
		process.alarmSound();
		alert("Snooze");
	}

}

function save(){
	console.log("Local ",localStorage.getItem("alarm time"));
}

