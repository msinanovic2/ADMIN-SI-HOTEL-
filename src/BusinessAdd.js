import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'

function BusinessAdd({match}){
    const layout = {labelCol: {span: 8,},wrapperCol: {span: 16,},};
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
function onFinish (values){
    console.log(values);
    var myHeaders = new Headers();
    console.log(values)
    console.log(match.params.id)
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var raw = JSON.stringify({
        "restaurantFeature":values.restaurantFeature,
        "name":values.name,
        "merchantId":match.params.id
    });
    console.log(match.params.id);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://main-server-si.herokuapp.com/api/business", requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
        if(result.id!==undefined){
            window.location.href="/";
        }
        else{
         console.log("Error")
        }
      })
}
    return  <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}initialValues={{restaurantFeature:false}} >
 
    <Form.Item name= 'name' label="Name" rules={[{ required: true,}]}>
      <Input />
    </Form.Item>
    <Form.Item name = 'restaurantFeature' label ="Restaurant">
    <Switch defaultChecked = {false}/>
    </Form.Item>
    
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  ;
}

export default BusinessAdd