import { Component, OnInit } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { FeedService } from './feed-service.service';

// Add the RxJS Observable operators we need in this app.
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[FeedService]
})
export class AppComponent {
  private feedUrl: string = 'http%3A%2F%2Fdata.unhcr.org%2Fsyrianrefugees%2Frss%2Fregional.php%3FLang%3DEN%26Instance%3Dsyria';
  private feeds: any;
  title = 'app works!';
  tweetsdata;

  constructor(private http: Http, private feedService: FeedService){}
  makecall() {
    var headers = new Headers();

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    })
  }

  searchcall(){
    var headers = new Headers();
    var searchterm = 'query=syria';

    headers.append('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('http://localhost:3000/search', searchterm, {headers: headers}).subscribe((res) => {
      this.tweetsdata = res.json().data.statuses;
    });
  }

refreshFeed() {
    this.feedService.getFeedContent(this.feedUrl)
        .subscribe(feed => { console.log(feed['items']);this.feeds = feed['items']}, 
        error => console.log(error))
  }


  ngOnInit() {
    this.makecall();

    this.searchcall();

     this.refreshFeed();
  }


}
