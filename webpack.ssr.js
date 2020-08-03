
'use strict'

const path =require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports={
    entry:{
        index:'./src/search/index-server.js'
    },
    output:{
        path : __dirname+'/dist',
        filename: '[name]-server.js',
        libraryTarget:'umd'
    },
    mode:'production',
    module: {
        rules:[
            {
                test:/.js$/,
                use:'babel-loader'
            },{
                test:/.css$/,
                use:[
                    MiniCssExtractPlugin.loader,  //要在css前面
                    'css-loader'
                ]
            },{
                test:/.less$/,
                use:[
                    MiniCssExtractPlugin.loader,  //要在css前面
                    'css-loader',  //要在less前面
                    'less-loader',
                    {
                       loader:'postcss-loader',
                       options:{
                           plugins:()=>[
                            require("autoprefixer")({
                                overrideBrowserslist: ['> 0.15% in CN']
                              })
                            ]
                       }     
                    },
                     
                ]
            },{
                test:/.(jpg|png|jpeg)$/,
                use:'file-loader'
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[name].css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp:/\.css$/g,
            cssProcessor:require('cssnano')
        }),
        new  HtmlWebpackPlugin({
            template:path.join(__dirname,"src/search/index.html"),
            filename:'index.html',//压缩完文件名
            // chunks:['s'], //引入js文件
            inject:true,
            minify:{
                html5:true,
                collapseWhitespace:true,
                preserveLineBreaks:false,
                minifyCSS:true,
                minifyJS:true,
                removeComments:false
            }           
        }),
    ]
    
}