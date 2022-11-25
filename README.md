# 产品简介
这是一套基于 uniCloud + uni-app +unimp 小程序sdk 开发的小程序开放门户，分为用户端和管理后台两个项目，本插件为用户端项目, 管理端未开源。


# 应用场景
* 宿主App构建自己的应用生态，可以面向广泛开发者，也可以定向部分开发者
* 门户App利用小程序模式对模块解耦，让不同模块的开发团队各自独立发版，灵活更新


# 产品优势
产品后台采用uniCloud admin 框架，是基于 uni-app 和 uniCloud 的应用后台管理的开源框架。开发一云多端的整套业务。并充分利用schema2code自动生成代码优势，节省降低开发成本，可以无缝支持其他的admin插件。

产品前端采用uni-App开发，实现App（iOS，Android）多平台部署运营。

#### 基于UniMP私有化小程序，企业可轻松构建App+小程序的灵活移动化架构，实现以下目标：

* 使企业现有App其获得小程序的使用体验和开发能力，满足企业新业务发展需求
* 优化集团型企业移动应用管理模式，兼顾下属单位和分/子公司业务灵活性和可控性
* 使企业获得移动应用生态化能力，将合作伙伴、上下游等直接纳入业务管理体系
* 通过转换，将微信小程序客户引流至镜像私有化小程序，增强客户服务自主性和灵活性



# 项目构成
前端基于uni-app开发，后端基于[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)开发

整个小程序管理系统，有2个项目，复用同一个uniCloud空间。一个项目是用户端，另一个项目是管理端。

本插件即为App端，面向手机用户使用，功能包括：
注册、登录、小程序列表、我的小程序、资讯、版本检查更新、切换团队、邀请成员和我的帐号管理共九大模块。

管理端,面向单位的IT管理人员、开发人员使用：企业管理，开发者/管理员管理，小程序注册管理，灰度发布，上下架审核，数据统计分析，应用管理，信息发布等。

管理端是另外插件，详见： [https://unimp.yszyun.com/admin/#/](https://unimp.yszyun.com/admin/#/)

# 整体功能列表
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_f7121d9a01e703703de99ad884a55861_r.png)

# 用户端效果图
#### 首页
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_f6d50c7365f8a7acff9de1a02db711dc_r.png)

#### 我的小程序-添加、删除
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_b4b109f44e9248c80ea0d9d16d008970_r.png)

#### 我的小程序-管理
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_9fc72dc6b99b67304fab6826e58a3b3c_r.png)

#### 资讯
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_f8ae7355cff48d64808d9d6dce3c1034_r.png)

#### 我的
![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_b6f605f1fee5ce4c2023f88519d61542_r.png)


# 产品演示
用户端安卓、ios 版本，请使用微信扫码

![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_b13149e155fa32f26fe0332f237ba474_r.png)

进入注册页面，注册账户，然后下载app 进行体验

![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_324e867f1502c8fd18da00585d2d01a1_r.png)

# 目录结构
```
├── common
│   │── uni.css                 # 公共样式
│   └── uni-icons.css           # icon样式
├── components                  # 自定义组件
├── api                          # api
├── pages                       # 页面
│   │── index                   # 首页
│   └── login                   # 登录页、注册页、忘记密码页等
│   └── my                       # 我的
│   └── consult                  # 资讯页
├── static
├── uni_modules
├── App.vue
├── main.js
├── mainfest.json
├── pages.json
└── uni.scss
```




# 用户端部署说明
* 进入manifest.json可视化重新获取appid

* 访问[优势小程序管理后台](https://unimp.yszyun.com/admin/#/pages/login/login)
注册账户------ 验证邮箱------ 登录------ 创建应用-配置上一步骤获得的appid

*  创建小程序------ 关联应用

* 将需要发布为小程序的uni-app 应用，使用HBuilderX 打包导出wgt

![](https://wiki.yszyun.com/uploads/yszyun-mp-app/images/m_db33365e3bdc0f4769dac005204fd9b9_r.png)

* 使用HBuilderx将本插件真机运行到手机

# 产品操作手册
访问 [优势小程序管理后台操作步骤 ](https://wiki.yszyun.com/docs/yszyun-mp-admin/yszyun-mp-admin-1e9d2e6p4legg) 

# 技术支持

扫码添加技术微信支持，备注说明对应的插件名称

![](https://wiki.yszyun.com/uploads/moa-admin/images/m_a3639d790e5a0b1f9d1a1dd5e695894c_r.png)

详情咨询电话： 400-008-1668
邮箱：marketing@yszyun.com