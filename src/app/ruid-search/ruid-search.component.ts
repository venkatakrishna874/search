import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruid-search',
  templateUrl: './ruid-search.component.html',
  styleUrls: ['./ruid-search.component.scss']
})
export class RuidSearchComponent implements OnInit {
  constructor() {}
  ruid: string;

  ngOnInit() {}
  getRuid(ruid: string) {
    this.ruid = ruid;
  }
}
