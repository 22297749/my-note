// 服务器IP地址或域名
var serverIp = "http://192.168.0.100:8080";
// 项目名称
var projectName = "";

var validateUserExistTag = "";

$(document).ready(function(){
	loadDivFragment("fragment/top.html","topDiv");
	loadDivFragment("fragment/bottom.html","bottomDiv");
	loadDivFragment("fragment/main_fragment.html","centerDiv");
	loadDivFragment("fragment/modal_div.html","modalDiv");
 
 //加载window对象
 
});
/**
 * 获得服务器的前缀地址
 * @param {Object} myUrl API服务地址
 */
function getServerUrl(myUrl){
	var serverUrl = serverIp+"/"+projectName+"/"+myUrl;
	return serverUrl;
}
/**
 * 2.获得系统API服务
 * @param {Object} myData json数据
 * @param {Object} myUrl 服务的地址，只是服务地址即可,前面的IP端口已通过参数指定.
 * @param {Object} suc 成功后回调的函数 为空即调用默认函数，不执行任何内容.
 * @param {Object} err 失败后回调的函数 为空即调用默认函数，不执行任何内容.
 */
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





/**
 * 加载Div片段
 * @param {Object} fragmentUrl 需要加载的片段 URL
 * @param {Object} divId 指定加载的DivId
 */
function loadDivFragment(fragmentUrl,divId){
	divId = "#"+divId;
	$(divId).load(fragmentUrl);
}
function loadDivFragmentWithFunction(fragmentUrl,divId,customFunction){
	divId = "#"+divId;
	$(divId).load(fragmentUrl,customFunction);
}

function showModal(modalId,modalTitle,modalBodyUrl,modalFooterUrl){
	modalId = "#"+modalId;
	
	$(modalId).find(".modal-title").text(modalTitle);
	$(modalId).find(".modal-body").load(modalBodyUrl);
	if(modalFooterUrl == ''){
		$(modalId).find(".modal-footer").load('modal/default_footer_modal.html');
	}else{
		$(modalId).find(".modal-footer").load(modalFooterUrl);
	}
	$(modalId).modal('show');
}

function reloadDivFragment(fragmentUrl,divId){
	divId = "#"+divId;
	$(divId).empty();
	if(fragmentUrl != ""){
	$(divId).load(fragmentUrl);
	}
}