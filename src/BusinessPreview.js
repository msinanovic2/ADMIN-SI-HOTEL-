import { Descriptions,Badge,Table, Button ,Menu, Dropdown} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React,{useState,useEffect} from 'react'
import {AuthService} from './AuthService'
import {Link} from 'react-router-dom'
import DescriptionsItem from 'antd/lib/descriptions/Item';


function BusinessPreview(props){
  useEffect(()=>{  getBuisness(); },[]);
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
function changeRestaurant(business) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", AuthService.currentHeaderValue);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
  };
  fetch(`https://main-server-si.herokuapp.com/api/business/${business.id}/restaurant`, requestOptions);
  let changedBusiness = {...business}
  changedBusiness .restaurantFeature = !changedBusiness.restaurantFeature;
  setCurrentBusiness(changedBusiness);
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
 async  function deleteOffice(record){
        deleteOfficeRequest(props.match.params.id,record.id)
}  
const [currentBusiness,setCurrentBusiness] = useState({id:"1",name:"Test",offices :[{id:"1",address:"",phoneNumber:"",city:"",cashRegisters:[]}],restaurantFeature:false, merchant:{name:"",surname:""},syncTime:"",maxNumberOffices:""  });

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
             return <Button type="primary" danger  onClick={(event)=>{
              const check = window.confirm("Are you sure you want to permanently remove Office?");
              if(check)
               deleteOffice({...record})}}> 
               Delete Office
             </Button>
          }
        },
];
const onClick = ({ key }) => {
  switch(key){
    case '1':
        changeRestaurant(currentBusiness);
        break;
    case '2':
        props.history.push(`/business/${props.match.params.id}/synctime`);
        break;
    case '3' :
        props.history.push(`/business/${props.match.params.id}/officelimit`);
        break;
    case '4':
        props.history.push(`/business/${props.match.params.id}/reservations`);
        break;
  }
};
const menu = (
  <Menu onClick={onClick}>
    <Menu.Item key="1">Change Restaurant Feature</Menu.Item>
    <Menu.Item key="2">Change Sync Time</Menu.Item>
    <Menu.Item key="3">Change Office Limit</Menu.Item>  
    <Menu.Item disabled = {!currentBusiness.restaurantFeature} key="4">Change Reservation Duration</Menu.Item>
  </Menu>
);

    return (
      <div>  
        <Descriptions title="Business Info" bordered column = {1} size = {"small"}>
          <Descriptions.Item label="Id">{currentBusiness.id}</Descriptions.Item>
          <Descriptions.Item label="Name">{currentBusiness.name}</Descriptions.Item>
          <Descriptions.Item span={2} label="Merchant">{currentBusiness.merchant.name + " "+ currentBusiness.merchant.surname}</Descriptions.Item>
          <Descriptions.Item label="Restaurant Feature" span={2} onClick= {(event)=> changeRestaurant(currentBusiness)}>
            <Badge status={ currentBusiness.restaurantFeature?"success":"default"} text={ currentBusiness.restaurantFeature?"Yes":"No"} />
          </Descriptions.Item>
          <DescriptionsItem label ="Sync time" > {currentBusiness.syncTime}</DescriptionsItem>
          <DescriptionsItem label = "Office Limit"> {currentBusiness.maxNumberOffices} </DescriptionsItem>
          { currentBusiness.restaurantFeature ? <DescriptionsItem label = "Reservation Time">{currentBusiness.duration}</DescriptionsItem>:null}
        </Descriptions>
        <br/>
        <br/>
        <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Edit Business <DownOutlined />
            </a>
        </Dropdown>
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