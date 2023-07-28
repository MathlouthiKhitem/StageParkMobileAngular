import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../module/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthServiceService,private router: Router) { }

  newUser:User;
  ngOnInit(): void {
    this.newUser= new User();
  }
  // submit({ value, valid }: { value: User, valid: boolean }) {

  
  //   this.user = value;
  
  //   console.log(this.user);
    
  // }

  onSubmit() {
    this.authService.login(this.newUser).subscribe(
      (response) => {
        // Handle successful signup response from the backend
        console.log('login Successful:', response);
        this.router.navigate(['/home']);

      },
      (error) => {
        // Handle signup error
        console.error('Signup Error:', error);
      }
    );
  }
  
}
