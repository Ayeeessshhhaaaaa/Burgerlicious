import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import * as pdfMake from "pdfmake/build/pdfMake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { AdminDashboardServiceService } from '../Services/admin-dashboard-service/admin-dashboard-service.service';
Chart.register(...registerables);

(pdfMake as any).vfs=pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  noOfUsers: any;
  noOfOrders: any;
  noOfFeedbacks: any;
  noOfIngredients: any;

  noOfReceivedStatus: any;
  receivedPercentage:any;
  noOfPreparingFoodStatus: any;
  preparingFoodPercentage:any;
  noOfOrderReadyStatus: any;
  orderReadyPercentage:any;
  noOfStatusCountExceptCompleted: any;


  //Rating Analyze Chart variables
  ratingChart: any;
  ratingChartLabelData: any = [];
  ratingChartData: any = [];


  //Revenue Per Year variables
  revnuePerYearChart: any;
  revenuePerYearChartLabelData: any = [];
  revenuePerYearChartData: any = [];

  loaderFixScriptElement: HTMLScriptElement;

  constructor(private service: AdminDashboardServiceService) { 
    this.loaderFixScriptElement = document.createElement("script");
    this.loaderFixScriptElement.src = "assets/scripts/preLoaderFix.js";
    document.body.appendChild(this.loaderFixScriptElement);
  }

  ngOnInit(): void {

    this.service.getUsersCount().subscribe((res) => {

      this.noOfUsers = res.data;
    });

    this.service.getOrdersCount().subscribe((res) => {

      this.noOfOrders = res.data;
    });

    this.service.getFeedBackCount().subscribe((res) => {

      this.noOfFeedbacks = res.data;
    });

    this.service.getIngredientCount().subscribe((res) => {

      this.noOfIngredients = res.data;
    });


    this.service.getStatusCount("Received").subscribe((res) => {

      this.noOfReceivedStatus = res.data[0].count;
    });

    this.service.getStatusCount("Preparing Food").subscribe((res) => {

      this.noOfPreparingFoodStatus = res.data[0].count;
    });

    this.service.getStatusCount("Order Ready").subscribe((res) => {

      this.noOfOrderReadyStatus = res.data[0].count;
    });


    this.service.getStatusExceptCompletedCount().subscribe((res) => {

      this.noOfStatusCountExceptCompleted = res.data[0].count;
      
      this.receivedPercentage=(this.noOfReceivedStatus/this.noOfStatusCountExceptCompleted)*100;
      this.preparingFoodPercentage=(this.noOfPreparingFoodStatus/this.noOfStatusCountExceptCompleted)*100;
      this.orderReadyPercentage=(this.noOfOrderReadyStatus/this.noOfStatusCountExceptCompleted)*100;
    });



    this.service.getRatingChartInfo().subscribe((res) => {
      console.log(res);

      this.ratingChart = res;
      if (res != null) {
        for (let i = 0; i < this.ratingChart.data.length; i++) {
          this.ratingChartLabelData.push("Rating " + this.ratingChart.data[i].Rating)
          this.ratingChartData.push(this.ratingChart.data[i].count);
        }
      }


      this.RenderRatingChart(this.ratingChartLabelData, this.ratingChartData);
    });


    this.service.getRevenuePerYearInfo().subscribe((res) => {
      console.log(res);

      this.revnuePerYearChart = res;
      if (res != null) {
        for (let i = 0; i < this.revnuePerYearChart.data.length; i++) {
          this.revenuePerYearChartLabelData.push("Year " + this.revnuePerYearChart.data[i].year)
          this.revenuePerYearChartData.push(this.revnuePerYearChart.data[i].totalAmount);
        }
      }

      this.RenderRevenuePerYearChart(this.revenuePerYearChartLabelData, this.revenuePerYearChartData);
    });

  }

  RenderRatingChart(labelData: any, realData: any) {

    const data = {
      labels: labelData,
      datasets: [{
        label: '# of Ratings for Each Rating Level',
        data: realData,
        backgroundColor: [
          'rgba(168, 107, 50)',
          'rgba(168, 115, 50)',
          'rgba(168, 133, 50)',
          'rgba(168, 154, 50)',
          'rgba(207, 219, 42)'
        ],
        borderColor: [
          'rgb(231, 247, 2)',
          'rgb(231, 247, 2)',
          'rgb(231, 247, 2)',
          'rgb(231, 247, 2)',
          'rgb(231, 247, 2)'
        ],
        borderWidth: 1
      }]
    };
  

    const chart = new Chart("ratingChart", {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
  
    });

  }


  RenderRevenuePerYearChart(labelData: any, realData: any) {

    const data = {
      labels: labelData,
      datasets: [{
        label: 'Revenue Per Year',
        data: realData,
        backgroundColor: [
          'rgba(252, 101, 8)'
        ],
        borderColor: [
          'rgb(62, 194, 25)'
        ],
        borderWidth: 1
      }]
    };

    const chart = new Chart("revenuePerYearChart", {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  }

  generatePDF(){
    var canvar_bar = document.getElementById("ratingChart") as HTMLCanvasElement;
    var dataurl3=canvar_bar.toDataURL('image/png');
    console.log(dataurl3);
    let fitArray:number[]=[500,500];

    let docDef: {
      content: {
          image: string;
          fit: [number, number]; 
      }[];
  } = {
      content: [
          {
              image: dataurl3,
              fit: [500, 500]
          }
         
      ]
  };
  


    pdfMake.createPdf(docDef).open();
    pdfMake.createPdf(docDef).download('ratingChart.pdf');
  
  }


  downloadImage() {
    var canvar_bar = document.getElementById("ratingChart") as HTMLCanvasElement;
    var dataurl3 = canvar_bar.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'ratingChart.png';
    link.href = dataurl3;
    link.click();


  }

  setReceivedPercentageStyles(){
    return {
      'width': this.receivedPercentage + '%',
    };
  }

  setPreparingFoodPercentageStyles(){
    return {
      'width': this.preparingFoodPercentage + '%',
    };
  }

  setOrderReadyPercentageStyles(){
    return {
      'width': this.orderReadyPercentage + '%',
    };
  }

  generateRevenuePDF(){
    var canvar_bar = document.getElementById("revenuePerYearChart") as HTMLCanvasElement;
    var dataurl3=canvar_bar.toDataURL('image/png');
    console.log(dataurl3);

    let docDef: {
      content: {
          image: string;
          fit: [number, number]; 
      }[];
  } = {
      content: [
          {
              image: dataurl3,
              fit: [500, 500]
          }
         
      ]
  };

    pdfMake.createPdf(docDef).open();
    pdfMake.createPdf(docDef).download('revenuePerYearChart.pdf');
  
  }
  
  downloadRevenueImage() {
    var canvar_bar = document.getElementById("revenuePerYearChart") as HTMLCanvasElement;
    var dataurl3 = canvar_bar.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'revenuePerYearChart.png';
    link.href = dataurl3;
    link.click();


  }
}
