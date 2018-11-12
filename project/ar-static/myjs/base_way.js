/**
 * 通用方法JS
 */
$(document).ready(function(){
});

/**
 * 1.获得服务器的前缀地址
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
 */
function getServer(myData,myUrl,suc,err){
	myUrl = getServerUrl(myUrl);
	if(suc == ""){
		suc = getServerSuc;
	}
	if(err == ""){
		err = getServerErr;
	}
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

function getServerErr(){
	alert("系统错误,请联系管理员...");
	return false;
}
function getServerSuc(){
	
}




/**
 * 3.加载Div片段
 * @param {Object} fragmentUrl 需要加载的片段 URL
 * @param {Object} divId 指定加载的DivId
 */
function loadDivFragment(fragmentUrl,divId){
	divId = "#"+divId;
	$(divId).load(fragmentUrl);
}
/**
 * 4.加载Div片段且调用回调函数
 * @param {Object} fragmentUrl 需要加载的片段 URL
 * @param {Object} divId 指定加载的DivId
 * @param {Object} customFunction 需要加载的回调函数
 */
function loadDivFragmentWithFunction(fragmentUrl,divId,customFunction){
	divId = "#"+divId;
	$(divId).load(fragmentUrl,customFunction);
}
/**
 * 5.调用模态框
 * @param {Object} modalId 调用的模态框ID
 * @param {Object} modalTitle 模态框的标题字段
 * @param {Object} modalBodyUrl 模态框的BodyUrl
 * @param {Object} modalFooterUrl 模态框的FooterUrl
 */
function showModal(modalId,modalTitle,modalBodyUrl,modalFooterUrl){
	modalId = "#"+modalId;
	
	$(modalId).find(".modal-title").text(modalTitle);
	$(modalId).find(".modal-body").load(modalBodyUrl);
	if(modalFooterUrl == ''){
		$(modalId).find(".modal-footer").load(default_modal_footer);
	}else{
		$(modalId).find(".modal-footer").load(modalFooterUrl);
	}
	$(modalId).modal('show');
}
/**
 * 6.重新加载模态框
 * @param {Object} fragmentUrl 模态框的Url 
 * @param {Object} divId 模态框的ID
 */
function reloadDivFragment(fragmentUrl,divId){
	divId = "#"+divId;
	$(divId).empty();
	if(fragmentUrl != ""){
	$(divId).load(fragmentUrl);
	}
}

	/**
	 * 7.把表单数据转换成JSON格式的对象
	 * @param {Object} formData 表单数据，通过$("表单").serializeArray()的表单数据
	 */
 function transformToJsonObj(formData){
        var obj={}
        for (var i in formData) {
            obj[formData[i].name]=formData[i]['value'];
        }
        return obj;
 }
 
	/**
	 * 8.把表单数据转换成JSON格式的字符串
	 * @param {Object} formData 表单数据，通过$("表单").serializeArray()的表单数据
	 */
 function transformToJsonString(formData){
        var obj={}
        for (var i in formData) {
            obj[formData[i].name]=formData[i]['value'];
        }
       var objText = JSON.stringify(obj);
        return objText;
 }
 
 /**
  * 9.直接通过表单ID获取该表单的JSON格式的字符串
  * @param {Object} formId 表单ID
  */
function transformToJsonStringByForm(formId){
 	formId = "#"+formId;
	var formData = $(formId).serializeArray();
	var jsons = transformToJsonString(formData);
	return jsons;
}
/**
 * 10.验证是否是Email
 * @param {Object} str 
 */
function isEmail(str){ 
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
return reg.test(str); 

} 

//11.发送验证码的按钮事件
  
function sendMessage() { 
 　curCount = count; 
　　//设置button效果，开始计时 
   $("#btnSendCode").attr("disabled", "true"); 
   $("#btnSendCode").val(curCount + "秒后可重新发送"); 
   InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
　　  
  //请求后台发送验证码 TODO 
  
} 
function SetRemainTime() { 
      if (curCount == 0) {         
        window.clearInterval(InterValObj);//停止计时器 
        $("#btnSendCode").removeAttr("disabled");//启用按钮 
        $("#btnSendCode").val("重新发送验证码"); 
      } 
      else { 
        curCount--; 
        $("#btnSendCode").val(curCount + "秒后可重新发送"); 
      } 
    } 


//12.获得简单Modal
function showSimpleModal(modalId,modalTitle,modalBody,modalFooterUrl){
	modalId = "#"+modalId;
	
	$(modalId).find(".modal-title").text(modalTitle);
	$(modalId).find(".modal-body").text(modalBody);
	if(modalFooterUrl == ''){
		$(modalId).find(".modal-footer").load(default_modal_footer);
	}else{
		$(modalId).find(".modal-footer").load(modalFooterUrl);
	}
	$(modalId).modal('show');
}
