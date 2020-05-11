import React from 'react'
import { Button, Input, Form, TimePicker} from 'antd';
import moment from 'moment'
import {AuthService} from './AuthService'


function SyncTime(props){

    const format = 'HH:mm';

    async function syncTime(values){
        console.log(props.match.params.bid);
        let time = values.name._d.toString().split(' ')[4].split(':')[0] + ':' + values.name._d.toString().split(' ')[4].split(':')[1];
        let url = `https://main-server-si.herokuapp.com/api/business/${props.match.params.id}/syncTime`;

        console.log(time,url, props.history.push);

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
        const data = await fetch(url,requestOptions).then(response => response.json())
        .then(result => {
            if(result.statusCode === 200){
                props.setCurrentBusiness({...props.currentBusiness,syncTime:time})
            }else
                alert("Error, synchronization failed");
            console.log(result);

        })
        // const msg =  await data.json();
        // console.log(msg);
        // return msg;
      }



    return (
  
        
        <div>
                
            <Form name="customized_form_controls" layout="inline" onFinish={syncTime} validateMessages ={ {required : 'This field is required!'}}>
                <Form.Item name="name" label="Sync time" rules={[{ required:true }]}>
                    <TimePicker defaultValue={moment('00:00', format)} format={format} />
                </Form.Item>
                <Form.Item>
                    <Button style={{marginRight:"-20px"}} type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default SyncTime