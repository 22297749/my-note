/**
 * 通用方法JS
 */
$(document).ready(function() {});

/**
 * 1.获得服务器的前缀地址
 * @param {Object} myUrl API服务地址
 */
function getServerUrl(myUrl) {
	var serverUrl = serverIp + "/" + projectName + "/" + myUrl;
	return serverUrl;
}
/**
 * 2.获得系统API服务
 * @param {Object} myData json数据
 * @param {Object} myUrl 服务的地址，只是服务地址即可,前面的IP端口已通过参数指定.
 * @param {Object} suc 成功后回调的函数 为空即调用默认函数，不执行任何内容.
 */
function getServer(myData, myUrl, suc, err) {
	myUrl = getServerUrl(myUrl);
	if(suc == "") {
		suc = getServerSuc;
	}
	if(err == "") {
		err = getServerErr;
	}
	var result = $.ajax({
		type: "post",
		url: myUrl,
		async: false,
		data: myData,
		contentType: "application/json;chartset=uft-8",
		success: suc,
		error: err
	});

}

function getServerErr() {
	alert("系统错误,请联系管理员...");
	return false;
}

function getServerSuc() {

}

/**
 * 3.加载Div片段
 * @param {Object} fragmentUrl 需要加载的片段 URL
 * @param {Object} divId 指定加载的DivId
 */
function loadDivFragment(fragmentUrl, divId) {
	divId = "#" + divId;
	$(divId).load(fragmentUrl);
}
/**
 * 4.加载Div片段且调用回调函数
 * @param {Object} fragmentUrl 需要加载的片段 URL
 * @param {Object} divId 指定加载的DivId
 * @param {Object} customFunction 需要加载的回调函数
 */
function loadDivFragmentWithFunction(fragmentUrl, divId, customFunction) {
	divId = "#" + divId;
	$(divId).load(fragmentUrl, customFunction);
}
/**
 * 5.调用模态框
 * @param {Object} modalId 调用的模态框ID
 * @param {Object} modalTitle 模态框的标题字段
 * @param {Object} modalBodyUrl 模态框的BodyUrl
 * @param {Object} modalFooterUrl 模态框的FooterUrl
 */
function showModal(modalId, modalTitle, modalBodyUrl, modalFooterUrl) {
	modalId = "#" + modalId;

	$(modalId).find(".modal-title").text(modalTitle);
	$(modalId).find(".modal-body").load(modalBodyUrl);
	if(modalFooterUrl == '') {
		$(modalId).find(".modal-footer").load(default_modal_footer);
	} else {
		$(modalId).find(".modal-footer").load(modalFooterUrl);
	}
	$(modalId).modal('show');
}
/**
 * 6.重新加载模态框
 * @param {Object} fragmentUrl 模态框的Url 
 * @param {Object} divId 模态框的ID
 */
function reloadDivFragment(fragmentUrl, divId) {
	divId = "#" + divId;
	$(divId).empty();
	if(fragmentUrl != "") {
		$(divId).load(fragmentUrl);
	}
}

/**
 * 7.把表单数据转换成JSON格式的对象
 * @param {Object} formData 表单数据，通过$("表单").serializeArray()的表单数据
 */
function transformToJsonObj(formData) {
	var obj = {}
	for(var i in formData) {
		obj[formData[i].name] = formData[i]['value'];
	}
	return obj;
}

/**
 * 8.把表单数据转换成JSON格式的字符串
 * @param {Object} formData 表单数据，通过$("表单").serializeArray()的表单数据
 */
function transformToJsonString(formData) {
	var obj = {}
	for(var i in formData) {
		obj[formData[i].name] = formData[i]['value'];
	}
	var objText = JSON.stringify(obj);
	return objText;
}

/**
 * 9.直接通过表单ID获取该表单的JSON格式的字符串
 * @param {Object} formId 表单ID
 */
function transformToJsonStringByForm(formId) {
	formId = "#" + formId;
	var formData = $(formId).serializeArray();
	var jsons = transformToJsonString(formData);
	return jsons;
}
/**
 * 10.验证是否是Email
 * @param {Object} str 
 */
function isEmail(str) {
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	return reg.test(str);

}

//11.发送验证码的按钮事件

function sendMessage() {　
	curCount = count;　　 //设置button效果，开始计时 
	$("#btnSendCode").attr("disabled", "true");
	$("#btnSendCode").val(curCount + "秒后可重新发送");
	InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次 
	　　
	//请求后台发送验证码 TODO 

}

