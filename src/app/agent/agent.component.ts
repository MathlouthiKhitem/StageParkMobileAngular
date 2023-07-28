import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../module/user';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  constructor(private authService: AuthServiceService,private router: Router) { }
  @Output() userAdded = new EventEmitter<User>();


 newUser:User;

  ngOnInit(): void {
    this.newUser= new User();

  } 
   onSubmit() {
    this.authService.signupAgent(this.newUser).subscribe(
      
      (response) => {

        // Handle successful signup response from the backend
        console.log('Signup Successful:', response);
                this.router.navigate(['/home']);
        this.userAdded.emit(response);
  
    
      },
      (error) => {
        // Handle signup error
        console.error('Signup Error:', error);
      }
    );
  }
}