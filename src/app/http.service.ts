import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  constructor(private http: HttpClient) { }
  get_external_ip(){
    return this.http.get("https://www.cloudflare.com/cdn-cgi/trace", {responseType:'text'});
  }

  get_geo(ip){
    return this.http.get('https://cors-anywhere.herokuapp.com/http://api.ipstack.com/'+ip+'?access_key=bc852f8b11903c41113a5ed82e7e221f')
  }

  get_weather(lat, long){
    return this.http.get('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ac5a68a7a890003220a7c12700daff79/'+lat+','+long)
  }

}
