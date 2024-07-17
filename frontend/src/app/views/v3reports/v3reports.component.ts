import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './v3reports.component.html',
  styleUrls: ['./v3reports.component.css'],
})
export class V3ReportsComponent {
  monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentMonth: number = new Date().getMonth() + 1;
  last1Month: number = this.currentMonth - 1;
  last2Month: number = this.currentMonth - 2;

  charMon = this.monthNames[this.currentMonth - 1];
  charL1Mon = this.monthNames[this.last1Month - 1];
  charL2Mon = this.monthNames[this.last2Month - 1];
  all: number = 24;
}
