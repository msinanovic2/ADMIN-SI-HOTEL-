import { Table } from 'antd';
import React, {useState,useEffect} from 'react'
import {AuthService} from './AuthService'
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;


function Turnover(){

    useEffect(() => { getAllBusiness(); }, []);

    const [allBusiness, setAllBusiness] = useState([{
        id:"",
        name:"",
        offices: [{}],
        restaurantFeature: false,
        merchant: {},
        transactions:{}
    }]);

async function  getAllBusiness()  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/business", requestOptions)
    const allBusinessJson = await data.json();
    allBusinessJson.map(x => {
        getAllTransactionsForBusiness(x)
    });
    console.log(allBusinessJson);
    setAllBusiness(allBusinessJson);
}
async function getAllTransactionsForBusiness(business){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization",AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch(`https://main-server-si.herokuapp.com/api/business/${business.id}/transactions`, requestOptions)
        const transactions = await data.json()
        business.transactions = transactions
}

function handleCalendarChange(dates, dataStrings) {

    const allBusiness2 = allBusiness.slice();

    if(dates == null || dates[0] == null || dates [1] == null) {

        allBusiness2.map((x) => {
            x.turnover = null; 
        });

    }


    else {
        
        let startDate = dates[0].toDate();
        let endDate = dates[1].toDate();
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999);

        console.log("startDate = " + startDate + ", endDate = " + endDate);


        allBusiness2.map((x) => {
            let sum = 0;
            x.transactions.map(trans =>{
                const datum = new Date(trans.timestamp);
                
                if(datum >= startDate && datum <= endDate){
                    console.log(datum)
                    console.log("uracunat")
                    sum += trans.totalPrice;
                }
            })
                sum = sum.toFixed(2);
                x.turnover = sum.toString() + " (KM)"; 
        })

    }
    
    setAllBusiness(allBusiness2)
    console.log(JSON.stringify(allBusiness));
}

const columns = [

    {
      title: 'Business Id',
      dataIndex: 'id',
      key: 'businessId'
    },  
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'businessName',
    },
    {
        title: 'Merchant',
        dataIndex: 'merchant',
        key: 'merchantName',
        render: merchant => {
            return merchant.name + " " + merchant.surname
       }
    },
    {
        title: 'Number of offices',
        dataIndex: 'offices',
        key: 'numberOffices',
        render: offices => {
            return offices.length;
       }
    },
    {
        title: 'Turnover',
        dataIndex: 'turnover',
        key: 'turnover',
        align: 'right'
    }
];


return (  

    <div>

    <h2>Business Turnovers</h2>

    <div>
        <RangePicker onCalendarChange = {(dates, dataStrings) => {handleCalendarChange(dates, dataStrings);}}/>
    </div>

    <br></br>

    <div>
        <Table columns={columns} dataSource={allBusiness}/>
    </div>

    </div>

   
)
   
    
}

export default Turnover;
