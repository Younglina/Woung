---
title: 微信公众号自动回复
author: Younglina
date: '2023-11-22'
categories:
 - 文档
tags:
 - 公众号
---

# 自定义微信公众号
闲来无事无事想每天给老婆推送一些天气、新闻，就想起了我那闲置的被冻结了的微信公众号，之前只是注册了，并没有深入使用它的功能，这两天稍微研究了一下，总结一下一些用法。

## 分类
微信公众号其实有三类，分别是`测试号`、`订阅号`、`服务号`。

[测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)，
无需申请公众账号、可在测试账号中体验并测试微信公众平台所有高级接口。

[订阅号](https://mp.weixin.qq.com/advanced/advanced?action=table&token=384413233&lang=zh_CN)和[服务号](https://mp.weixin.qq.com/advanced/advanced?action=table&token=384413233&lang=zh_CN)的某些接口权限使用会有不同
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700707618208_image.png)

## 发送模板消息
测试号可以直接在本地调用接口，虽然能使用所有接口，但是要看详细消息，得去关注列表里点击才能看到（我使用的时候是这样）

### 关注测试号
到[测试号](https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index)页面有个二维码，直接扫描关注，用户列表对应的微信号，就是我们到时候发消息要用的
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700723054989_image.png)

### 获取token
在发送消息之前，三种类型的号都需要获取[access_token](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html)，参数为对应的`appID`和`appsecret`。
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700718898281_image.png)
```javascript
const { appId, appSecret } = config.wechat
  let res = 
  await axios.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`
  )
  // 返回的数据格式：
  // {
  //   data: {
  //     access_token: '',
  //     expires_in: 7200
  //   }
  // }
```

### 新建模板
拿到`access_token`后，就可以去新建一个消息模板，数据的占位符格式固定为`\{\{数据.DATA\}\}`
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700718656180_image.png)

### 发送模板消息
订阅号无法开通此接口，服务号必须通过微信认证  
[官网](https://mp.weixin.qq.com/debug/cgi-bin/readtmpl?t=tmplmsg/faq_tmpl)返回的例子中还有颜色，现在设置的颜色已经不起作用了。
```javascript
  // 请求地址 参数为上面拿到的token
  const url = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`
  const message = {
    touser: '', // 关注列表里的用户微信号
    template_id: '', // 模板的ID
    data: {} // 需要发送的数据
  }

  // 这里我用的是高德的天气API，可自己免费去申请
  const {data: {forecasts}} = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=城市的code&key=自己的key&extensions=all')
  const weatherData = forecasts[0]?.casts?.[0]
  // 这里的date、weather、temp就是对应我上面的模板里的
  // {{date.DATA}} {{weather.DATA}} {{temp.DATA}}
  if(weatherData){
    const week = ['一', '二', '三', '四', '五', '六', '日']
    message.data.date = {
      value: `${weatherData.date} 星期${week[+weatherData.week - 1]}`,
    }
    message.data.weather = {
      value: `${weatherData.dayweather===weatherData.nightweather?weatherData.dayweather:`${weatherData.dayweather}转${weatherData.nightweather}`}`,
    }
    message.data.temp = {
      value: `${weatherData.nighttemp}~${weatherData.daytemp}`,
    }
  }

  // 最后直接发送post请求即可
  axios.post(url, message)
```
最后效果
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700719900612_image.png)
在我使用的过程中发现，每个数据占位的数据长度最多是20个字符，超过会显示'...'。所以如果有固定的东西，最好是写死在模板中，不要使用数据占位符返回。
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700720406222_image.png)
模板消息是我们可以自己写服务主动发送的，另外还有一种被动回复，根据用户输入，返回对应数据，这个返回的数据比较灵活，完全由自己组装，但是最大返回的长度为600个字符。

## 被动回复
具体可看[官网说明](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html)与[接入指南](https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Access_Overview.html)  
测试号与其他号一样，都需要有一个自己的服务器。但是其实是有个能正确响应微信的token验证就好。另请注意，微信公众号接口必须以http://或https://开头，分别支持80端口和443端口。
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700720693052_image.png)

