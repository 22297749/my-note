

function changePassword(){
	$("#saveModalLabel").text("修改密码");
	$("#saveModalBody").load("modal/main_changePassword_modal.html");
	$('#saveModal').modal('show');
}

function getCourseFile(){
	$("#selectModalLabel").text("查看课件");
	$("#selectModalBody").load("modal/main_getCourseFile_modal.html");
	$('#selectModal').modal('show');
}

function changeCourseFile(){
	
	$("#saveModalLabel").text("选择课件");
	$("#saveModalBody").load("modal/main_changeCourseFile_modal.html");
	$('#saveModal').modal('show');
}

function deleteCourseFile(id){
	
	$("#saveModalLabel").text("删除课件？");
	$("#saveModalBody").text("您确定删除课件吗？删除后不可恢复!!!");
	$('#saveModal').modal('show');
}

function getCourseState(id){
	
	$("#selectModalLabel").text("查看课程考试状态");
	$("#selectModalBody").load("modal/main_getCourseState_modal.html");
	$('#selectModal').modal('show');
}

function getAnswerLog(id){
	
	
	$("#selectModal").modal('hide');
	$("#select2ModalLabel").text("答题记录");
	$("#select2ModalBody").text("记录1：第一题错误，记录2：第二题错误");
	$('#select2Modal').modal('show');
}
function sendEmail(id){
	$("#thirdModalLabel").text("请选择发送邮件的方式");
	$("#thirdModalBody").text("全部发送：全体学生，部分发送：未完成考试的学生");
	$('#thirdModal').modal('show');
}

