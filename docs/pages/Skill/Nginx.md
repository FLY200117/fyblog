# Nginx

Nginx是一个高性能的HTTP和反向代理web服务器，同时也提供IMAP/POP3/SMTP服务，常用Nginx的功能有：

+ 反向代理
+ 通过配置文件可以实现集群和负载均衡
+ 静态资源虚拟化





常见的服务器有：

| 服务器名称      | 用途                        |
| --------------- | --------------------------- |
| MS IIS          | asp.net                     |
| Weblogic，Jboss | 传统行业 ERP/物流/电信/金融 |
| Tomcat，Jetty   | J2EE                        |
| Apache，Nginx   | 静态服务，反向代理          |
| Netty           | 高性能服务器编程            |



## 什么是反向代理

通常的流程是客户端请求目标服务器，然后服务器响应对应数据。这是以前不使用代理的情况。使用代理的情况有两种，一种是正向代理，另一种是反向代理

正向代理：

+ 客户端请求目标服务器之前会先请求代理服务器，然后再转发请求到目标服务器，获得内容后响应给客户端

反向代理：

+ 客户端请求目标服务器之前也会先请求代理服务器，但是此时是由代理服务器来决定请求哪个ip



它们两者的区别：正向代理是客户端的代理，服务器不知道谁是真正的请求者，而反向代理是服务器的代理，客户端不知道真正请求的服务器是哪个 





## 运行Nginx

Nginx运行环境有两种，一种是`Linux`，一种是`Win`，两种不同的版本对应不同的压缩包，需要自行去官网下载，下面展示的是以`Linux`为运行系统的例子



首先，我这里安装的是cento7的虚拟机，然后确保下载了Xshell和Xftp这两个软件来进行win和虚拟机的文件传输，当然也能用rs传输

https://www.xshell.com/zh/free-for-home-school/这个链接提供学生版的Xshell和Xftp，只需要姓名和邮箱

有了这些后去Nginx官网的Download页面中找到目前稳定的版本[Stable version](https://nginx.org/en/download.html)，将对应的压缩包通过Xshell传输到虚拟机上



### 安装依赖环境

1. 安装gcc环境
   + yum install gcc-c++
2. 安装PCRE库，用于解析正则表达式
   + yum install -y pcre pcre-devel
3. zlib压缩和解压缩依赖
   + yum install -y zlib zlib-devel
4. SSL安全的加密的套接字协议层，用于HTTP安全传输，也就是https
   + yum install -y openssl openssl-devel



### 解压编译

注意，解压后得到的是源码，源码需要编译后才能安装

+ tar -zxvf nginx-1.22.1.tar.gz

解压完后，需要先创建nginx临时目录，如果不创建，会在nginx启动的过程中报错

+ mkdir /var/temp/nginx -p

在nginx目录下输入下面命令进行配置，目的是为了创建makefile文件

```
./configure
--prefix=/usr/local/nginx \
--pid-path=/var/run/nginx/nginx.pid \
--lock-path=/var/lock/nginx.lock \
--error-log-path=/var/log/nginx/error.log \
--http-log-path-/var/log/nginx/access.log \
--with-http_gzip_static_module \
--http-client-body-temp-path=/var/temp/nginx/client \
--http-proxy-temp-path=/var/temp/nginx/proxy \
--http-fastcgi-temp-path-/var/temp/nginx/fastcgi \
--http-uwsgi-temp-path-/var/temp/nginx/uwsgi \
--http-scgi-temp-path=/var/temp/nginx/scgi 
```

| 命令                           | 解释                                 |
| ------------------------------ | ------------------------------------ |
| --prefix                       | 指定nginx安装目录                    |
| --pid-path                     | 指向nginx的pid                       |
| --lock-path                    | 锁定安装文件，防止被恶意篡改或误操作 |
| --error-log                    | 错误日志                             |
| --http-log-path                | http日志                             |
| --with-http_gzip_static_module | 启用gzp模块，在线实时压缩输出数据流  |
| --http-client-body-temp-path   | 设定客户端请求的临时目录             |
| --http-proxy-temp-path         | 设定http代理临时目录                 |
| --http-fastcgi-temp-path       | 设定fastcgill临时相录                |
| --http-uwsgi-temp-path         | 设定uwsgil临时目录                   |
| --http-scgi-temp-path          | 设定scgi临时目录                     |

创建完后makefile文件后，直接执行make进行编译，编译完后执行make install进行安装，安装完后可以使用命令whereis nginx来查看nginx的安装目录





### 启动

进入nginx的安装目录，进入sbin文件下，执行`./nignix`命令

然后需要关闭本机和虚拟机的防火墙，本机的方法就不过多讲解，主要是nginx方面，方法有很多种，可以自行去csdn上找，我用的是iptables

首先需要安装iptables-services

+ yum install iptables-services

安装完后启动iptables

+ systemctl enable iptables
+ systemctl start iptables

查看防火墙状态

+ service iptables status

关闭防火墙

+ service iptables stop

关闭之后就可以在自己的电脑上访问虚拟机ip即可看到nginx的页面了

虚拟机ip地址可以通过 `ip addr` 命令来查看

::: tips

停止:	`./nginx -s stop`

重新加载： `./nginx -s reload`

:::





## Nginx的进程模型

Nginx开启后会有两个进程，一个是master进程，为主进程，一个为worker进程，为工作进程

去使用 `ps -ef | grep nginx`命令查看进程时会发现当前有两个进程开启

想要修改worker进程数量，可以在`nginx.conf`文件中找到`worker_processer`字段后面修改进程数量，注意修改完需要重新改启动nginx

Nginx的进程模型图：

![](../../public/images/nginx)

worker进程负责客户端的连接，如果有恶意的攻击请求时，只需要关闭对应的worker即可





## Worker抢占机制

在有多个worker进程的情况下，如果只有一个要连接的客户端，此时三个进程就需要去争夺这个连接的使用权，而抢占的方式就是通过`accept_mutex`锁，通过它来获得客户端的连接，然后处理响应 

传统的服务器事件处理是client和worker一一对应的，但是如果请求发生阻塞时，就会造成卡顿，或者响应失败等问题，对此Nginx的抢占机制就很好的解决了这个问题





## nginx.conf配置结构

上面我们说过nginx.conf是nginx的配置文件，这里我们来讲讲nginx的配置结构





## nginx.pid丢失

当操作nginx发生.pid文件找不到时，这个时候的报错有两种可能，1.当前目录不存在，2.pid文件不存在，根据这两个线索去一一排除，不存在的目录或者文件只需要新建即可