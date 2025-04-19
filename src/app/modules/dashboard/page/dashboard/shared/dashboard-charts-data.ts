import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils';
import { DashboardService } from '../../../dashboard.service';
import { Dashboard } from '../../../interfaces/dashboard.interfaces';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor(private dashboardService: DashboardService) {
    this.loadDashboard();
    this.initMainChart();
  }

  public dash?: Dashboard;
  public mainChart: IChartProps = {};

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  loadDashboard(): void {
    this.dashboardService.loadDashboard().subscribe(
      response => {
        this.dash = response;
        // console.log('Data from API:', this.dash);

        // Initialize chart with actual data
        this.initMainChart();
      },
      error => {
        console.error('Error loading dashboard', error);
      }
    );
  }

  initMainChart(period: string = 'Month') {
    const brandSuccess = getStyle('--cui-success') ?? '#4dbd74';
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info') ?? '#20a8d8', 10);
    const brandDanger = getStyle('--cui-danger') || '#f86c6b';

    // Main chart initialization
    this.mainChart['elements'] = period === 'Month' ? 12 : 27;
    this.mainChart['Data1'] = [];  // Total members
    this.mainChart['Data2'] = [];  // Male members
    this.mainChart['Data3'] = [];  // Female members

    // Initialize the labels for all months (January to December)
    let labels: string[] = [];
    if (period === 'Month') {
      labels = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
    } else {
      const week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      labels = week.concat(week, week, week);
    }

    // Assuming the API data provides monthly data, we can dynamically adjust the labels based on the available months
    let monthLabels: string[] = [];
    if (this.dash) {
      // Create a map of months (from 1 to 12)
      const monthMap = new Array(12).fill(0).map((_, index) => ({
        month: new Date(2021, index).toLocaleString('default', { month: 'long' }),
        total: 0,
        male: 0,
        female: 0
      }));

      // Iterate through API data and populate the monthMap
      this.dash.chart.forEach((data: any) => {
        const monthIndex = data.month - 1; // Subtract 1 to match 0-based index
        monthMap[monthIndex].total = data.total_members;
        monthMap[monthIndex].male = data.male;
        monthMap[monthIndex].female = data.female;
      });

      // Set monthLabels and chart data
      monthLabels = monthMap.map(item => item.month);

      // Update chart data to match monthMap
      this.mainChart['Data1'] = monthMap.map(item => item.total);
      this.mainChart['Data2'] = monthMap.map(item => item.male);
      this.mainChart['Data3'] = monthMap.map(item => item.female);
    }

    const colors = [
      {
        // brandInfo
        backgroundColor: brandInfoBg,
        borderColor: brandSuccess || '#4dbd74',
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      },
      {
        // brandSuccess
        backgroundColor: 'transparent',
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'
      },
      {
        // brandDanger
        backgroundColor: 'transparent',
        borderColor: brandDanger || '#f86c6b',
        pointHoverBackgroundColor: brandDanger,
        borderWidth: 2,
        // borderDash: [8, 5]

      }
    ];

    const datasets = [
      {
        data: this.mainChart['Data1'],
        label: 'Total Miembros',
        ...colors[0]
      },
      {
        data: this.mainChart['Data2'],
        label: 'Hombres',
        ...colors[1]
      },
      {
        data: this.mainChart['Data3'],
        label: 'Mujeres',
        ...colors[2]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: Math.max(...this.mainChart['Data1']),
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(Math.max(...this.mainChart['Data1']) / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels: monthLabels
    };
  }

}
