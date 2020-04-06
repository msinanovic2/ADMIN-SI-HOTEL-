import { Descriptions,Badge,Table, Button } from 'antd';
import React,{useState,useEffect} from 'react'
import {AuthService} from './AuthService'
import {Link} from 'react-router-dom'


function BusinessPreview(props){
    //REQUESTS
  async function addCashRegisterRequest(BusinessId,OfficeId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };
    let idCR;
    await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}/cashRegisters`, requestOptions).then(response => response.json())
    .then(result => 
     idCR = {...result.id}
     )
     return idCR;
  }


  async function  getBuisness()  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/business/"+props.match.params.id, requestOptions)
    setCurrentBusiness( await data.json());
}

  

  async function deleteOfficeRequest(BusinessId,OfficeId){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
  };
  await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}`, requestOptions)
  .then(response=>response.json()).then(record=>{
    if(record.message=="Office successfully deleted!"){
      const Business2 = {...currentBusiness}
      Business2.offices=Business2.offices.filter((value)=>
     {return value.id!=OfficeId})
      setCurrentBusiness(Business2);
    }
  })
}
   //FUNCTIONS
  async function addCashRegister(office){
      props.history.push(`/business/${props.match.params.id}/office/${office.id}/cashregister/add`);    
  }

  async  function deleteOffice(record){
        deleteOfficeRequest(props.match.params.id,record.id)
  }
  useEffect(()=>{  getBuisness(); },[]);
  const [currentBusiness,setCurrentBusiness] = useState({id:"1",name:"Test",offices :[{id:"1",address:"",phoneNumber:"",city:"",cashRegisters:[]}],restaurantFeature:false, merchant:{name:"",surname:""}});
  
  const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id', 
        render: text => <a>{text}</a>,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      }, {
        title: 'Phone Number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
          title :'City',
          dataIndex:'city',
          key:'city',
      },
      {
        title :'Number of Cash Registers',
        dataIndex:'cashRegisters',
        key:'cashRegisters',
        render: cashRegisters=>{
             return cashRegisters.length;
        }
      }, {
        title :'Add Cash Register',
        key:'addCashRegisters',
        render: (text,record)=>{
             //record je office
             return <Link  to={`/business/${props.match.params.id}/office/${record.id}/cashregister/add`}> 
               Add Cash Register
             </Link>
        }
      },
       {
        title :'See report',
        key:'report',
        render: (text,record)=>{
          //record je office
           return <Link to= {`/business/${props.match.params.id}/office/report/${record.id}`}>
             See report
           </Link>
        },
      },
      {
          title: 'Details',
          key: 'Details',
          render: (text, record) => (    
            <Link to={`/business/${props.match.params.id}/office/details/`+record.id}>
             See Office
            </Link>
          ),
        },{
          title :'Delete Office',
          key:'deleteOffice',
          render: (text,record)=>{
            //record je office
             return <Button type="primary" danger  onClick={(event)=>{deleteOffice({...record})}}> 
               Delete Office
             </Button>
          }
        },
    ];
    return (
      <div>  
        <Descriptions title="Business Info" bordered column = {1} size = {"small"}>
          <Descriptions.Item label="Id">{currentBusiness.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{currentBusiness.name}</Descriptions.Item>
          <Descriptions.Item span={2} label="Merchant">{currentBusiness.merchant.name + " "+ currentBusiness.merchant.surname}</Descriptions.Item>
          <Descriptions.Item label="restaurantFeature" span={2}>
            <Badge status={ currentBusiness.restaurantFeature?"success":"default"} text={ currentBusiness.restaurantFeature?"Yes":"No"} />
          </Descriptions.Item>
        </Descriptions>
        <br/>
        <br/>
        <h3>
          Offices
        </h3>
        <Table columns={columns} dataSource={currentBusiness.offices} bordered />
      </div>
    )
}
export default BusinessPreview;