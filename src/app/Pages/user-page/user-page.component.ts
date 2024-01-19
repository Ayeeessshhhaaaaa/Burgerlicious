import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service/user-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {

  userDetails:any;
  error:any;

  userId:any;
  mismatch:any;

  updateUser = new FormGroup({
    'Username': new FormControl('', Validators.required),
    'FirstName': new FormControl('', Validators.required),
    'LastName': new FormControl('', Validators.required),
    'Email': new FormControl('', [Validators.required,Validators.email]),
    'Contact': new FormControl('', Validators.required),
    'PasswordHash': new FormControl('',Validators.required),
    'ConfirmPassword': new FormControl('',Validators.required),

  });

  constructor(private router: Router, private service:UserServiceService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);

    this.service.getUsersById(this.userId).subscribe((res)=>{
      this.userDetails=res.data;
      console.log(this.userDetails);
    });

  }

  updateUserSubmit() {
    console.log(this.updateUser.value.PasswordHash);
    if (this.updateUser.value.PasswordHash!==this.updateUser.value.ConfirmPassword){
      this.mismatch= true;
    }
    else if(this.updateUser.valid) {
      this.mismatch= false;
      this.service.updateOrderById(this.updateUser.value,this.userId).subscribe((res)=>{  
        location.reload();
      });
    
    }
    else {
      this.error = "Please enter values for all fields";
    }
  }

  pastOrders(){
    this.router.navigate(['/past-order/'+localStorage.getItem('UserID')]);
  }



}
