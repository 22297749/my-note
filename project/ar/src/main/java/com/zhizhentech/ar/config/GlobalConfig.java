package com.zhizhentech.ar.config;

import java.security.GeneralSecurityException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.zhizhentech.ar.bean.VerifyCodeBean;

import io.github.biezhi.ome.OhMyEmail;

@Configuration
public class GlobalConfig {
	/**
	 * 配置Email
	 * @throws GeneralSecurityException
	 */
	@Bean
	public void configEmail() throws GeneralSecurityException {
	    // 配置，一次即可
	    OhMyEmail.config(OhMyEmail.SMTP_QQ(false), "22297749@qq.com", "vtbbxsdccuxpbiib");
	}
	/**
	 * 配置mybatis-plus分页
	 * @return
	 */
	@Bean
	  public PaginationInterceptor paginationInterceptor() {
	      PaginationInterceptor page = new PaginationInterceptor();
	      page.setDialectType("mysql");
	      return page;
	  }
	/**
	 * 配置Email初始化
	 * @return
	 */
	@Bean 
	public VerifyCodeBean verifyCodeBean() {
		return new VerifyCodeBean();
		
	}
	
}
