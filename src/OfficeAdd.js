import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'

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
            "phoneNumber":values.office.phoneNumber
        });
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
      span: 8,
    },
    wrapperCol: {
      span: 16,
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
  
    const onFinish = values => {
        addOffice(values)
    };
  
    return (
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
        
        
        
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );




    return 
}

export default OfficeAdd