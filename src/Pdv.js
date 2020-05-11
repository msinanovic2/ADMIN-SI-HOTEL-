import React, {useState, useEffect} from 'react'
import {AuthService} from './AuthService'
import { Badge, Button, Form, Input, InputNumber, Table} from 'antd';
import { EditOutlined } from '@ant-design/icons';


function PDV(){
	
	useEffect(()=>{
      getRates();
    },[]);
	
	const [rates, setRates] = useState([]);
	
	function rateOrder(r1, r2) {
		return ((((r1.active && r2.active) || !(r1.active || r2.active)) && r1.pdv <= r2.pdv)
			|| (r1.active && !r2.active)) ? -1 : 1;
	}
	
	async function getRates(){
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", AuthService.currentHeaderValue);
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/pdv`, requestOptions);
		var rates = await data.json();
		rates.sort(rateOrder);
		setRates(rates);
	}
	
	async function onFinishRate(values){
		var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
		  myHeaders.append("Authorization",AuthService.currentHeaderValue);
		  var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({pdv: values.pdv, active: values.active})
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/pdv`, requestOptions)
		const dataJson = await data.json();
		if (dataJson.statusCode == 200) {
			var newRate = [];
			for (let key in rates) {
				newRate.push(rates[key]);
			}
			newRate.push({"pdv": values.pdv, "active": values.active});
			setRates([...newRate]);
		}
		
	}
	
	async function switchActiveStatus(pdv) {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", AuthService.currentHeaderValue);
		var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({pdv: pdv})
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/pdv/switch`, requestOptions);
		const dataJson = await data.json();
		if (dataJson.statusCode == 200) {
			var newRates = rates.slice();
			for (let key in newRates) {
				if (newRates[key].pdv == pdv) {
					newRates[key].active = !newRates[key].active;
					setRates(newRates);
					break;					
				}
			}
		}
	}
	
	
	const columns = [
		{
			title: 'PDV',
			dataIndex: 'pdv',
			key: 'pdv',
			align: "center",
		},
		{
			title: 'Active',
			key: 'active',
			render: (text, record) => {
				return (<div>
					<Badge status={ record.active ? "success" : "default"} text={ record.active ? "Yes  " : "No  "} />
					<span> </span>
					<EditOutlined onClick= {(event)=> switchActiveStatus(record.pdv)}/>
				</div>
				)
			},
			align: "center",
		},
	]

    return (
		<div>
		  <Table  bordered columns={columns} dataSource={rates} /><br/>
		  <Form name="customized_form_controls" layout="inline" onFinish={onFinishRate} validateMessages ={ {required : 'This field is required!'}}>
			<Form.Item name="pdv" label="PDV amount" rules={[{ required:true }]}>
			  <InputNumber min ={0}></InputNumber>
			</Form.Item>
			<Form.Item>
			  <Button type="primary" htmlType="submit">
				Add PDV
			  </Button><br/><br/>
			</Form.Item>
		  </Form>
		</div>
	);
}

export default PDV