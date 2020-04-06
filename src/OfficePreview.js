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
   

    async function deleteCashRegisterRequest(BusinessId,OfficeId,CashRegisterId){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",AuthService.currentHeaderValue);
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
      };
      const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}/cashRegisters/${CashRegisterId}`, requestOptions)
      return data;
    }

  async function deleteCashRegister(cashRegister){
        const office2 = {...currentOffice}
        office2.cashRegisters = office2.cashRegisters.filter(x=>x.id!= cashRegister.id)
        deleteCashRegisterRequest(match.params.bid,currentOffice.id,cashRegister.id);
        setCurrentOffice(office2);  
  }
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
           return <Link >
              View QR Code
           </Link>
        },
	   },
	   {
		title: 'Delete Cash Register',
        key: 'delete',
		render: (text, register)=>{
           return <Button type={register ? "primary":"disabled"} onClick={(event)=>{
            const check = window.confirm("Are you sure you want to permanently remove cash register?");
            if(check)
             deleteCashRegister({...register})}} danger> 
             Delete Cash Register
           </Button>
        },
	   },
	];
   
    return (
		<div>
        <Descriptions title="Office Info" bordered column ={1} size ={"small"}>
          <Descriptions.Item label="Id">{currentOffice.id}</Descriptions.Item>
          <Descriptions.Item label="Address">{currentOffice.address}</Descriptions.Item>
          <Descriptions.Item label="City">{currentOffice.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{currentOffice.country}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{currentOffice.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Email">{currentOffice.email}</Descriptions.Item>
          {currentOffice.manager.name?<Descriptions.Item span={2} label="Manager">{`${currentOffice.manager.name} ${currentOffice.manager.surname}`}</Descriptions.Item>:null} 
        </Descriptions>
      <br/>
      <br/>
		{/* <div>{currentOffice.cashRegisters.length > 0 ?
			<div> */}
				<h3>Cash Registers</h3>
				<Table bordered columns={columns} dataSource={currentOffice.cashRegisters} pagination={false} locale={{emptyText: "No Cash Registers",}}/> 
			{/* </div>
			: null}			
		</div> */}
		</div>
    )
}
export default OfficePreview;