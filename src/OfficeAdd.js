import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'
import { TimePicker } from 'antd';

const { RangePicker } = TimePicker;
function OfficeAdd(props)
{   //REQUSET
    function addOffice(values){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var raw = JSON.stringify({
            "email":values.office.email,
            "city":values.office.city,
            "address":values.office.address,
            "country":values.office.country,
            "phoneNumber":values.office.phoneNumber,
            "workDayStart":values.office.time[0].format("kk:mm"),
            "workDayEnd":values.office.time[1].format("kk:mm")
        });
        console.log(raw);
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
            if(result.id!=undefined){
                props.history.push("/business/details/"+props.match.params.bid);
            }
          })


    }
     
const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 26,
    },
  };
  const validateMessages = {
    required: 'This field is required!',
    types: {
      email: 'Not a validate email!',
      number: 'Not a validate number!',
    },
    number: {
      range: 'Must be between ${min} and ${max}',
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
  
    const onFinish = values => {
        addOffice(values)
    };
  
    return (

    <div>

    


    <div style = {{width: "30%", position: "absolute", top: "50%", left: "50%", marginTop: "-14%", marginLeft: "-18%"}}>

    <div>
      <h1 style = {{marginRight: "-7%"}}>Office Data</h1>
    </div>

    <br></br>
      
      <Form {...layout} label="Add Office" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={['office', 'email']} label="Email" rules={[ { type: 'email',},{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item name={['office', 'address']} label="Address" rules={[{required: true,},]}>
          <Input />
        </Form.Item>
        <Form.Item name={['office', 'city']} label="City" rules={[{required: true,},]}>
          <Input />
        </Form.Item>
        <Form.Item name={['office', 'country']} label="Country" rules={[{required: true,},]}>
          <Input />
        </Form.Item>
        <Form.Item name={['office', 'phoneNumber']} label="Phone Number" rules={[{required: true,}]}>
          <Input />
        </Form.Item>
        <Form.Item name={['office', 'time']} label="Working hours" rules={[{required: true,}]}>
          <RangePicker style = {{width: "100%"}}></RangePicker>
        </Form.Item>
     
        <Form.Item {...tailLayout} >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>

    </div>  
    );




    return 
}

export default OfficeAdd