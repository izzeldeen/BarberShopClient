import { Component, OnInit } from '@angular/core';
import { UIHelper } from 'src/app/core/utilities/ui-helper';
import { BaseComponent } from 'src/app/shared/base.component';
import { DashboardVM, Month } from 'src/app/shared/model/dashboard/dashboard.vm';
import { PipeChartVM } from 'src/app/shared/model/dashboard/pipe-chart.vm';
import { TransactionFilter } from 'src/app/shared/model/transaction/transaction.vm';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SpinnerService } from 'src/app/shared/spinner/spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  employeesCollectedAmontChart:PipeChartVM;
  employeesServingClientChart:PipeChartVM;
  employeesServicesChart:PipeChartVM;
  transactionsAmounts:DashboardVM;
  filter:TransactionFilter = new TransactionFilter();
  barChartSeries:[];
  barChartCategories:[];
  dllEmployees:any[];
  dllClients:any[];
  dllMonths: Month[] = [
    { viewValue: "January", value: 1 },
    { viewValue: "February", value: 2 },
    { viewValue: "March", value: 3 },
    { viewValue: "April", value: 4 },
    { viewValue: "May", value: 5 },
    { viewValue: "June", value: 6 },
    { viewValue: "July", value: 7 },
    { viewValue: "August", value: 8 },
    { viewValue: "September", value: 9 },
    { viewValue: "October", value: 10 },
    { viewValue: "November", value: 11 },
    { viewValue: "December", value: 12 }
];

  constructor(private dashboardService: DashboardService,
    private employeeService: EmployeeService,
    private spinner: SpinnerService,
    private userService: UserService
  ){
    super();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    this.dllMonths = this.dllMonths.filter(m => m.value  <= currentMonth)

  }
  
  ngOnInit(): void {
    this.getEmployees();
    this.getPipeCharts();
    this.getBarCharts();
  }

  getPipeCharts(){
    this.spinner.showSpinner();
    this.dashboardService.getPipeCharts(this.filter).subscribe(response => {
      if(response.isSuccess){
        this.transactionsAmounts = response.data;
        this.employeesCollectedAmontChart = response.data.employeesCollectedAmount;
        this.employeesServingClientChart = response.data.employeesClinetsServing;
        this.employeesServicesChart = response.data.employeesServices;
      }
      this.spinner.hideSpinner();
    } , error => {
      this.spinner.hideSpinner();
    })
  }

  getEmployees(){
   this.employeeService.getAll().subscribe(response => {
    if(response.isSuccess){
      this.dllEmployees = this.uiHelper.getDropdownItems(response.data.collection  ,this.uiHelper.getFullNameLabel() ,this.uiHelper.getIdLabel(), false );
    }
   })
   
  }

   getBarCharts(){
    this.spinner.showSpinner();
    this.dashboardService.getBarCharts(this.filter).subscribe(response => {
      if(response.isSuccess){
        this.barChartCategories = response.data.months;
        this.barChartSeries = response.data.series;
      }
      this.spinner.hideSpinner();
    } , error => {
      this.spinner.hideSpinner();
    })
  }
  

}
