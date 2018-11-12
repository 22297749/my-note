$(document).ready(function(){
	loadDivFragment("fragment/top_fragment.html","topDiv");
	loadDivFragment("fragment/bottom_fragment.html","bottomDiv");
	loadDivFragment("fragment/main_fragment.html","centerDiv");
	loadDivFragment("fragment/modal_fragment.html","modalDiv");
});
/**
 * 1.重新加载中间DIV的内容方法...
 * @param {Object} url
 */
function loadCenterDiv(url){
	reloadDivFragment(url,"centerDiv");
}