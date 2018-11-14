/**
 * 通用值JS文件，与通用方法匹配使用...
 */

// 服务器IP地址及端口号或域名
var serverIp = "http://192.168.0.100:50000";
// 项目名称
var projectName = "ar-demo";
// 默认调用的模态框的Footer地址
var default_modal_footer = "modal/default_footer_modal.html";



//发送验证码全局变量
var InterValObj; //timer变量，控制时间 
var count = 30; //间隔函数，1秒执行 
var curCount;//当前剩余秒数 