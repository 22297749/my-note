package com.zhizhentech.ar.tools;

import java.io.File;
import java.net.URL;

import javax.mail.MessagingException;

import io.github.biezhi.ome.OhMyEmail;
import io.github.biezhi.ome.SendMailException;

public class EmailTools {
	
	public static String defSubject = "虚拟拆卸系统";
	
	public static String defFrom = "清华大学";
	
	public static void defSendText(String to,String text) throws SendMailException {
		   OhMyEmail.subject(defSubject)
           .from(defFrom)
           .to(to)
           .text(text)
           .send();
	}
	
	public static void sendText(String subject,String from,String to,String text) throws MessagingException, SendMailException {
	    OhMyEmail.subject(subject)
	            .from(from)
	            .to(to)
	            .text(text)
	            .send();
	}

	public static void sendHtml(String subject,String from,String to,String html) throws MessagingException, SendMailException {
		OhMyEmail.subject(subject)
        .from(from)
        .to(to)
        .text(html)
        .send();
	}

	public static void sendAttach(String subject,String from,String to,String text,File file,String fileName) throws MessagingException, SendMailException {
	   
		OhMyEmail.subject(subject)
        .from(from)
        .to(to)
        .text(text)
        .attach(file, fileName)
        .send();
	    
	}

	public static void sendAttachURL(String subject,String from,String to,String html,URL attachUrl,String attachUrlName) throws MessagingException, SendMailException {
	    OhMyEmail.subject(subject)
		        .from(from)
		        .to(to)
		        .html(html)
		        .attachURL(attachUrl, attachUrlName)
		        .send();
	}
}
