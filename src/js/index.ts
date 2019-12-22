import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"

let  WebUrl:string="https://localhost:44359/api/measurement";

interface IWeather{
    sensorName:string,
    location:string,
    time:Date,
    temperature:number,
    pressure:number,
    humidity:number    
}
let buttonelement:HTMLButtonElement = <HTMLButtonElement>document.getElementById("button1")
buttonelement.addEventListener('click',ShowData);
let gettable:HTMLTableElement=<HTMLTableElement> document.getElementById("gettable")

function ShowData():void{
    console.log("Show all the data !!")
    //Using anyanomus function with arrow sign
  axios.get<IWeather[]>(WebUrl)
  .then(function (response: AxiosResponse<IWeather[]>) {
      console.log(gettable)
      //then the get is ok
      //gettable.innerHTML = " ";
      response.data.forEach((weather: IWeather) => {
          gettable.innerHTML = gettable.innerHTML + "<tr> <td>" + weather.sensorName + "</td> <td>" + weather.location + "</td><td>" + weather.time+ "</td><td>" + weather.temperature + "</td><td>" + weather.pressure +"</td><td>" +weather.humidity +"</td></tr>"

      });

  })
    .catch(function (error: AxiosError) {
        //then the get fails
        console.log(error);
    });
}

//Delete all data from Database
    let buttonelement1:HTMLButtonElement = <HTMLButtonElement>document.getElementById("button3")
    buttonelement1.addEventListener('click',DeleteData);

    function DeleteData():void
    {
       let urlweb="https://localhost:44359/api/measurement";
        console.log("Delete All data from database");
        let idelement: HTMLInputElement = <HTMLInputElement>document.getElementById("button3");
        let id: string = idelement.value;
        //axios call
        axios.delete(urlweb)
        .then(function (response: AxiosResponse<IWeather>) {
            //then the get is ok
            document.getElementById("DeleteContent").innerHTML = "All the database data are deleted !!"


        })
        .catch(function (error: AxiosError) {
            //then the get fails
        });
    }
    interface IMeterologyData
{
    GlobalRadiation:number;
    Humidity:number;
    Recorded:Date;
    Temperature:number;
    WindDirection:number;
    WindSpeed:number;
    

}
let externalButtonElement:HTMLButtonElement= <HTMLButtonElement> document.getElementById("button2");
externalButtonElement.addEventListener('click',MeterologyData);
let myTable:HTMLTableElement=<HTMLTableElement>document.getElementById("external");

function MeterologyData():void{
    console.log("Show all the data from third party API !!")

    
   let today :Date= new Date();
  console.log(today.getUTCMonth());
   
   let todaystring:string = today.getUTCFullYear()+"-"+today.getUTCMonth()+"-"+today.getUTCDate();
  console.log(todaystring);
   
   
   
  // let ExternalUrl:string="https://envs2.au.dk/Luftdata/API/api/meteorology/copenhagen/2019-11-20/2019-11-20/";
    let ExternalUrl:string="https://envs2.au.dk/Luftdata/API/api/meteorology/copenhagen/"+todaystring+"/"+todaystring;
 

  axios.get<IMeterologyData[]>(ExternalUrl)
  .then(function (response: AxiosResponse<IMeterologyData[]>) {
      //then the get is ok
     // myTable.innerHTML = " ";
     let table=myTable.innerHTML;
      response.data.forEach((meterology: IMeterologyData) => {
         table = table + "<tr> <td>" + meterology.GlobalRadiation + "</td> <td>" + meterology.Humidity + "</td><td>" + meterology.Recorded+ "</td><td>" + meterology.Temperature + "</td><td>" + meterology.WindDirection +"</td><td>" +meterology.WindSpeed +"</td></tr>"

      });

      myTable.innerHTML=table;

  })
    .catch(function (error: AxiosError) {
        //then the get fails
        console.log(error);
    });
}
