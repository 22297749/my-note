$(document).ready(function(){
 loadTopDiv();
 loadBottomDiv();
 loadCenterDiv("fragment/main_center.html");
 loadModalDiv();
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