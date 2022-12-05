import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  public load: boolean;

  constructor( ) {
    setTimeout(() => {
      this.load = true
    ,1000});
   }

  ngOnInit(): void {
  }

}
