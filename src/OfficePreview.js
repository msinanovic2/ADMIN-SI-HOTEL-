import { Descriptions, Badge, Table, Button, Input ,Form,Menu, Dropdown ,InputNumber} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import DescriptionsItem from 'antd/lib/descriptions/Item';

import React,{useState, useEffect} from 'react'
import {AuthService} from './AuthService'
import {Link} from 'react-router-dom'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function OfficePreview(props){
    useEffect(()=>{
      getOffice();
      getTables();
    },[]);

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    async function addCashRegisterRequest(BusinessId,OfficeId,values){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",AuthService.currentHeaderValue);
      const raw = JSON.stringify({
          name:values.name,
          uuid:values.name
      })
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body :raw
      };    
      const data =  await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}/cashRegisters`, requestOptions)
      const cashR = await data.json()
      return cashR;
    }
   const [restaurantFeature,setRestaurantFeature] = useState(false);
   const [currentOffice,setCurrentOffice] = useState({id:"",address:"",phoneNumber:"",city:"",country:"",cashRegisters:[],email:"",manager:{name:"",surname:"",},language:""});
   const [tables,setTables] = useState([]);
     
   function changeUUID(register){
     var myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
     myHeaders.append("Authorization",AuthService.currentHeaderValue);
     const raw = JSON.stringify({
         name:register.name,
         uuid:makeid(15)
     })
     var requestOptions = {
       method: 'POST',
       headers: myHeaders,
       body :raw
     };
     fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/cashRegisters/${register.id}`, requestOptions)
    }

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
        deleteCashRegisterRequest(props.match.params.bid,currentOffice.id,cashRegister.id);
        setCurrentOffice(office2);  
  }
  async function deleteTable(table){
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",AuthService.currentHeaderValue);
      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
    };
    const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/tables/${table.id}`, requestOptions)
    let tables2 = tables.filter(x=>x.tableNumber!==table.tableNumber)
    setTables(tables2);
  }
  async function  getOffice()  {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/business/"+props.match.params.bid, requestOptions)
        const business = await data.json();
        setRestaurantFeature(business.restaurantFeature);
        business.offices.map((x)=>{
            if(x.id == props.match.params.oid)
                setCurrentOffice(x);
        })
  }
  async function getTables(){

    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/tables`, requestOptions)
        const tables = await data.json();
        setTables(tables);
  }
  async function onFinishCash(valuse){
    var postojiKasaSaIstimImenom = false
    currentOffice.cashRegisters.forEach(cashRegister => {
      if(cashRegister.name === valuse.name)
        postojiKasaSaIstimImenom = true;
    });
    if(postojiKasaSaIstimImenom){
      alert("Cash Register name must be unique!");
      return;
    }
    if(currentOffice.cashRegisters.length == currentOffice.maxNumberCashRegisters){
      alert(`You already have ${currentOffice.maxNumberCashRegisters} cash registers!`);
      return;
    }
    const cashRegister = await addCashRegisterRequest(props.match.params.bid,currentOffice.id,valuse);
    const currentOffice3 = {
      ...currentOffice,
      cashRegisters: [...currentOffice.cashRegisters, cashRegister]
    };
    setCurrentOffice(currentOffice3);
  }
  async function onFinishTable(values){
    let postojiStol = false
    tables.forEach(table => {
      if(table.tableNumber == values.number)
        postojiStol = true;
    });
    if(postojiStol){
      alert("Table nubmer must be unique!");
      return;
    }
    const table =  await addTable(values,props.match.params.bid,props.match.params.oid);
    setTables([...table]);
  }
  async function addTable(values,BusinessId,OfficeId){
    var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization",AuthService.currentHeaderValue);
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({tableNumber:values.number})
    };
    const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}/tables`, requestOptions)
    const table = await data.json();
    console.log(table);
    return table;
  }
  const columnsTables = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      },
      {
      title: 'Table number',
      dataIndex: 'tableNumber',
      key: 'name',
      },{
      title: 'Delete Table',
      key: 'delete',
      render: (text, table)=>{
             return <Button type={table ? "primary":"disabled"} onClick={(event)=>{
              const check = window.confirm("Are you sure you want to permanently remove table?");
              if(check)
               deleteTable({...table})}} danger> 
               Delete Table
             </Button>
          },
       }
  ]
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
           return <Link to={`/business/${props.match.params.bid}/office/${props.match.params.oid}/cashRegister/qr/${register.id}`}>
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
	   }, {
      title: 'Change UUID',
          key: 'uuid',
      render: (text, register)=>{
             return <Button type={register ? "primary":"disabled"} onClick={(event)=>{changeUUID({...register})
             }} > 
               Change UUID
             </Button>
          },
       }
  ];
  async function changeLanguage(){
    let language = "ENGLISH"
    if(currentOffice.language =="ENGLISH"){
        language = "BOSNIAN"
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify({language:language})
  };
  const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/language`, requestOptions)
  const msg =  await data.json();
  if(msg.statusCode===200){
    setCurrentOffice({...currentOffice,language:language})

  }


    
  }
  
  const onClick = ({ key }) => {
    switch(key){
      case '1':
          changeLanguage();
          break;
      case '2':
          props.history.push(`/business/${props.match.params.bid}/office/${props.match.params.oid}/workinghour`);
          break;
      case '3' :
          props.history.push(`/business/${props.match.params.bid}/office/${props.match.params.oid}/cashregisterlimit`);
          break;

    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Change Language</Menu.Item>
      <Menu.Item key="2">Change Working Hour</Menu.Item>
      <Menu.Item key="3">Change Cash Register Limit</Menu.Item>  
    </Menu>
  );
    return (
        <Tabs className="tabs" defaultActiveKey="1" size="large" >
          <TabPane className= "tabPane" tab="Info" key="1">
            <div>
            <Descriptions  title="Office Info" bordered column ={1} >
              <Descriptions.Item label="Id">{currentOffice.id}</Descriptions.Item>
              <Descriptions.Item label="Address">{currentOffice.address}</Descriptions.Item>
              <Descriptions.Item label="City">{currentOffice.city}</Descriptions.Item>
              <Descriptions.Item label="Country">{currentOffice.country}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{currentOffice.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="Email">{currentOffice.email}</Descriptions.Item>
              <Descriptions.Item label ="Cash Register Limit">{currentOffice.maxNumberCashRegisters}</Descriptions.Item>
              <Descriptions.Item label ="Language">{currentOffice.language}</Descriptions.Item>
              <Descriptions.Item label ="Working hours">{currentOffice.workDayStart + "-" + currentOffice.workDayEnd}</Descriptions.Item>
              {currentOffice.manager.name?<Descriptions.Item span={2} label="Manager">{`${currentOffice.manager.name} ${currentOffice.manager.surname}`}</Descriptions.Item>:null} 
            </Descriptions>
            <br/>
            <br/>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  Edit Office <DownOutlined />
              </a>
            </Dropdown>
            </div>
          </TabPane>
          <TabPane className="tabPane" tab="Cash Registers"  key="2">
            <h3>Cash Registers</h3>
			      <Table  bordered columns={columns} dataSource={currentOffice.cashRegisters}  /> 
            <br/>
            <br/>
            <Form name="customized_form_controls" layout="inline" onFinish={onFinishCash} validateMessages ={ {required : 'This field is required!'}}>
              <Form.Item name="name" label="Cash register name" rules={[{ required:true }]}>
                <Input/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                Add Cash Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane className="tabPane" tab="Tables" key="3" disabled ={!restaurantFeature?true:false}>
              <h3>Tables</h3> 
              <Table  bordered columns={columnsTables} dataSource={tables}  /><br/>
              <Form name="customized_form_controls" layout="inline" onFinish={onFinishTable} validateMessages ={ {required : 'This field is required!'}}>
                <Form.Item name="number" label="Table number" rules={[{ required:true }]}>
                  <InputNumber min ={0}></InputNumber>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add Table
                  </Button>
                </Form.Item>
              </Form>
          </TabPane>
  </Tabs>
        
    
    )
}
export default OfficePreview;

