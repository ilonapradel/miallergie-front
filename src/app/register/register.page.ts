import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string;
  email:string;
  password:string;
  password2:string;

  constructor(private api: UsersService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.username,this.email,this.password,this.password2);
    if(this.password === this.password2)
      this.api.register(this.username,this.email,this.password).then(res=>{
        console.log({resWs:res});
      });
  }

}
