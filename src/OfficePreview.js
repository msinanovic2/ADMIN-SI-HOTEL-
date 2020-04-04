import { Descriptions, Badge, Table, Button } from 'antd';
import React,{useState, useEffect} from 'react'
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
	
	const dataSource = [
	  {
		key: '1',
		name: 'Mike',
		age: 32,
		address: '10 Downing Street',
	  },
	  {
		key: '2',
		name: 'John',
		age: 42,
		address: '10 Downing Street',
	  },
	];

	const columns = [
	  {
		title: 'id',
		dataIndex: 'id',
		key: 'id',
	  },
	  {
		title: 'name',
		dataIndex: 'name',
		key: 'name',
	  },
	   {
		title: 'View QR code',
        key: 'qr',
		render: (text, register)=>{
          //register je office
           return <Button type={register ? "primary":"disabled"}> 
             View QR code
           </Button>
        },
	   },
	   {
		title: 'Delete Cash Register',
        key: 'delete',
		render: (text, register)=>{
          //register je office
           return <Button type={register ? "primary":"disabled"} danger> 
             Delete Cash Register
           </Button>
        },
	   },
	];
   
    return (
		<div>
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
		
		<div>{currentOffice.cashRegisters.length > 0 ?
			<div>
				<h3>Cash Registers</h3>
				<Table columns={columns} dataSource={currentOffice.cashRegisters} pagination={false} locale={{emptyText: " ",}}/> 
			</div>
			: null}			
		</div>
		</div>
    )
}
export default OfficePreview;