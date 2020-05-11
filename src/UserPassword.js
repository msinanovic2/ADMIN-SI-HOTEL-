import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'

function UserPassword(props) {
      
  const layout = {labelCol: {span: 10,},wrapperCol: {span: 26,},};
  const validateMessages = {required: 'This field is required!',types: {email: 'Not a validate email!',number: 'Not a validate number!',},number: {range: 'Must be between ${min} and ${max}',},};
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };
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



    
    return  <div style = {{width: "30%", position: "absolute", top: "50%", left: "50%", marginTop: "-8.5%",
    marginLeft: "-18%"}}>
      
      <h1 style = {{marginRight: "-15%"}}>Reset Password</h1>
      
      <br></br>
      
      <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
    
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
              min:6,message:"Password must be at least 6 characters",
            },
          ]}
          hasFeedback
        >
        <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
        <Input.Password />

        </Form.Item>

        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
        Submit
        </Button>
        </Form.Item>
      
      </Form>
    </div>
    
}
export default UserPassword;