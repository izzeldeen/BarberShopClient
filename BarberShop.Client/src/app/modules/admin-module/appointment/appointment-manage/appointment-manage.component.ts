import { Component} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { AppointmentService } from 'src/app/shared/services/appointment.service';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { EventColor } from 'calendar-utils';


const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-appointment-manage',
  templateUrl: './appointment-manage.component.html',
  styleUrls: ['./appointment-manage.component.scss']
})
export class AppointmentManageComponent {
  appointments:CalendarEvent[] = [];
  events:CalendarEvent[];
  constructor(private appointmentService: AppointmentService){
    this.getAppointments();
  }
  

    getAppointments(){
      this.appointmentService.getAllAppointments().subscribe(response => {
        if(response.isSuccess){
          debugger;
          response.data.forEach(item => {
             var obj = {
              id: item.id,
              title: item.employeeName,
              start: new Date(item.startDate),
              end: new Date(item.endDate),
              color: this.getRandomColor(),
             }

             this.appointments.push(obj);
          });

          this.events = this.appointments;
        }
      })
    }

    getRandomColor(): EventColor {
      const colorKeys = Object.keys(colors);
      const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      return colors[randomKey];
    }
}

