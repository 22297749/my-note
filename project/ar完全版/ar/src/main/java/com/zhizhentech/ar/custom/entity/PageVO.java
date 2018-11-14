package com.zhizhentech.ar.custom.entity;

import java.util.HashMap;
import java.util.Map;

import com.zhizhentech.ar.resultSet.MyPage;

public class PageVO {

	private MyPage myPage = new MyPage();
	
	private Map<String,Object> extra = new HashMap<>();

	public MyPage getMyPage() {
		return myPage;
	}

	public void setMyPage(MyPage myPage) {
		this.myPage = myPage;
	}

	public Map<String, Object> getExtra() {
		return extra;
	}

	public void setExtra(Map<String, Object> extra) {
		this.extra = extra;
	}
	
}
