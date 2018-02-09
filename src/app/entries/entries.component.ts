import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.sass']
})


export class EntriesComponent implements OnInit {
  entries: any;
  preloaderVisible:boolean = false;
  constructor(private _http: HttpClient, private route: ActivatedRoute, private location: Location) {

    console.log("anan");
  }

  getEntries(id:string) {
    this.preloaderVisible = true;
    this.entries = [];
    this._http.get("https://eksisozluk.denizer.com/topic/" + id).subscribe(data => {
      this.preloaderVisible = false;
      this.entries = data["Entries"];
      
      window.scrollTo(0, 0);


    },
      err => {
        alert("Api Unavaible. /topic")
      })
  }


  ngOnInit() {
    this.route.params.forEach(params => {
      let userId = params["title"];
      this.getEntries(userId);
    })
    const id = this.route.snapshot.paramMap.get('title');
    // console.log(id);

  }
}
