import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'

function CashRegisterAdd({match}){
    const layout = {labelCol: {span: 8,},wrapperCol: {span: 16,},};
      const validateMessages = {required: 'This field is required!',
        types: {
          email: 'Not a validate email!',
          number: 'Not a validate number!',
        },
        number: {
          range: 'Must be between ${min} and ${max}',
        },
      };
      //REQUESTS
  async function addCashRegisterRequest(BusinessId,OfficeId,values){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    const raw = JSON.stringify({
        name:values.name
    })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body :raw
    };
    let idCR;
    await fetch(`https://main-server-si.herokuapp.com/api/business/${BusinessId}/offices/${OfficeId}/cashRegisters`, requestOptions).then(response => response.json())
    .then(result => 
     idCR = {...result.id}
     )
     console.log(raw);
     return idCR;
  }
    function onFinish(values){
        addCashRegisterRequest(match.params.bid,match.params.oid,values)
        window.location.href=`/business/${match.params.bid}/office/details/${match.params.oid}`;
    }

    return <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    <Form.Item name="name" label="Name" rules={[{ required: true,}]}>
      <Input />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
}
export default CashRegisterAdd