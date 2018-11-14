
function loadTopRight(loginSuc){
	$("#uInfoDiv").empty();
	if(loginSuc){
		
		loadDivFragmentWithFunction("fragment/top_right_suc_fragment.html","uInfoDiv",loginSucBack);
		loadCenterDiv("fragment/main_fragment.html");
		
	}else{
		reloadDivFragment("fragment/top_right_fragment.html","uInfoDiv");
	}
}
function loginSucBack(){
	var userName = userInfo.name;
	$("#uuName").text(userName);
}

function unLogin(){
	loadTopRight(false);
	loadCenterDiv("fragment/main_fragment.html");
	userInfo = "";
}

function changePwd(){
	loadCenterDiv("fragment/pwdReset_fragment.html");
}
