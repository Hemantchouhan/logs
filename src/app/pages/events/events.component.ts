import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  error: string;
  loading: boolean;
  events;
  countView:boolean = false;

  constructor(   private dataService: DataService) { }

  ngOnInit() {
    this.loadAll();
  }

  show(type : string){
    if(type === 'count'){
      this.countView = true;
      this.loadCount();
    } else if(type === 'all'){
      this.countView = false;
      this.loadAll();
    }
  }

  loadAll(){
    this.dataService.get().subscribe(
      data => {
        this.events = JSON.parse(data);
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }

  loadCount(){
    this.dataService.get().subscribe(
      data => {
        this.events = this.getDataWithCount(JSON.parse(data));
      },
      error => {
          this.error = error;
          this.loading = false;
      });
  }
  
  getDataWithCount(event){
    var self = this;
    var hash = Object.create(null),grouped = [];
    event.forEach(function (a) {
        var key = self.convertToHour(a.timestamp);
        if (!hash[key]) {
            hash[key] = { duration: 0, time: key + ':00' };
            a.key = key;
            grouped.push(a);
        }
        hash[key].duration++;        
    });
    var sortedEvents = [];
    var count = 0;
    for (var property in hash) {
     const item = grouped.find((b) => b.key == property);
     item.count = hash[property].duration;
     if(count === 0 && item.type === 'logout'){
        item.count++;
     }
     sortedEvents.push(item);
     count++;
    }
     return sortedEvents;
  }

  convertToHour(t){
    const dt = new Date(t);
    const hr = dt.getUTCHours();
    return hr;
  }

}
