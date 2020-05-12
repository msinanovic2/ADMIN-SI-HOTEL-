import React from 'react'
import { Form, Input, Button ,Switch} from 'antd';
import {AuthService} from './AuthService'
import { InputNumber } from 'antd';

function CashRegisterLimit(props){
    const layout = {labelCol: {span: 15,},wrapperCol: {span: 26,},};
    function onFinish(values){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var raw = JSON.stringify({
        "max":values.maxNumber
    });
    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/offices/${props.match.params.oid}/maxCashRegisters`, requestOptions)
          .then(response => response.json())
          .then(result => {
              console.log(result)
            if(result.statusCode==200){
                props.history.push("/business/"+props.match.params.bid+"/office/details/"+props.match.params.oid);
            }
          })
    }
    return (
    <div>
    <Form {...layout} layout="inline" name="nest-messages" onFinish={onFinish} validateMessages ={ {required : 'This field is required!'}}>
    <Form.Item name="maxNumber" label="Cash Register Limit: " min={1} rules={[{required: true,}]}>
    <InputNumber min={1}/>
    </Form.Item>
    <Form.Item >
      <Button style={{marginRight:"-20%"}} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  )
}
export default CashRegisterLimit