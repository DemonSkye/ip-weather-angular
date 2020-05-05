import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ip_addr: string;
  lat: string;
  long: string;
  city: string;
  temp: string;
  conditions: string;


  constructor(private _http: HttpService) { }

  ngOnInit(): void {
    try{
    this._http.get_external_ip().subscribe(response =>{
      if(response){
        this.ip_addr = response.match(/\d+\.\d+\.\d+\.\d+/g);
        this._http.get_geo(this.ip_addr).subscribe(response => {
          this.lat = response.latitude;
          this.long = response.longitude;
          if(response.city){
            this.city = response.city;
          }
          if(this.lat && this.long){
            this._http.get_weather(this.lat,this.long).subscribe(response => {
              this.temp = response.currently.temperature;
              this.conditions = response.currently.summary;
            });
          }
        });
        }
      })
    }catch(e){console.log("There was an error while trying to get data from Cloudflare -- please try again later"); this.ip_addr ="error"} 
  }
}
