import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { Zone } from '../module/Zone';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthServiceService,private router: Router) { }
  zoneData:Zone;

  ngOnInit(): void {
    this.zoneData= new Zone();

  }
  addZone() {
    this.authService.addZone(this.zoneData).subscribe(
      (response) => {
        console.log('Zone added successfully:', response);
        this.router.navigate(['/listeZone']);

        // Handle the response as needed
      },
      (error) => {
        console.error('Error adding zone:', error);
        // Handle errors
      }
    );
  }
}

