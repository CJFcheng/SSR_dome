
'use strict';
//由于语法不一致，导致TypeError: Cannot assign to read only property 'exports' of object '#<Object>' 
//import React from 'react';
const React =require('react') ;
 require('./s.less');
class Search extends React.Component{
    render(){
        return <div className="sid">
            程俊锋gege
        </div>
    }
}
module.exports=<Search/>;