$(document).ready(function(){
	loadLeftDiv();
	var url = window.rightDivUrl;
	loadRightDiv(url);
});
	
function getCourseStudents(){
	$("#selectModalLabel").text("查看课程学生列表");
	$("#selectModalBody").load("modal/course_getCourseStudents_modal.html");
	$('#selectModal').modal('show');
}

function editCourseStudents(){
	
	$("#saveModalLabel").text("查看课程学生列表");
	$("#saveModalBody").load("modal/course_editCourseStudents_modal.html");
	$('#saveModal').modal('show');
}

function delateCourseById(id){
	
	$("#saveModalLabel").text("删除该课程？");
	$("#saveModalBody").text("您确定要删除该课程吗，删除后不可恢复!!!");
	$('#saveModal').modal('show');
}

function changeFileToClazz(){
	getLoadTwoModal('分配课件','modal/courseFile_changeFileToClazz_modal.html');
}

function addNewSelectToTable(){
	var txt = '<tr><td><div class="checkbox"><label><input type="checkbox"></label></div></td><td><textarea class="form-control" cols="40" rows="3"></textarea></td><td><textarea class="form-control" cols="40" rows="3"></textarea></td><td><input type="button" class="btn btn-default" value="删除" onclick="deleteCurrentSelect(this);"/></td></tr>';
	$("#selectsTable").append(txt);
}

function deleteCurrentSelect(btn){
	
	  $(btn).parentsUntil("tbody").remove();

}

function browseCurrentSelect(){
	getLoadTwoModal('客观选择题','modal/exam_browseCurrentSelect_modal.html');
}

function createSelectQue(){
	getSimpleTwoModal('新建客观题','确定新建客观题吗？');
}

function browseCurrentSelect2(){
	getLoadTwoModal('主观题','modal/exam_browseCurrentSelect_modal2.html');
}

function createSelectQue2(){
	getSimpleTwoModal('新建主观题','确定新建主观题吗？');
}
