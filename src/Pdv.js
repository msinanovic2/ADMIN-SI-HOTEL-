import React, {useState, useEffect} from 'react'
import {AuthService} from './AuthService'
import { Form, Input, Button, Table, InputNumber} from 'antd';


function PDV(){
	
	useEffect(()=>{
      getRates();
    },[]);
	
	const [rates, setRates] = useState([]);
	
	async function getRates(){
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		myHeaders.append("Authorization", AuthService.currentHeaderValue);
		var requestOptions = {
			method: 'GET',
			headers: myHeaders,
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/pdv`, requestOptions)
		const rates = await data.json();
		setRates(rates);
	}
	
	async function onFinishRate(values){
		var myHeaders = new Headers();
		  myHeaders.append("Content-Type", "application/json");
		  myHeaders.append("Authorization",AuthService.currentHeaderValue);
		  var requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify({pdv: values.pdv})
		};
		const data = await fetch(`https://main-server-si.herokuapp.com/api/pdv`, requestOptions)
		const rate = await data.json();
		if (rate.statusCode == 200) {
			var newRate = [];
			for (let key in rates) {
				newRate.push({"pdv": rates[key]["pdv"]});
			}
			newRate.push({"pdv": values.pdv});
			setRates([...newRate]);
			// kako update rates??
			// ne refresha se tabela
		}
		
	}	
	
	const columns = [
      {
      title: 'PDV',
      dataIndex: 'pdv',
      key: 'pdv',
	  align: "center",
      }
	]

    return (
		<div>
		  <Table  bordered columns={columns} dataSource={rates} /><br/>
		  <Form name="customized_form_controls" layout="inline" onFinish={onFinishRate} validateMessages ={ {required : 'This field is required!'}}>
			<Form.Item name="pdv" label="PDV rate" rules={[{ required:true }]}>
			  <InputNumber min ={0}></InputNumber>
			</Form.Item>
			<Form.Item>
			  <Button type="primary" htmlType="submit">
				Add PDV
			  </Button>
			</Form.Item>
		  </Form>
		</div>
	);
}

export default PDV