package com.zhizhentech.schoolsystem.resultSet;

import lombok.Getter;
import lombok.Setter;

/*
 * createTime: 2018-1-26 17:02
 * 封装的分页类
 */
@Getter@Setter
public class MyPage {
	private Long total;//总的数据的条数
	
	private Long totalPage;//总的页数
	
	private Long currentPage;//当前页码
	
	private Long pageSize;//一页包含的数据条数
	
	public MyPage() {
		
	}

	


	public MyPage(Long total, Long totalPage, Long currentPage, Long pageSize) {
		super();
		this.total = total;
		this.totalPage = totalPage;
		this.currentPage = currentPage;
		this.pageSize = pageSize;
	}




	@Override
	public String toString() {
		return "Page [total=" + total + ", totalPage=" + totalPage + ", currentPage=" + currentPage + ", pageSize="
				+ pageSize + "]";
	}

	
}
