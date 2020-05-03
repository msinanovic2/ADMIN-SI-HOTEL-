import React from 'react'
import { Button, Input, Form, TimePicker} from 'antd';
import moment from 'moment'
import {AuthService} from './AuthService'


function SyncTime(props){

    const format = 'HH:mm';

    async function syncTime(values){
        console.log(props.match.params.bid);
        let time = values.name._d.toString().split(' ')[4].split(':')[0] + ':' + values.name._d.toString().split(' ')[4].split(':')[1];
        let url = `https://main-server-si.herokuapp.com/api/business/${props.match.params.bid}/syncTime`;

        console.log(time,url);

        const raw = JSON.stringify({
            syncTime:time
        })
        console.log(raw);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw
        };
        const data = await fetch(url,requestOptions);
        const msg =  await data.json();
        console.log(msg);
        return msg;
      }



    return <div>
        <h2>Time synchronization</h2>      
        <Form name="customized_form_controls" layout="inline" onFinish={syncTime} validateMessages ={ {required : 'This field is required!'}}>
            <Form.Item name="name" label="Sync time" rules={[{ required:true }]}>
                <TimePicker defaultValue={moment('12:08', format)} format={format} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Sync
                </Button>
            </Form.Item>
        </Form></div>
}

export default SyncTime