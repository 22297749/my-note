package com.zhizhentech.ar.service.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.zhizhentech.ar.tools.EmailUtils;

import io.github.biezhi.ome.SendMailException;

@Service
public class AsyncTaskService {
	@Async
	public void sendSimpleEmail(String to,String text) throws SendMailException {
		EmailUtils.defSendText(to, text);
	}
}
