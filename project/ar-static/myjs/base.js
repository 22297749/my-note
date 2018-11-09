var serverIp = "http://192.168.0.100:8080";
var projectName = "";


var validateUserExistTag = "";

$(document).ready(function(){
 loadTopDiv();
 loadBottomDiv();
 //loadCenterDiv("fragment/main_center.html");
 loadModalDiv();
 
 //加载window对象
 
});

function loadTopDiv(){
	$("#topDiv").load("fragment/top.html");
}
function loadBottomDiv(){
	
	$("#bottomDiv").load("fragment/bottom.html");
}
/**
 * 加载main.html需要的方法
 * @param {Object} url
 */
function loadCenterDiv(url){
	$("#centerDiv").load(url);
}
function loadModalDiv(){
	$("#modalDiv").load("fragment/modal_div.html");
}

function loadLeftDiv(){
	
	$("#leftDiv").load("fragment/left.html");
}
function loadRightDiv(url){
	$("#rightDiv").load(url);
}
/**
 * 加载其他main需要的
 */
function loadCenterDivPlus(url){
	window.rightDivUrl = url;
	loadCenterDiv('fragment/second_center.html');
}
/**
 * 简单的2个按钮Modal
 * @param {Object} name
 * @param {Object} content
 */
function getSimpleTwoModal(name,content){
	$("#saveModalLabel").text(name);
	$("#saveModalBody").text(content);
	$('#saveModal').modal('show');
}

function getLoadTwoModal(name,url){
	$("#saveModalLabel").text(name);
	$("#saveModalBody").load(url);
	$('#saveModal').modal('show');
}

function getServer(myData,myUrl,suc,err){
	myUrl = getServerUrl(myUrl);
	var result = $.ajax({
		type:"post",
		url:myUrl,
		async:false,
		data:myData,
		contentType:"application/json;chartset=uft-8",
		success:suc,
		error:err
	});
	
}
function err(){
	alert("系统错误,请联系管理员...");
	return false;
}
function getServerUrl(myUrl){
	var serverUrl = serverIp+"/"+projectName+"/"+myUrl;
	return serverUrl;
}
