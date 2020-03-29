import { Descriptions,Badge,Table } from 'antd';
import React,{useState,useEffect} from 'react'
import {AuthService} from './AuthService'
import {Link} from 'react-router-dom'


function OfficePreview({match}){
    useEffect(()=>{
      getOffice();
    },[]);
   const [currentOffice,setCurrentOffice] = useState(
     {id:"",
     address:"",
     phoneNumber:"",
     city:"",
     country:"",
     cashRegisters:[],
     email:"",
     manager:{
            name:"",
            surname:"",
            },

     restaurantFeature:false, merchant:{name:"",surname:""}});
   async function  getOffice()  {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/business/"+match.params.bid, requestOptions)
        const business = await data.json();
        business.offices.map((x)=>{
            if(x.id == match.params.oid)
                setCurrentOffice(x);
        })
    }
   
    return (
        <Descriptions title="Office Info" bordered>
          <Descriptions.Item label="Id">{currentOffice.id}</Descriptions.Item>
          <Descriptions.Item label="Address">{currentOffice.address}</Descriptions.Item>
          <Descriptions.Item label="City">{currentOffice.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{currentOffice.country}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{currentOffice.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentOffice.email}</Descriptions.Item>
          <Descriptions.Item label="Number of Cash Registers">{currentOffice.cashRegisters.length}</Descriptions.Item>
          <Descriptions.Item span={2} label="Manager">{`${currentOffice.manager.name} ${currentOffice.manager.surname}`}</Descriptions.Item>
        </Descriptions> 
    )
}
export default OfficePreview;