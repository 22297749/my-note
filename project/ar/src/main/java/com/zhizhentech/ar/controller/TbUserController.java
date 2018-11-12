package com.zhizhentech.ar.controller;


import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhizhentech.ar.bean.VerifyCodeBean;
import com.zhizhentech.ar.custom.entity.UserVO;
import com.zhizhentech.ar.entity.TbLoginLog;
import com.zhizhentech.ar.entity.TbUser;
import com.zhizhentech.ar.resultSet.MyResultSet;
import com.zhizhentech.ar.service.ITbLoginLogService;
import com.zhizhentech.ar.service.ITbUserService;
import com.zhizhentech.ar.service.impl.AsyncTaskService;
import com.zhizhentech.ar.tools.EmailUtils;
import com.zhizhentech.ar.tools.VerifyCodeUtils;

import io.github.biezhi.ome.SendMailException;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 曹松
 * @since 2018-11-08
 */
@CrossOrigin
@RestController
@RequestMapping("/ar/tb-user")
public class TbUserController extends BaseController {

	@Autowired
	private VerifyCodeBean codeService;
	@Autowired
	private ITbUserService userService;
	@Autowired
	private AsyncTaskService asyncService;
	@Autowired
	private ITbLoginLogService loginLogService;
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
	/**
	 * 发送验证码!!!
	 * @param user
	 * @return
	 * @throws SendMailException 
	 */
	@RequestMapping("/sendVerificationCode")
	public String sendVerificationCode(@RequestBody TbUser user) throws SendMailException {
		String userAccount = user.getAccount();
		String verCode = VerifyCodeUtils.generateVerifyCode(6);
		codeService.putVal(userAccount, verCode);
		System.out.println("验证码为:"+verCode);
		MyResultSet<TbUser> resultSet = new MyResultSet<>();
		Map<String, Object> extra = new HashMap<>();
		resultSet.setExtra(extra);
		extra.put("send", true);
		//EmailUtils.defSendText(user.getEmail(), "虚拟拆卸系统:您的验证码为:"+verCode+",此验证码10分钟内有效!!!");
		asyncService.sendSimpleEmail(user.getEmail(), "虚拟拆卸系统:您的验证码为:"+verCode+",此验证码10分钟内有效!!!");
		return JSON.toJSONString(resultSet);
	}
	/**
	 * 用户注册!!!
	 * @param user
	 * @return
	 */
	@RequestMapping("/userRegister")
	public String userRegister(@RequestBody UserVO user) {
		String verCode = user.getVerCode();
		String getVerCode = codeService.getVal(user.getAccount());
		MyResultSet<TbUser> resultSet = new MyResultSet<>();

		Map<String, Object> map = new HashMap<>();
		resultSet.setExtra(map);
		if(verCode.equals(getVerCode)) {
			System.out.println("验证码正确");
			TbUser tbUser = user;
			
			userService.save(tbUser);

			map.put("success", true);
			resultSet.setExtra(map);
		}else {

			map.put("success", false);
			System.out.println("验证码错误");
		}
		
		return JSON.toJSONString(resultSet);
	}
	
	@RequestMapping("/userLogin")
	public String userLogin(@RequestBody TbUser user) {
		QueryWrapper<TbUser> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", user.getAccount());
		queryWrapper.eq("password", user.getPassword());
		TbUser getTbUser = userService.getOne(queryWrapper);
		MyResultSet<TbUser> resultSet = new MyResultSet<>();
		
		resultSet.setResultContent(getTbUser);
		//记录用户登陆log
		if(!Objects.isNull(getTbUser)) {
			int userId = getTbUser.getId();
			TbLoginLog log = new TbLoginLog();
			log.setUserId(userId);
			log.setLoginTime(String.valueOf(System.currentTimeMillis()));
			loginLogService.save(log);
			
		}
		return JSON.toJSONString(resultSet);
	}
	/**
	 * 密码重置
	 * @return
	 */
	@RequestMapping("/pwdForget")
	public String pwdForget(@RequestBody TbUser user) {
		String account = user.getAccount();
		String email = user.getEmail();
		QueryWrapper<TbUser> queryWrapper = new QueryWrapper<>();
		queryWrapper.eq("account", account);
		queryWrapper.eq("email", email);
		TbUser getUser = userService.getOne(queryWrapper);
		if(!Objects.isNull(getUser)) {
			String newPwd = VerifyCodeUtils.generateVerifyCode(10);
			getUser.setPassword(newPwd);
			userService.updateById(getUser);
		}
		MyResultSet<TbUser> result = new MyResultSet<>();
		result.setResultContent(getUser);
		return JSON.toJSONString(result);
	}
	
	@RequestMapping("/pwdReset")
	public String pwdReset(@RequestBody TbUser user) {
		TbUser getUser = userService.getById(user.getId());
		getUser.setPassword(user.getPassword());
		userService.updateById(getUser);
		return null;
		
	}
	
}
