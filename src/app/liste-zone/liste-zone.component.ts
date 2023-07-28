import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Zone } from '../module/Zone';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-liste-zone',
  templateUrl: './liste-zone.component.html',
  styleUrls: ['./liste-zone.component.css']
})
export class ListeZoneComponent implements OnInit {
  zone: Zone 

  constructor(private authService: AuthServiceService){}
  showDialog: boolean = false;
  selectedZoneId: number; // Property to store the selected zone ID

  openDialog(zoneId: number): void {
    this.selectedZoneId = zoneId; // Set the selected zone ID
    this.showDialog = true;
  

  }

  closeDialog() {
    this.showDialog = false;
  }
  ngOnInit(): void {

    this.authService.geTzone().subscribe(
      (data) => {
        this.zone = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  
  }

 
  
}
