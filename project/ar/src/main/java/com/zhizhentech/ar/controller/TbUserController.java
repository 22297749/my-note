package com.zhizhentech.ar.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
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
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhizhentech.ar.bean.VerifyCodeBean;
import com.zhizhentech.ar.custom.entity.PageVO;
import com.zhizhentech.ar.custom.entity.UserVO;
import com.zhizhentech.ar.entity.TbLoginLog;
import com.zhizhentech.ar.entity.TbUser;
import com.zhizhentech.ar.resultSet.MyResultSet;
import com.zhizhentech.ar.resultSet.PageConverter;
import com.zhizhentech.ar.service.ITbLoginLogService;
import com.zhizhentech.ar.service.ITbUserService;
import com.zhizhentech.ar.service.impl.AsyncTaskService;
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
			log.setLoginFlag(0);
			log.setLoginText("登入");
			String logText = getLogText(getTbUser,log);
			log.setLoginText(logText);
			loginLogService.save(log);
			
		}
		return JSON.toJSONString(resultSet);
	}
	private String getLogText(TbUser getTbUser, TbLoginLog log) {
		String account = getTbUser.getAccount();
		String userName = getTbUser.getName();
		String time ;
		Date d = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		time = sdf.format(d);
		String text = log.getLoginText();
		String result = "用户:"+account+",姓名为:"+userName+"的账户于"+time+"进行了"+text;
		return result ;
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
	@RequestMapping("/loginOut")
	public String loginOut(@RequestBody TbUser user) {
		int id = user.getId();
		TbUser getTbUser = userService.getById(id);
		if(!Objects.isNull(getTbUser)) {
			int userId = getTbUser.getId();
			TbLoginLog log = new TbLoginLog();
			log.setUserId(userId);
			log.setLoginTime(String.valueOf(System.currentTimeMillis()));
			log.setLoginFlag(1);
			log.setLoginText("登出");
			String logText = getLogText(getTbUser,log);
			log.setLoginText(logText);
			loginLogService.save(log);
			
		}
		return null;
		
	}
	
	@RequestMapping("/getUserListByPage")
	public String getUserListByPage(@RequestBody PageVO pageVO) {
		IPage<TbUser> iPage = new Page<TbUser>(pageVO.getMyPage().getCurrentPage(),pageVO.getMyPage().getPageSize());
		QueryWrapper<TbUser> queryWrapper = new QueryWrapper<>();
		
		String account = (String) pageVO.getExtra().get("account");
		String name = (String) pageVO.getExtra().get("name");
		
		if(account != null && !account.equals("")) {
		queryWrapper.eq("account", account);	
		}
if(name != null && !name.equals("")) {
			queryWrapper.eq("name", name);
		}
		iPage = userService.page(iPage, queryWrapper);
		PageConverter<TbUser> pageConverter = new PageConverter<>();
		MyResultSet<TbUser> myResult = pageConverter.convertPage(iPage);
		
		
		return JSON.toJSONString(myResult);
	}
	
}
