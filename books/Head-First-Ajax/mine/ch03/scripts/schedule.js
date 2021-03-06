window.onload = initPage;
var welcomePaneShowing = true;  /* 控制是否能够显示提示信息的开关 */

function initPage() {
	console.log("initPage");

	// 左侧按钮图片变换效果
	var buttons = document.getElementById("navigation").getElementsByTagName("a");
	console.log(buttons.length);
	for (var i = 0; i < buttons.length; i++) {
		var elBtn = buttons[i];
		console.log(elBtn.title);
		elBtn.onmouseover = buttonOver;
		elBtn.onmouseout = buttonOut;
		elBtn.onclick = showTab;
	}

	// 上面TAB的Hint效果
	var tabs = document.getElementById("tabs").getElementsByTagName("a");
	for (var i = 0; i < tabs.length; i++) {
		elTab = tabs[i];
		console.log("tab: " + elTab.title);
		elTab.onmouseover = showHint;
		elTab.onmouseout = hideHint;
		elTab.onclick = showTab;
	}
}

function buttonOver() {
	console.log("buttonOver");
	this.className = "active";
}

function buttonOut() {
	this.className = "";
}

function showHint() {
	if (!welcomePaneShowing) {
		return;
	}
	var hintText = "";
	switch (this.title) {
		case "beginners":
			hintText = "Just getting started? Come join us!";
			break;
		case "intermediate":
			hintText = "Take your flexibility to the next level!";
			break;
		case "advanced":
			hintText = "Perfectly join your body and mind with these intensive workouts.";
			break;
		default:
			hintText = "Click a tab to display the course schedule for the class"; 
			break;
	}
	elContent = document.getElementById("content");
	elContent.innerHTML = "<h3>" + hintText + "</h3>";
}

function hideHint() {
	if (welcomePaneShowing) {
		hintText = "Click a tab to display the course schedule for the class"; 
		elContent = document.getElementById("content");
		elContent.innerHTML = "<h3>" + hintText + "</h3>";
	}
}

function showTab() {
	console.log(this.title);
	var selectedTab = this.title;
	if (selectedTab == "welcome") {
		welcomePaneShowing = true;
		document.getElementById("content").innerHTML = "<h3>Click a tab to display the course schedule for the class</h3>";
	} else {
		welcomePaneShowing = false;
	}

	var tabs = document.getElementById("tabs").getElementsByTagName("a");
	for (var i=0; i < tabs.length; i++) { 
	    var currentTab = tabs[i];
	    if (currentTab.title == selectedTab) {
	      	currentTab.className = 'active';
	    } else {
	      	currentTab.className = 'inactive';
	    }
	}

	if (selectedTab == "welcome") {
		return;
	}

	var request = createRequest();
	if (request == null) {
		console.log("createRequest() return fail!");
		return;
	}
	request.onload = showSchedule;
	request.open("get", selectedTab + ".html");
	request.send(null);
}

function showSchedule() {
	elContent = document.getElementById("content");
	elContent.innerHTML = request.responseText;
}

