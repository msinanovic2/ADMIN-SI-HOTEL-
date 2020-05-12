import { Descriptions, Badge, Table } from 'antd';
import React, { useState, useEffect } from 'react'
import { AuthService } from './AuthService'
import { Link } from 'react-router-dom'
import DescriptionsItem from 'antd/lib/descriptions/Item';


function OfficeReport({ match }) {
    useEffect(()=>{
        getOffice();
        getReport();
      },[]);
    const [currentOffice,setCurrentOffice] = useState({ id:"", address:"", phoneNumber:"", city:"", country:"", cashRegisters:[], email:"", manager:{name:"",surname:"",} });
    const [report,setReport] = useState({dailyProfit:"",totalProfit:""});
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
    async function getReport(){
        var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization",AuthService.currentHeaderValue);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
            };
            const data = await fetch(`https://main-server-si.herokuapp.com/api/business/offices/${match.params.oid}/cashRegisters/profit`, requestOptions)
            const cashRegisters = await data.json();
            let daily = 0;
            let totalProfit = 0;
            cashRegisters.map((x)=>{
                daily+=x.dailyProfit;
                totalProfit+=x.totalProfit;
            })
            setReport({dailyProfit:daily.toFixed(2),totalProfit:totalProfit.toFixed(2)});
    }

    return (
        <Descriptions style = {{width: "30%", position: "absolute", top: "50%", left: "50%", marginTop: "-5.5%",
        marginLeft: "-15%"}} title={`Financial Report for ${currentOffice.address}`} bordered column={1}>
          <Descriptions.Item label = "Daily Profit">{report.dailyProfit + " KM"}</Descriptions.Item>
          <Descriptions.Item label = "Total Profit">{report.totalProfit + " KM"}</Descriptions.Item>          
        </Descriptions>
    )
}
export default OfficeReport;