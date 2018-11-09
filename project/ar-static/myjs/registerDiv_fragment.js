
function validateForm(formId,withVerCode){
	var sonList = $(formId).find("div.has-error");
	var size = sonList.length;
	alert(size);
	//不验证是否有验证码!!!
	if(withVerCode == 0){
		
	}
	//验证是否有验证码!!!
	else{
		
	}
	
	
}
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

function validateAccount(id){
	
	
	var account = $(id).val();
	if(account.length <= 6){
		alert("用户名长度不符合要求，请输入6位以上的用户名！");
		$(id).parent().addClass("has-error");
	}else{
		
		$(id).parent().removeClass("has-error");
		var hasAccount = validateHasAccount(account);
		
	}
	
}
function validatePassword(id){
	var password = $(id).val();
	if(password.length <= 6){
		alert("密码长度不符合要求，请输入6位以上的密码！");
		$(id).parent().addClass("has-error");
	}else{
		
		$(id).parent().removeClass("has-error");
	}
	
}
function validatePassword2(id){
	var password2 = $(id).val();
	var password = $("#password").val();
	if(password == password2){
		$(id).parent().removeClass("has-error");
	}else{
		alert("该密码与原密码不相同，请重新输入!!!");
		$(id).parent().addClass("has-error");
	}
	
}
function validateEmail(id){
	var email = $(id).val();
	var isE = isEmail(email);
	if(isE){
		
		$(id).parent().removeClass("has-error");
	}else{
		
		alert("邮箱不正确，请重新输入");
		$(id).parent().addClass("has-error");
	}
}
function isEmail(str){ 
var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
return reg.test(str); 

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
		alert("该账户已被注册!!!");
			$("#account").parent().addClass("has-error");
	}else{
			$("#account").parent().removeClass("has-error");
	}
}
