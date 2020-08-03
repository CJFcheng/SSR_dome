if(typeof window ==='undefined'){
    global.window={};
}
var document={};
const fs=require('fs');
const path=require('path');
const template=fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8')
const express=require('express');
const {renderToString}=require('react-dom/server');
const SSR =require('../dist/index-server')
// 处理window is not defined


const server =(port)=>{
    const app=express();//实例化
    // 设置静态目录
    app.use(express.static('dist'));
    //路由
    app.get('/serch',(req,res)=>{
        
        res.status(200).send(rederMarkup(renderToString(SSR)))
    })
    // 端口监听
    app.listen(port,()=>{
        console.log("端口开启"+port);
    })

};

server(process.env.port||3000);
const rederMarkup=(str)=>{
    console.log(str);
    console.log(template);
    return template.replace('<!--cheng-->',str)
}