import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'
function MerchantAdd(props){
    
   
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
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var raw = JSON.stringify({
        "username":values.user.username,
        "password":values.user.password,
        "roles":[
            {"rolename":"ROLE_MERCHANT"},
            {"rolename":"ROLE_MANAGER"}
        ],
        "email":values.user.email,
        "name":values.user.name,
        "surname":values.user.surname,
        "city":values.user.city,
        "address":values.user.address,
        "country":values.user.country,
        "phoneNumber":values.user.phoneNumber
    });
    console.log(raw);
    console.log(values)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://main-server-si.herokuapp.com/api/auth/_register", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
        if(result.id!=undefined){
            props.history.push("/business/add/"+result.profile.id);
        }
        else{
         console.log("Error")
        }
      })
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item name={['user', 'username']} label="Username" rules={[{required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user',"password"]} label="Password" rules={[{required: true,message: 'Please input your password!',},{min:6,message:"Password must be at least 6 characters"}]} hasFeedback>
        <Input.Password />
      </Form.Item>
      <Form.Item name={['user', 'email']} label="Email" rules={[ { type: 'email',},{required:true}]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'surname']} label="Surname" rules={[{required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true,}]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'address']} label="Address" rules={[{required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'city']} label="City" rules={[{required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'country']} label="Country" rules={[{required: true,},]}>
        <Input />
      </Form.Item>
      <Form.Item name={['user', 'phoneNumber']} label="Phone Number" rules={[{required: true,}]}>
        <Input />
      </Form.Item>
      
      
      
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );


}

export default MerchantAdd