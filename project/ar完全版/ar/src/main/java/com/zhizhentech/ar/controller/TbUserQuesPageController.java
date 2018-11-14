package com.zhizhentech.ar.controller;


import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zhizhentech.ar.custom.entity.PageVO;
import com.zhizhentech.ar.entity.TbUser;
import com.zhizhentech.ar.entity.TbUserQuesPage;
import com.zhizhentech.ar.entity.TbUserQuesPagePlus;
import com.zhizhentech.ar.resultSet.MyResultSet;
import com.zhizhentech.ar.resultSet.PageConverter;
import com.zhizhentech.ar.service.ITbUserQuesPagePlusService;
import com.zhizhentech.ar.service.ITbUserQuesPageService;
import com.zhizhentech.ar.service.ITbUserService;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 曹松
 * @since 2018-11-13
 */
@RestController

@CrossOrigin
@RequestMapping("/ar/tb-user-ques-page")
public class TbUserQuesPageController extends BaseController {
	@Autowired
	private ITbUserQuesPagePlusService quesPlusService;
	@Autowired
	private ITbUserQuesPageService quesService;
	@Autowired
	private ITbUserService userService;
	@RequestMapping("/saveQuesPage")
	public String saveQuesPage(@RequestBody TbUserQuesPage ques) {
		ques.setEndTime(System.currentTimeMillis());
		ques.setCountTime(ques.getEndTime()-ques.getBeginTime());
		quesService.save(ques);
		int quesId = ques.getId();
		TbUserQuesPagePlus plusQues = new TbUserQuesPagePlus();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String beginTime = sdf.format(new Date(ques.getBeginTime()));
		String endTime = sdf.format(new Date(ques.getEndTime()));
		String countTime =String.valueOf(ques.getCountTime()/60000); 
		plusQues.setBeginTime(beginTime);
		plusQues.setCountTime(countTime);
		plusQues.setEndTime(endTime);
		plusQues.setQuesId(ques.getId());
		plusQues.setQuesName(
				"汽车发动机基本知识试卷");
		plusQues.setScore(ques.getScore());
		plusQues.setUserId(ques.getUserId());
		
		TbUser user = userService.getById(ques.getUserId());
		plusQues.setUserName(user.getName());
		plusQues.setUserAccount(user.getAccount());
		quesPlusService.save(plusQues);
		return null;
	}
	
	@RequestMapping("/getQuesPageList")
	public String getQuesPageList(@RequestBody PageVO pageVO) {
		IPage<TbUserQuesPagePlus> iPage = new Page<TbUserQuesPagePlus>(pageVO.getMyPage().getCurrentPage(),pageVO.getMyPage().getPageSize());
		QueryWrapper<TbUserQuesPagePlus> queryWrapper = new QueryWrapper<>();
		
		iPage = quesPlusService.page(iPage, queryWrapper);
		
		
	PageConverter<TbUserQuesPagePlus> conv = new PageConverter<>();
	MyResultSet<TbUserQuesPagePlus> result = conv.convertPage(iPage);
		return JSON.toJSONString(result);
	}

	
	@RequestMapping("/getPageById")
	public String getPageById(@RequestBody TbUserQuesPage ques) {
		int id = ques.getId();
		ques = quesService.getById(id);
		MyResultSet<TbUserQuesPage> result = new MyResultSet<>();
		result.setResultContent(ques);
		return JSON.toJSONString(result);
		
		
	}
//	private List<TbUserQuesPagePlus> getQuesPlusList(List<TbUserQuesPage> quesList, List<TbUser> userList) {
//		int index = 0;
//		List<TbUserQuesPagePlus> plusList = new ArrayList<TbUserQuesPagePlus>(quesList.size());
//		quesList.forEach(new Consumer<TbUserQuesPage>() {
//
//			@Override
//			public void accept(TbUserQuesPage t) {
//				TbUserQuesPagePlus plus = new TbUserQuesPagePlus();
//				plusList.add(plus);
//				
//			}
//		});
//		return plusList;
//	}
	
}
