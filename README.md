<h1> 优势小程序开放门户</h1>

# 产品简介
这是一套基于 uniCloud + uni-app +unimp 小程序sdk 开发的小程序开放门户，分为用户端和管理后台两个项目，本插件为用户端项目, 管理端未开源。


小程序管理平台支持多个政企实体对多个宿主应用与其关联的小程序进行统一管理，具备大规模、复杂组织机构移动化管理能力。
管理平台具备从小程序注册→配置→上架→发布→修复→更新→统计分析→下架全生命周期管理和审核功能。

# 产品操作手册
访问 [优势小程序管理后台操作步骤 ](https://www.apifox.cn/apidoc/project-1757248/doc-1529305) 


# 产品使用流程
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355396/image-preview)

# 用户端效果图
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355404/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355405/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355407/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355408/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355409/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355410/image-preview)
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355411/image-preview)

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

# 快速体验
目前只发布了安卓版本，ios 版本暂未发布
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355413/image-preview)

进入注册页面，注册账户，然后下载app 进行体验
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355415/image-preview)

# 用户端部署说明
* 进入manifest.json可视化重新获取appid

* 访问[优势小程序管理后台](https://unimp.yszyun.com/admin/#/pages/login/login)
注册账户------ 验证邮箱------ 登录------ 创建应用-配置上一步骤获得的appid

*  创建小程序------ 关联应用

* 将需要发布为小程序的uni-app 应用，使用HBuilderX 打包导出wgt
![image.png](https://api.apifox.cn/api/v1/projects/1757929/resources/355400/image-preview)

* 使用HBuilderx将本插件真机运行到手机

上传代码包---创建体验版本---扫码


扫码添加技术微信支持，备注说明对应的插件名称

![](https://wiki.yszyun.com/uploads/moa-admin/images/m_a3639d790e5a0b1f9d1a1dd5e695894c_r.png)

详情咨询电话： 400-008-1668
邮箱：marketing@yszyun.com
