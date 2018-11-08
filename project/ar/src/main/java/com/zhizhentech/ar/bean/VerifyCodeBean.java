package com.zhizhentech.ar.bean;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import jodd.Jodd;
/**
 * 用户验证码!!
 * @author caosong
 *
 */
public class VerifyCodeBean {

	private Map<String,Code> userVerifyCode = new HashMap<>();
	//分钟
	private long expireTimeMin = 10; 
	
	public boolean putVal(String account,String verCode) {
		long putTime = System.currentTimeMillis();
		Code code = new Code(verCode,putTime);
		userVerifyCode.put(account, code);
		return true;
	}
	public String getVal(String account) {
		if(userVerifyCode.get(account)==null) {
			return "";
		}
		long putTime = userVerifyCode.get(account).getPutTime();
		long currentTime = System.currentTimeMillis();
		long diffmin = getDatePoor(currentTime, putTime);
		if(diffmin > expireTimeMin ) {
			return "";
		}else {
			return userVerifyCode.get(account).getVerCode();
		}
		
		
	}

	private class Code {
		private String verCode;
		private long putTime;
		
		public Code(String verCode, long putTime) {
			super();
			this.verCode = verCode;
			this.putTime = putTime;
		}
		public String getVerCode() {
			return verCode;
		}
		public long getPutTime() {
			return putTime;
		}
		
	}
	public static long getDatePoor(long currentTime, long putTime) {

		long nd = 1000 * 24 * 60 * 60;

		long nh = 1000 * 60 * 60;

		long nm = 1000 * 60;

		// long ns = 1000;

		// 获得两个时间的毫秒时间差异

		long diff = currentTime - putTime;

		// 计算差多少天

		long day = diff / nd;

		// 计算差多少小时

		long hour = diff % nd / nh;

		// 计算差多少分钟

		long min = diff % nd % nh / nm;

		// 计算差多少秒//输出结果

		// long sec = diff % nd % nh % nm / ns;

		//return day + "天" + hour + "小时" + min + "分钟";
		return min;

		}
}
