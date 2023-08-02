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
  agentZone: any;
  parkingData: Map<string, Map<string, string>>;
  zoneTitles: Map<string, string[]>;
  MAXIMUM_PARKING_NUMBERS = 100; // Replace with the actual maximum possible number of parking numbers
  newAgent: User | undefined; // Define a property to store the new user
  users: User 
  zone: string | null = null;

  onUserAdded(agentDetails: any) {
    this.newAgent = agentDetails;
    console.log(agentDetails);
  }

  ngOnInit(): void {
  //  this.getZoneTitlesWithMultipleOccurrences();
this. getParkingData();
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
    this.fetchAgentZone();
  }

  // getZoneTitlesWithMultipleOccurrences() {
  //   this.authService.getZoneTitlesWithMultipleOccurrences()
  //     .subscribe(
  //       data => {
  //         this.zoneTitles = data;
  //         console.log(this.zoneTitles);
  //       },
  //       error => {
  //         console.error('Error fetching data:', error);
  //       }
  //     );
  // }
  calculateProgressWidth(zoneValue: any): string {
    const progressPercentage = parseFloat(zoneValue);
    return progressPercentage + '%';
  }
  fetchAgentZone() {
    this.authService.getUsers(this.users.id).subscribe(
      (zoneData: any) => {
        this.agentZone = zoneData;
        console.log('Agent Zone:', this.agentZone);
        console.log(this.users.id);
      },
    
      (error) => {
        console.error('Error fetching agent zone:', error);
      }
    );
  }
  getParkingData(): void {
    this.authService.getMaxDurationPerSession().subscribe(
      data => {
        this.parkingData = data;
        console.log(this.parkingData); // You can process the data as per your requirements
      },
      error => {
        console.error('Error fetching parking data:', error);
      }
    );
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
