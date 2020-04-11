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
    merchant: {}
}]);

let filterBusiness = allBusiness;


async function  getAllBusiness()  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization",AuthService.currentHeaderValue);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    const data = await fetch("https://main-server-si.herokuapp.com/api/business", requestOptions)
    const allBusinessJson = await data.json();
    setAllBusiness(allBusinessJson);  
}

// PRETPOSTAVKA: Postoji ruta za promet na nivou jednog biznisa.
//NAPOMENA: bez izmjena NEĆE RADITI ako ova funkcija bude async (promet se neće prikazivati)

function  getBusinessTurnover(business, startDate, endDate)  {

    let sum = null; // empty turnover if startDate or endDate is not given

    if(startDate != null && endDate != null && startDate != "" && endDate != "") {

        /*
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", AuthService.currentHeaderValue);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        const data = await fetch("https://main-server-si.herokuapp.com/api/neka-ruta-za-promet-business/" + business.id.toString(), requestOptions);
        const turnovers = await data.json();
        */

        // sum of all cash register turnovers in all offices for given business in given period
        sum = 123;// dummy data

    }

    return sum;
}

function getTotalTurnovers(startDate, endDate)  {


    for(var i = 0; i < allBusiness.length; i++)
        filterBusiness[i].turnovers = getBusinessTurnover(allBusiness[i], startDate, endDate);

    filterBusiness = filterBusiness.filter((value, index, array) => true);

    setAllBusiness(filterBusiness);

}

function handleCalendarChange(dates, dataStrings) {

    let startDate = dataStrings[0];
    let endDate = dataStrings[1];

    console.log("start date = " + startDate + " end date = " + endDate); // dataStrings je par stringova, primjer: dataStrings[0] = "2020-04-16"
    console.log(isDateBetween(startDate, endDate, "2020-04-11"));

    getTotalTurnovers(dataStrings[0], dataStrings[1]);


}


// Ne koristi se nigdje (osim za ispis u konzoli), ali možda zatreba ako je dostupan promet za neku kasu samo za jedan konkretan datum, a ne interval datuma
function isDateBetween(startDate, endDate, date) {

    // is date between startDate and endDate
    // every parameter is a string in format: "YYYY-MM-DD" 

    let yearMonthDay = date.split('-');
    let myDate = new Date(yearMonthDay[0], yearMonthDay[1]-1, yearMonthDay[2]);

    let yearMonthDayStart = startDate.split('-');
    let myDateStart = new Date(yearMonthDayStart[0], yearMonthDayStart[1]-1, yearMonthDayStart[2]);

    let yearMonthDayEnd = endDate.split('-');
    let myDateEnd = new Date(yearMonthDayEnd[0], yearMonthDayEnd[1]-1, yearMonthDayEnd[2]);

    return myDate >= myDateStart && myDate <= myDateEnd;

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
        dataIndex: 'turnovers',
        key: 'turnover',
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
