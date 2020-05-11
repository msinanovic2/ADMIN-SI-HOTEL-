import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'

function UserPassword(props) {
      
  const layout = {labelCol: {span: 8,},wrapperCol: {span: 16,},};
  const validateMessages = {required: 'This field is required!',types: {email: 'Not a validate email!',number: 'Not a validate number!',},number: {range: 'Must be between ${min} and ${max}',},};
    const onFinish= (values)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var raw = JSON.stringify({
        "password":values.password,
    });
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://main-server-si.herokuapp.com/api/auth/user/"+ props.match.params.id, requestOptions)
      .then(response => response.json())
      .then(result => {
          console.log(result)
        if(result.password==values.password){
            props.history.push("/");
        }else{
         console.log("Error")
        }
      })
  };



    
    return   <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    <Form.Item name="password" label="Password" rules={[{required: true,message: 'Please input your password!',},{min:6,message:"Password must be at least 6 characters"}]} hasFeedback>
      <Input.Password />
    </Form.Item>
    
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    
}
export default UserPassword;