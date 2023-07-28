import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../module/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }
  newUser:User;
  ngOnInit(): void {
    this.newUser= new User();

  }

  onSubmit() {
    this.authService.signup(this.newUser).subscribe(
      (response) => {
        // Handle successful signup response from the backend
        console.log('Signup Successful:', response);
      },
      (error) => {
        // Handle signup error
        console.error('Signup Error:', error);
      }
    );
  }
}
