import { Descriptions,Badge,Table, Button } from 'antd';
import React,{useState,useEffect} from 'react'
import {AuthService} from './AuthService'
import {Link} from 'react-router-dom'


function BusinessPreview({match}){
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
    const data = await fetch("https://main-server-si.herokuapp.com/api/business/"+match.params.id, requestOptions)
    setCurrentBusiness( await data.json());
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
   //FUNCTIONS
  async function deleteCashRegister(office){
        if(office.cashRegisters.length<=0)
          return
        const Business2 = {...currentBusiness}
        const selectedOffice = Business2.offices.find((x)=>x.id == office.id)
        const cashRegisterId =  selectedOffice.cashRegisters.pop().id;
        deleteCashRegisterRequest(match.params.id,office.id,cashRegisterId);
        setCurrentBusiness(Business2);
    }


  async function addCashRegister(office){
      const Business2 = {...currentBusiness};
      const selectedOffice = Business2.offices.find((x)=>x.id == office.id)
      const idCR = addCashRegisterRequest(match.params.id,office.id) 
      selectedOffice.cashRegisters.push({id:idCR});
      setCurrentBusiness(Business2);    
  }

  async  function deleteOffice(record){

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
             return <Button type="primary" onClick={(event)=>{addCashRegister({...record})}}> 
               Add Cash Register for {record.id}
             </Button>
        }
      }, {
        title :'Delete Cash Register',
        key:'delete',
        render: (text,record)=>{
          //record je office
           return <Button type={record.cashRegisters.length >0? "primary":"disabled"} danger onClick={(event)=>{deleteCashRegister({...record})}}> 
             Delete Cash Register for {record.id}
           </Button>
        },
      },{
        title :'Delete Office',
        key:'deleteOffice',
        render: (text,record)=>{
          //record je office
           return <Button type="primary" danger  onClick={(event)=>{deleteOffice({...record})}}> 
             Delete Office {record.id}
           </Button>
        }
      },
      {
        title: 'Edit',
        key: 'Edit',
        render: (text, record) => (
          <Link key={record.merchantId} to={`/business/${match.params.id}/office/edit/`+record.id}>
           Edit {record.name}
          </Link>
        ),
      },
      {
          title: 'Details',
          key: 'Details',
          render: (text, record) => (    
            <Link to={`/business/${match.params.id}/office/details/`+record.id}>
             See {record.name}
            </Link>
          ),
        },
    ];
    return (
      <div>  
        <Descriptions title="Business Info" bordered>
          <Descriptions.Item label="Id">{currentBusiness.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{currentBusiness.name}</Descriptions.Item>
          <Descriptions.Item label="Number of Stores">{currentBusiness.offices.length}</Descriptions.Item>
          <Descriptions.Item span={2} label="Merchant">{currentBusiness.merchant.name + " "+ currentBusiness.merchant.surname}</Descriptions.Item>
          <Descriptions.Item label="restaurantFeature" span={2}>
            <Badge status={ currentBusiness.restaurantFeature?"success":"default"} text={ currentBusiness.restaurantFeature?"Yes":"No"} />
          </Descriptions.Item>
        </Descriptions>
        <h3>
          Offices
        </h3>
        <Table columns={columns} dataSource={currentBusiness.offices} />
      </div>
    )
}
export default BusinessPreview;