看官网的验证写的那么复杂，其实如果你不是商用，对安全性不是很在乎，可以直接返回它穿过来的随机字符串就能验证成功。
```javascript
// 我用的koa，接口url随意
router.post('/weixin', (ctx)=>{
  const { echostr } = ctx.request.body
  ctx.body = echostr
})
```
验证成功以后，用户在公众号中发送的消息，都会发到这个服务的`/weixin`接口，后面写我们自己的逻辑即可。

### 被动回复天气
发送过来的消息是一个xml，所以需要有对应的xml解析，我用的`koa-xml-body`，解析后的数据格式就是一个对象
```javascript
{
  xml: {
    ToUserName: [ '' ], // 一般就是公众号的id
    FromUserName: [ '' ], // 发消息的人
    CreateTime: [ '1700654586' ],
    MsgType: [ 'text' ], // 消息类型
    Content: [ '新闻' ], // 消息内容
    MsgId: [ '24347519821909269' ]
  }
}
```

在获取到对应的`发送人`和`消息内容`以后，就可以根据类型去发送对应的消息了
```javascript
router.post('/wechat', async (ctx) =>{
    let data = ctx.request.body.xml
    const content = data.Content[0];
    let res = ''
    if(content === '天气'){
      res = await getWeather()
    }
    if(content === '新闻'){
      res = await getNews()
    }
    // toUser就是上面获取到的发送人的微信号
    // fromUser就是你的公众号
    // content 就是返回的内容，需要注意的是如果超过600就没有数据返回，所以需要做个截取，保证数据返回
    ctx.body=`
    <xml>
    <ToUserName><![CDATA[${data.FromUserName[0]}]]></ToUserName>
    <FromUserName><![CDATA[${data.ToUserName[0]}]]></FromUserName>
    <CreateTime>${new Date()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${res.slice(0,600)}]]></Content>
    </xml>`;
})
```
以上就基本能完成需要做的事了，如需要返回其他类型的消息，可到[官网](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Passive_user_reply_message.html)看看对应规则  
和模板消息的区别就是，这个是类似对话的形式
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700721801997_image.png)
![](https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/blog/1700721858549_image.png)

## 自定义菜单
上面是每次需要自己打字，那有没有简单点，点击那种常见的底部菜单，就能返回对应消息。这里我们可以自定义菜单，但需要注意的是，因为我们使用了服务返回消息，就不能在页面上自定义菜单了，只能通过接口的形式自定义了，测试号和通过微信认证的订阅号，服务号自动获得。具体可看[官网说明](https://developers.weixin.qq.com/doc/offiaccount/Custom_Menus/Creating_Custom-Defined_Menu.html)

这个可以不需要服务器，能获取到`token`，然后发送一个`get`请求就好了。
```javascript
router.get('/setMenu', async (ctx) =>{
  const access_token = await getToken()
  const res = await axios.post(`https://api.weixin.qq.com/cgi-bin/menu/create?access_token=${access_token}`, {
    "button": [
      {
        "type": "click",
        "name": "新闻",
        "key": "news"
      },
      {
        "type": "click",
        "name": "天气",
        "key": "weather"
      }
    ]
  })
  ctx.body = res.data
})
```

然后修改一下对应返回数据的逻辑即可
```javascript
router.post('/wechat', async (ctx) =>{
    console.log(ctx.request.body)
    let data = ctx.request.body.xml
    const content = data.Content?.[0]; // 输入框触发的
    const eventKey = data.EventKey?.[0] // 菜单触发的
    let res = ''
    if(content === '天气' || eventKey==='weather'){
      res = await getWeather()
    }
    if(content === '新闻' || eventKey==='news'){
      res = await getNews()
    }
    ctx.body=`
    <xml>
    <ToUserName><![CDATA[${data.FromUserName[0]}]]></ToUserName>
    <FromUserName><![CDATA[${data.ToUserName[0]}]]></FromUserName>
    <CreateTime>${new Date()}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${res.slice(0,600)}]]></Content>
    </xml>`;
})
```