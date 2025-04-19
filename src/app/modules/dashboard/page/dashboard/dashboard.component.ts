import { Component, OnInit } from '@angular/core';
import { DashboardChartsData, IChartProps } from './shared/dashboard-charts-data';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { cilChartPie, cilArrowRight } from '@coreui/icons';
import { DashboardService } from '../../dashboard.service';
import { Dashboard } from '../../interfaces/dashboard.interfaces';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../../auth/auth.service';



interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}



@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  public currentYear = new Date().getFullYear();
  public dash?: Dashboard;
  public role: string | null = '';

  constructor(
    private chartsData: DashboardChartsData,
    private dashboardService: DashboardService,
    private authService: AuthService,
  ) {
  }

  icons = {
    cilChartPie,
    cilArrowRight,
  };

  public users: IUser[] = [
    {
      name: 'Yiorgos Avraamu',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Us',
      usage: 50,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Mastercard',
      activity: '10 sec ago',
      avatar: './assets/img/avatars/1.jpg',
      status: 'success',
      color: 'success'
    },
    {
      name: 'Avram Tarasios',
      state: 'Recurring ',
      registered: 'Jan 1, 2021',
      country: 'Br',
      usage: 10,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Visa',
      activity: '5 minutes ago',
      avatar: './assets/img/avatars/2.jpg',
      status: 'danger',
      color: 'info'
    },
    {
      name: 'Quintin Ed',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'In',
      usage: 74,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Stripe',
      activity: '1 hour ago',
      avatar: './assets/img/avatars/3.jpg',
      status: 'warning',
      color: 'warning'
    },
    {
      name: 'Enéas Kwadwo',
      state: 'Sleep',
      registered: 'Jan 1, 2021',
      country: 'Fr',
      usage: 98,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Paypal',
      activity: 'Last month',
      avatar: './assets/img/avatars/4.jpg',
      status: 'secondary',
      color: 'danger'
    },
    {
      name: 'Agapetus Tadeáš',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Es',
      usage: 22,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'ApplePay',
      activity: 'Last week',
      avatar: './assets/img/avatars/5.jpg',
      status: 'success',
      color: 'primary'
    },
    {
      name: 'Friderik Dávid',
      state: 'New',
      registered: 'Jan 1, 2021',
      country: 'Pl',
      usage: 43,
      period: 'Jun 11, 2021 - Jul 10, 2021',
      payment: 'Amex',
      activity: 'Yesterday',
      avatar: './assets/img/avatars/6.jpg',
      status: 'info',
      color: 'dark'
    }
  ];
  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.loadDashboard();
    this.initCharts();
    this.getRole();

  }

  getRole(): void {
    this.role = this.authService.getRole();
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
    // this.mainChart.
    // console.log('este', this.mainChart);

  }

  loadDashboard(): void {
    this.dashboardService.loadDashboard().subscribe(
     response => {
      // console.log(response);
      this.dash = response

     },
     error => {
      console.error('Error loading dashboard', error);
     }
    )
  }

  getProgress(number: number | undefined, total: number | undefined): number {
    return (number && total) ? (number / total) * 100 : 0;
  }



}
