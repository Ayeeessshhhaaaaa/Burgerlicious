import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerOrderServiceService } from 'src/app/Services/customer-order-service/customer-order-service.service';

@Component({
  selector: 'app-past-order-block',
  templateUrl: './past-order-block.component.html',
  styleUrls: ['./past-order-block.component.scss']
})
export class PastOrderBlockComponent {

  allOrders:any;

  constructor(private router: Router, private service:CustomerOrderServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.service.getAllOrdersOfUser(id).subscribe((res)=>{
      // console.log(res.data);
      this.allOrders=res.data;
    });

  }


  trackOrder(id:any){
    this.router.navigate(['/track-order-page/'+id]);
  }

  viewOrder(id:any){
    this.router.navigate(['/view-order/'+id]);
  }




}
