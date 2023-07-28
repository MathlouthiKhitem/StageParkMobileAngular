import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { User } from '../module/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input() zoneId: string; // Receive the zoneId as an input

  constructor(private authService: AuthServiceService,private http: HttpClient) { }
  users: User[];
  selectedEmail: string; 

  ngOnInit(): void {
    this.authService.getUsersByType2().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  onButtonClicked(): void {
    // Handle the button click event here
    console.log('Button clicked!');
    console.log('Selected Email:', this.selectedEmail);
  }

  assignZoneToAgent(): void {
    const url = 'http://localhost:8080/Backend/admin/assign'; // Replace 'YOUR_API_URL' with the actual URL of your backend API
    const body = { zoneId: this.zoneId, agentId: this.selectedEmail };
    console.log('Selected Email:', body);

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.http.post<string>(url, body, httpOptions).subscribe(
      response => {
        console.log('Response:', response);
        // Handle the success response here
        console.log('Zone assigned to Agent successfully.');
      },
      error => {
        // Handle the HTTP error here
        console.error('HTTP Error:', error);
      }
    );
  }
  
}
