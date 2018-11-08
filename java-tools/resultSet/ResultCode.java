package com.zhizhentech.schoolsystem.resultSet;

/**
 * @author:Administrator
 * @description:
 * @createTime:2018年3月11日 上午8:42:55
 */
public class ResultCode {
	//
	public static final Integer SUCCESS = 200;
	
	//客户端请求造成的错误，比如密码错误，用户名不存在，权限不足，余额不足这些
	public static final Integer BAD_REQUEST = 400;
	
	//后台产生的错误，比如后台连接数据库错误
	public static final Integer INTERNAL_SERVER_ERROR = 500;
}
