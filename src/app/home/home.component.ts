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
  calculateProgressWidth(sessionCount: number): string {
    // Implement your calculation logic here to get the progress width based on 'sessionCount'
    // For example, you can set a maximum session count and calculate the percentage based on that
    const maxSessionCount = 100; // Change this to your desired maximum session count
    const progressPercentage = (sessionCount / maxSessionCount) * 100;
    return progressPercentage + '%';
  }
  // In your component
getSessionCount(parkingData: any): number {
  return parseInt(parkingData['Session Count'], 2);
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
  // getParkingData(): void {
  //   this.authService.getMaxDurationPerSession().subscribe(
  //     data => {
  //       this.parkingData = data;
  //       console.log(this.parkingData); // You can process the data as per your requirements
  //     },
  //     error => {
  //       console.error('Error fetching parking data:', error);
  //     }
  //   );
  // }
  // responsivemenu 
  
  getParkingData(): void {
    this.authService.getMaxDurationPerSession().subscribe(
      data => {
        this.parkingData = data;
        console.log(this.parkingData); // You can process the data as per your requirements

        // Calculate progress width based on "Session Count" value
        for (const zoneTitle in this.parkingData) {
          if (this.parkingData.hasOwnProperty(zoneTitle)) {
            const parkingInfo = this.parkingData[zoneTitle];
            const sessionCount = parseInt(parkingInfo['Session Count'], 10);
            const progressWidth = this.calculateProgressWidth(sessionCount);
            // Now you can use the 'progressWidth' to set the width of your progress element in your HTML template
            console.log(`Zone: ${zoneTitle}, Session Count: ${sessionCount}, Progress Width: ${progressWidth}`);
          }
        }
      },
      error => {
        console.error('Error fetching parking data:', error);
      }
    );
  }
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
