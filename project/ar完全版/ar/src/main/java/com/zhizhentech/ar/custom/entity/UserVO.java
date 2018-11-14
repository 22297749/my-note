package com.zhizhentech.ar.custom.entity;

import com.zhizhentech.ar.entity.TbUser;

import lombok.Data;
@Data
public class UserVO extends TbUser{

	private String verCode;
	
}
