import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss']
})
export class PickListComponent {
@Input() sourceServices = [];
@Input() targetServices = [];
constructor(){
  this.sourceServices = [ ]
  this.targetServices = []
}
}
