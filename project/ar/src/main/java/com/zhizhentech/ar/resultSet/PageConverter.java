package com.zhizhentech.ar.resultSet;

import org.springframework.stereotype.Repository;

import com.baomidou.mybatisplus.core.metadata.IPage;

@Repository
public class PageConverter<T> {
	public MyResultSet<T> convertPage(IPage<T> page) {
		MyResultSet<T> myResultSet = new MyResultSet<>();
		MyPage myPage = new MyPage(page.getTotal(), page.getPages(), page.getCurrent(), page.getSize());
		myResultSet.setPage(myPage);
		myResultSet.setResultContent(page.getRecords());
		return myResultSet;
	}
}
