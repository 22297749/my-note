package com.zhizhentech.schoolsystem.resultSet;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
public class MyResultSet<T> {
	private Integer resultCode;//返回代码
	
	private String resultInfo;//返回的提示信息,例如用户名不存在,密码错误等
	
	private List<T> resultContent;//返回的主体数据, 比如查询的学生的信息
	
	private MyPage page;//分页信息
	
	private Map<String, Object> extra;//附加的信息,一般不用,除非上面的属性满足不了的时候才使用
	
	public MyResultSet() {
		
	}
	
	
	public MyResultSet(List<T> list) {
		this.resultContent = list;
	}
	
	public MyResultSet(T t) {
		List<T> list = new ArrayList<T>();
		list.add(t);
		this.resultContent = list;
	}
	
	public void setResultContent(T t) {
		List<T> list = new ArrayList<T>();
		list.add(t);
		this.resultContent = list;
	}
	

	public Integer getResultCode() {
		return resultCode;
	}

	public void setResultCode(Integer resultCode) {
		this.resultCode = resultCode;
	}

	public String getResultInfo() {
		return resultInfo;
	}

	public void setResultInfo(String resultInfo) {
		this.resultInfo = resultInfo;
	}

	public List<T> getResultContent() {
		return resultContent;
	}

	public void setResultContent(List<T> resultContent) {
		this.resultContent = resultContent;
	}

	public MyPage getPage() {
		return page;
	}

	public void setPage(MyPage page) {
		this.page = page;
	}

	public Map<String, Object> getExtra() {
		return extra;
	}

	public void setExtra(Map<String, Object> extra) {
		this.extra = extra;
	}

	@Override
	public String toString() {
		return "MyResultSet [resultCode=" + resultCode + ", resultInfo=" + resultInfo + ", resultContent=" + resultContent
				+ ", page=" + page + ", extra=" + extra + "]";
	}
}
