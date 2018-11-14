
/**
 * #1.验证表单字段
 */
function validateFormData(){
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
	return errText;
}
function validateFormData2(){
	var errText = validateFormData();
	//判断昵称是否为空
	var name = 	$("#name").val();
	if(name == ""){
		errText = errText + "\n"+"昵称为空，请输入正确的昵称";
		
	}
	return errText;
}


function validateVerCode(id){
	var text = $(id).val();
	if(text.length != 6){
		return "验证码格式不正确";
	}else{
		return "";
	}
}

//#2
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
//#3
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
//#4
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
//#5
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



/**
 * 1.获取服务器的验证码
 */
function getVerCodeByServer(){
		var errText = validateFormData();
		if(errText == ""){
		var jsonData = transformToJsonStringByForm("userRegisterForm");
		getServer(jsonData,apiUrl_v1_sendVerificationCode,"","");
		alert("验证码已成功发到您的邮箱,请查看...");
		sendMessage();}else{
			alert(errText);
		}
}


//2.验证用户是否存在
function validateHasAccount(account){
	var json = {
		"account":account
	};
	json = JSON.stringify(json);
	
	getServer(json,apiUrl_v1_userIsExist,validateHasAccountSuccess,"");
}


//3.发送验证用户是否存在成功后
function validateHasAccountSuccess(data){
	data = JSON.parse(data);
	var exist = data.extra.exist;
	if(exist){
		validateUserExistTag = "该用户已注册";
	}else{
		validateUserExistTag = "";	
	}
}



//4.用户注册
function userRegister(){
	var errText = validateFormData2();
	if(errText== ""){
		var jsonData = transformToJsonStringByForm("userRegisterForm");
		getServer(jsonData,apiUrl_v2_userRegister,"","");
		alert("用户注册成功,请下载客户端进行登陆...");
		loadCenterDiv("fragment/login_fragment.html");
	}else{
		
	alert(errText);
	}
}

