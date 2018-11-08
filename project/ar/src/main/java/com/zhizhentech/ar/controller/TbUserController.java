package com.zhizhentech.ar.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhizhentech.ar.bean.VerifyCodeBean;
import com.zhizhentech.ar.entity.TbUser;
import com.zhizhentech.ar.resultSet.MyResultSet;
import com.zhizhentech.ar.service.ITbUserService;
import com.zhizhentech.ar.tools.VerifyCodeUtils;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 曹松
 * @since 2018-11-08
 */
@RestController
@RequestMapping("/ar/tb-user")
public class TbUserController extends BaseController {

	@Autowired
	private VerifyCodeBean codeService;
	@Autowired
	private ITbUserService userService;
	/**
	 * 判断用户是否存在!!!
	 * @param user
	 * @return
	 */
	@RequestMapping("/userIsExist")
	public String userIsExist(@RequestBody TbUser user) {
		String account = user.getAccount();
		QueryWrapper<TbUser> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", account);
		TbUser getUser = userService.getOne(queryWrapper);
		MyResultSet<TbUser> resultSet = new MyResultSet<>();
		Map<String, Object> extra = new HashMap<>();
		resultSet.setExtra(extra);
		if(getUser != null) {
			extra.put("exist", true);
		}else {

			extra.put("exist", false);
		}
		String result = JSON.toJSONString(resultSet);
		return result;
	}
	@RequestMapping("/sendVerificationCode")
	public String sendVerificationCode(@RequestBody TbUser user) {
		String userAccount = user.getAccount();
		String verCode = VerifyCodeUtils.generateVerifyCode(6);
		codeService.putVal(userAccount, verCode);
		System.out.println("验证码为:"+verCode);
		MyResultSet<TbUser> resultSet = new MyResultSet<>();
		Map<String, Object> extra = new HashMap<>();
		resultSet.setExtra(extra);
		extra.put("send", true);
		
		return JSON.toJSONString(resultSet);
	}
	@RequestMapping("/userRegister")
	public String userRegister(@RequestBody TbUser user) {
		String verCode = user.getVerCode();
		String getVerCode = codeService.getVal(user.getAccount());
		if(verCode.equals(getVerCode)) {
			System.out.println("验证码正确");
		}else {
			System.out.println("验证码错误");
		}
		
		return null;
	}
}
