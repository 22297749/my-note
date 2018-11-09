package com.zhizhentech.ar;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.baomidou.mybatisplus.core.config.GlobalConfig;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.zhizhentech.ar.bean.VerifyCodeBean;

@SpringBootApplication
@CrossOrigin
@MapperScan("com.zhizhentech.ar.mapper")
@Import(value = { GlobalConfig.class })
public class ArApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArApplication.class, args);
	}

}
