import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOrderServiceService } from 'src/app/Services/customer-order-service/customer-order-service.service';

@Component({
  selector: 'app-track-order',
  templateUrl: './track-order.component.html',
  styleUrls: [
    '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../../node_modules/bootstrap-icons/font/bootstrap-icons.css',
    './track-order.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class TrackOrderComponent implements OnInit {

  allOrders:any;
  percentageWidth:any;

  status1:any='btn-secondary';
  status2:any='btn-secondary';
  status3:any='btn-secondary';

  check1:any="";
  check2:any="";
  check3:any="";

  constructor(private router: Router, private service:CustomerOrderServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.service.getOrderById(id).subscribe((res)=>{
      console.log(res.data);
      this.allOrders=res.data;
      this.checkStatusLevel();

    });

  }

  setWidthComplete(){
    return {
      'width': this.percentageWidth + '%',
    };
  }

  checkStatusLevel(){
    if(this.allOrders[0].Status == "Order Received"){
      this.percentageWidth=0;
    }
    else if(this.allOrders[0].Status == "Preparing Food"){
      this.percentageWidth=0;
      this.status1='btn-primary';
      this.check1 = 'bi bi-check-circle-fill';
    }
    else if(this.allOrders[0].Status == "Order Ready"){
      this.percentageWidth=50;
      this.status1='btn-primary';
      this.status2='btn-primary';

      this.check1 = 'bi bi-check-circle-fill';
      this.check2 = 'bi bi-check-circle-fill';
    }
    else if(this.allOrders[0].Status == "Completed"){
      this.percentageWidth=100;
      this.status1='btn-primary';
      this.status2='btn-primary';
      this.status3='btn-primary';

      this.check1 = 'bi bi-check-circle-fill';
      this.check2 = 'bi bi-check-circle-fill';
      this.check3 = 'bi bi-check-circle-fill';
    }
    console.log(this.percentageWidth);

  }

}
