## Java邮件包的使用
#### 1. Jar包网址
https://github.com/biezhi/oh-my-email
#### 2. Jar包依赖
<dependency>
    <groupId>io.github.biezhi</groupId>
    <artifactId>oh-my-email</artifactId>
    <version>0.0.4</version>
</dependency>
#### 3. 注意事项
使用前必须配置 !!!!</br>
使用哪种邮箱，则需要在哪种邮箱的SMTP协议内容控制，
协议默认 由 </br>
 OhMyEmail.config(OhMyEmail.SMTP_QQ(false), "用户名", "授权码"); 配置

 此三个参数是重点 第一个参数 分为163 QQ QQ企业邮箱等，具体请看参数</br>
 第二个参数为 邮箱地址 例如 11111@qq.com
 第三个是重点，不是QQ密码，而是授权码，需要登陆QQ邮箱，然后点击左上角设置 =》 然后点击账户 开启</br>
 POP3/SMTP服务，IMAP/SMTP服务， 然后点击下面的生成授权码，第三个参数是这个授权码，而不是密码!!!
#### 4. 工具类
请见 java-tools EmialTools.java文件 1