function SetRemainTime() {
	if(curCount == 0) {
		window.clearInterval(InterValObj); //停止计时器 
		$("#btnSendCode").removeAttr("disabled"); //启用按钮 
		$("#btnSendCode").val("重新发送验证码");
	} else {
		curCount--;
		$("#btnSendCode").val(curCount + "秒后可重新发送");
	}
}

//12.获得简单Modal
function showSimpleModal(modalId, modalTitle, modalBody, modalFooterUrl) {
	modalId = "#" + modalId;

	$(modalId).find(".modal-title").text(modalTitle);
	$(modalId).find(".modal-body").text(modalBody);
	if(modalFooterUrl == '') {
		$(modalId).find(".modal-footer").load(default_modal_footer);
	} else {
		$(modalId).find(".modal-footer").load(modalFooterUrl);
	}
	$(modalId).modal('show');
}

/**
 * 
 *  13. 利用bootstrap-table加载table 通过服务器...
 * @param {String} queryUrl 需要调用的URL
 * @param {String} tableId 需要初始化的TABLE ID
 * @param {Array} columns 列格式制定 
 * @param {Function} 查询参数格式化方法 此方法的参数为当前的bootstrap-table插件的 sort,offset,limit,order 四个参数
 * @param {Function} 格式化返回的数据，为了让此插件能识别 格式为: 如果分页了,则 total 数据 总条数  data 数据列表 ,如果不分页，则直接传列表即可... 这里都是JSON对象，不是JSON字符串..
 * 					
 */
function loadTable(queryUrl, tableId, columns, queryParamsFun, responseHandlerFun) {
	//获得table名称
	tableId = "#" + tableId;
	//获得服务器URL地址
	var queryUrl = getServerUrl(queryUrl);
	//初始化table

	$(tableId).bootstrapTable({
		//表格参数配置 已有默认值
		classes: 'table table-bordered', //表格的类名称。默认情况下，表格是有边框的，你可以添加 'table-no-bordered' 来删除表格的边框样式。
		striped: 'true', //设置为 true 会有隔行变色效果。
		sortOrder: "asc", //定义排序方式，'asc' 或者 'desc'。
		sortStable: false, //设置为 true 将获得稳定的排序，我们会添加\_position属性到 row 数据中。 
		iconsPrefix: "glyphicon", //定义字体库
		cache: false,
		contentType: 'application/json',
		dataType: "json",
		queryParamsType: 'limit', // 如果是空，则参数为:"sortName":"","sortOrder":"asc","pageSize":10,"pageNumber":1 如果是limit 则是sort,offset,limit,order
		//表格参数 没有默认值
		sortClass: "", //被排序的td元素的类名。
		height: "", //定义表格的高度。
		undefinedText: "", //当数据为 undefined 时显示的字符。
		sortName: "", //定义排序列，通过url方式获取数据填写字段名，否则填写下标。
		//data :"", //加载静态json数据...
		//ajax : 自定义AJAX方法 必须实现了JQUERY AJAX API
		//ajaxOptions 提交ajax请求时的附加参数，可用参数列请查看http://api.jquery.com/jQuery.ajax.
		//必须自己配置的
		columns: columns, //列格式 ，必须自己配置
		method: "POST", //服务器数据的请求方式 'get' 或 'post'。
		url: queryUrl,
		queryParams: queryParamsFun, //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果 queryParamsType = 'limit' ,返回参数必须包含
		//limit, offset, search, sort, order 否则, 需要包含:
		//pageSize, pageNumber, searchText, sortName, sortOrder.
		//返回false将会终止请求。 				
		responseHandler: responseHandlerFun,

		sidePagination: 'server',
		//显示工具
		striped: true, //是否显示行间隔色
		//关于数据
		cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		//关于插件
		pagination: true, //是否显示分页（*）
		url: queryUrl, //请求后台的URL
		method: "POST",
		pageList: [5, 10, 15, 20],
		pageSize: 5
		//toolbar : "#toolbar",

	});

}
/**
 * 14. 从JSON格式的数组对象中加载表格
 * @param {Object} tableId 表格ID
 * @param {Object} data JSON Array数据
 * @param {Object} initColumns 列初始化数组
 */
function loadSimpleTable (tableId,data,initColumns){
	//获得table名称
	tableId = "#" + tableId;
	$(tableId).bootstrapTable({
		data : data,
		columns : initColumns
	});
}
