import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../module/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private el:ElementRef,private authService: AuthServiceService){}
  
  
  newAgent: User | undefined; // Define a property to store the new user
  users: User 
  onUserAdded(agentDetails: any) {
    this.newAgent = agentDetails;
    console.log(agentDetails);
  }

  ngOnInit(): void {
    this.authService.getUsersByType2().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
    let alldrpdwn = document.querySelectorAll('.dropdow-container');
    console.log(alldrpdwn,'alldrpdwn#');
    alldrpdwn.forEach((item:any)=>{
      const a = item.parentElement?.querySelector('a:first-child');
      console.log(a,'a#');
      a.addEventListener('click',(e:any)=>{
          e.preventDefault();
          this.el.nativeElement.classList.toggle('active');
          item.classList.toggle('show');
      });
      
    });

  }




  // responsivemenu 
  responsiveMenu:any;
  // responsivemaincontent
  responsiveContent:any;
  defaultStatus=true;
  openNav(status:any)
  {
    if(status===this.defaultStatus)
    {
      this.responsiveMenu = {
        'display':'block'
      }
      this.responsiveContent={
        'margin-left':'150px'
      }
      this.defaultStatus = false;
    }else
    {
      this.responsiveMenu = {
        'display':null
      }
      this.responsiveContent={
        'margin-left':null
      }
      this.defaultStatus=true;
    }

  }

}
