package com.zhizhentech.ar;

import java.security.GeneralSecurityException;

import javax.mail.MessagingException;
import javax.sql.DataSource;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import io.github.biezhi.ome.OhMyEmail;
import io.github.biezhi.ome.SendMailException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ArApplicationTests {
	@Autowired
	private DataSource dataSource;
	@Test
	public void contextLoads() {
		System.out.println(dataSource  == null);
	}

}
