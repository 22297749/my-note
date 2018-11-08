package com.zhizhentech.ar.config;

import java.security.GeneralSecurityException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.github.biezhi.ome.OhMyEmail;

@Configuration
public class GlobalConfig {

	@Bean
	public void configEmail() throws GeneralSecurityException {
	    // 配置，一次即可
	    OhMyEmail.config(OhMyEmail.SMTP_QQ(false), "22297749@qq.com", "vtbbxsdccuxpbiib");
	}
	
}
