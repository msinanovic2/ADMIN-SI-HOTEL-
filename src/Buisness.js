import React, { useState,useEffect } from 'react'
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import {AuthService} from './AuthService'

function Business (){
  
  useEffect(()=>{
    getAllBuisness();
  },[]);

  const [allBusiness,setBusiness] = useState([]);
    
  async function getAllBuisness(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/business", requestOptions);
    setBusiness( await data.json());
    console.log(allBusiness);
  }
    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id', 
          render: text => <a>{text}</a>,
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title :'Reservations',
            dataIndex:'restaurantFeature',
            key:'restaurantFeature',
            render: reserv=>{
                 return reserv? "Yes":"No"
            }
        },
        {
          title :'Number Of Offices',
          dataIndex:'offices',
          key:'offices',
          render: offices=>{
               return offices.length;
          }
        },
        {
          title: 'Edit',
          key: 'Edit',
          render: (text, record) => (
            <Link key={record.merchantId} to={"/business/edit/"+record.id}>
             Edit {record.name}
            </Link>
          ),
        },
        {
            title: 'Details',
            key: 'Details',
            render: (text, record) => (
              <Link to={"/business/details/"+record.id}>
               See {record.name}
              </Link>
            ),
          },
      ];
      
      return (  <div>
              <h2>Business Table</h2>
              <Table columns={columns} dataSource={allBusiness} />
              </div>
      )
}
export default Business;