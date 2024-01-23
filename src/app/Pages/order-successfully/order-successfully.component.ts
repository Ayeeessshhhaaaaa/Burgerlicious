import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-successfully',
  templateUrl: './order-successfully.component.html',
  styleUrls: ['./order-successfully.component.scss']
})
export class OrderSuccessfullyComponent {

  orderId:any;

  constructor(private route: ActivatedRoute, private router:Router) { 
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

  viewOrder(id:any){
    this.router.navigate(['/view-order/'+id]);
  }

}
