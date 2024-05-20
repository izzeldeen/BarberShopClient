import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() expirationDateTime;
  currentDate: any = new Date().getTime();

  @Output() expiredEvent = new EventEmitter<boolean>(false);
  distance = 0;
  days;
  hours;
  minutes;
  seconds;
  interval;
  isExpired = false;

  constructor() {
  }

  ngOnInit() {
    if (this.expirationDateTime) {
      this.expirationDateTime = new Date(this.expirationDateTime).getTime();

      this.startTimer();
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  startTimer() {
    this.interval = setInterval(() => {
      this.currentDate = new Date().getTime();
      this.distance = this.expirationDateTime - this.currentDate;
      this.days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
    /*  console.log("Rounded: " + Math.round((this.currentDate /this.distance ) * 100) + "%");*/
      if (this.distance < 0) {
        this.isExpired = true;
        this.expiredEvent.emit(true);
        this.pauseTimer();
      } /*else {
        this.distance--;
      }*/
    }, 1000);
  }


  setPercentageDate() {
    const start: any = new Date();
    const end: any = new Date(this.expirationDateTime);
    const today: any = new Date();

    //use Math.abs to avoid sign
    const q: any = Math.abs(end);
    const d: any = Math.abs( start);


  }
}
