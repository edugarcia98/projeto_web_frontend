import { Component, OnInit } from '@angular/core';
import { Register } from './register'
import { RegisterServiceService } from './register-service.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
   
  items: Register[];
  error: any;
  selectedRegister;
  constructor(private api: RegisterServiceService) {
    this.selectedRegister = {id: -1, usuario: '', email: '', password:''};
   }

  ngOnInit() {
    this.api.getRegisters().subscribe(
      (items: Register[]) => this.items = items,
      (error: any) => this.error = error
    );
  }
  add(itemUser: string, itemMail: string, itemPassword: string){
    this.api.createRegister(itemUser,itemMail, itemPassword ).subscribe(
      (item: Register) => this.items.push(item)
    );
    location.reload();
  }

}
