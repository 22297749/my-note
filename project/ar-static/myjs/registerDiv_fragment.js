// 转为json数据格式
 function transformToJson(formData){
        var obj={}
        for (var i in formData) {
            /*[{"name":"user","value":"hpc"},{"name":"pwd","value":"123"},{"name":"sex","value":"M"},{"name":"age","value":"100"},{"name":"phone","value":"13011112222"},{"name":"email","value":"xxx@xxx.com"}]
            */
            //下标为的i的name做为json对象的key，下标为的i的value做为json对象的value
            obj[formData[i].name]=formData[i]['value'];
        }
        return obj;
 }
 function getJSONObjectFromForm(formId){
 	formId = "#"+formId;
	var formData = $(formId).serializeArray();
	var jsons = transformToJson(formData);
	return jsons;
 }
function getJSONStringFromForm(formId){
	
 	formId = "#"+formId;
	var formData = $(formId).serializeArray();
	var jsons = transformToJson(formData);
	jsons = JSON.stringify(jsons);
	return jsons;
}




function getVerCodeByServer(){
	var errText = "";
	validateAccount("#account");
	if(validateUserExistTag!=""){
		errText = errText + validateUserExistTag;
	}
	var pE = validatePassword("#password");
	
	var pE2 = validatePassword2("#password2");
	
	var e = validateEmail("#email");
	
	if(pE != ""){
		errText= errText+"\n"+pE;
	}
	if(pE2 != ""){
		errText = errText+"\n"+pE2;
	}
	if(e != ""){
		errText = errText+"\n"+e;
	}
	
	//判断昵称是否为空
	var name = 	$("#name").val();
	if(name == ""){
		errText = errText + "\n"+"昵称为空，请输入正确的昵称";
		
	}
	
	if(errText== ""){
		var jsonData = getJSONStringFromForm("userRegisterForm");
		getServer(jsonData,"ar/tb-user/sendVerificationCode",gvcbssuc,err);
		alert("验证码已成功发到您的邮箱,请查看...");
		sendMessage();
		
	}else{
		
	alert(errText);
	}
}
function gvcbssuc(){
	
}




//需要修改
function validateAccount(id){
	
	
	var account = $(id).val();
	if(account.length <= 6){
		
		$(id).parent().addClass("has-error");
		validateUserExistTag = "用户名不足7位!!!";
	}else{
		$(id).parent().removeClass("has-error");
		validateHasAccount(account);
	}
	
}

function validateHasAccount(account){
	var json = {
		"account":account
	};
	json = JSON.stringify(json);
	
	getServer(json,"ar/tb-user/userIsExist",validateHasAccountSuccess,err);
}



function validateHasAccountSuccess(data){
	data = JSON.parse(data);
	var exist = data.extra.exist;
	if(exist){
		validateUserExistTag = "该用户已注册";
	}else{
		validateUserExistTag = "";	
	}
	
}









function validatePassword(id){
	var password = $(id).val();
	if(password.length <= 6){
		$(id).parent().addClass("has-error");
		return "密码不足7位!!!";
	}else{
		
		$(id).parent().removeClass("has-error");
		return "";
	}
	
}
function validatePassword2(id){
	var password2 = $(id).val();
	var password = $("#password").val();
	if(password == password2){
		$(id).parent().removeClass("has-error");
		return "";
	}else{
		$(id).parent().addClass("has-error");
		return "两次输入的密码不同!!!";
	}
	
}
function validateEmail(id){
	var email = $(id).val();
	var isE = isEmail(email);
	if(isE){
		
		$(id).parent().removeClass("has-error");
		return "";
	}else{
		
		$(id).parent().addClass("has-error");
		return "邮箱格式不正确";
	}
}
function isEmail(str){ 
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
return reg.test(str); 

} 



//发送验证码的按钮事件
var InterValObj; //timer变量，控制时间 
var count = 30; //间隔函数，1秒执行 
var curCount;//当前剩余秒数 
  
function sendMessage() { 
 　curCount = count; 
　　//设置button效果，开始计时 
   $("#btnSendCode").attr("disabled", "true"); 
   $("#btnSendCode").val(curCount + "秒后可重新发送"); 
   InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
　　  
  //请求后台发送验证码 TODO 
  
} 
  
//timer处理函数 
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
    
//结束!!!


function userRegister(){
		var errText = "";
	validateAccount("#account");
	if(validateUserExistTag!=""){
		errText = errText + validateUserExistTag;
	}
	var pE = validatePassword("#password");
	
	var pE2 = validatePassword2("#password2");
	
	var e = validateEmail("#email");
	
	if(pE != ""){
		errText= errText+"\n"+pE;
	}
	if(pE2 != ""){
		errText = errText+"\n"+pE2;
	}
	if(e != ""){
		errText = errText+"\n"+e;
	}
	var verCodeErrText = validateVerCode("#verCode");
	if(verCodeErrText != ""){
		
		errText = errText+"\n"+verCodeErrText;
	}
	//判断昵称是否为空
	var name = 	$("#name").val();
	if(name == ""){
		errText = errText + "\n"+"昵称为空，请输入正确的昵称";
		
	}
	if(errText== ""){
		var jsonData = getJSONStringFromForm("userRegisterForm");
		getServer(jsonData,"ar/tb-user/userRegister",gvcbssuc,err);
		alert("用户注册成功,请下载客户端进行登陆...");
		
	}else{
		
	alert(errText);
	}
}



function validateVerCode(id){
	var text = $(id).val();
	if(text.length != 6){
		return "验证码格式不正确";
	}else{
		return "";
	}
}
