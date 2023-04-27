import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-nointernet',
  templateUrl: './nointernet.page.html',
  styleUrls: ['./nointernet.page.scss'],
})
export class NointernetPage implements OnInit {
  public onlineOffline: boolean = navigator.onLine;

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.onlineOffline,'check internet')
    if(this.onlineOffline==false){
      this.location.back()

    }
  }
}
