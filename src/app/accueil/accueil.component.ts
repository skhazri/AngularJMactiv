import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import {MatDialog} from '@angular/material';
import {MyDialogComponent} from '../my-dialog/my-dialog.component';
import {Response} from "@angular/http";
import {MatTabsModule, MatTabChangeEvent} from '@angular/material/tabs';
import { ActiviteService } from '../services/activite.service';

export interface GPSData {
  latitude: any;
  longitude: any;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      width: '500px',
      data: {latitude: this.localLatitudeCriteria, longitude: this.localLongitudeCriteria}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.localLongitudeCriteria = result.longitude;
      this.localLatitudeCriteria = result.latitude;
      this.activiteService.geocode(this.localLatitudeCriteria,this.localLongitudeCriteria).subscribe((location) => {
        this.localLocationCriteria = location.json().results[0].formatted_address;
        console.log("dialogRef.afterClosed() " + this.localLatitudeCriteria + "," + this.localLongitudeCriteria);
      });
    });
  }

  user: SocialUser;

  loggedIn: boolean;

  localeventCriteria="";
  localLongitudeCriteria=-73.67649939547277;
  localLatitudeCriteria= 45.58148250928232;
  localDistanceCriteria=50;
  localStartDateCriteria = new Date();
  localStartTimeCriteria = new Date();
  localEndDateCriteria;
  localEndTimeCriteria;
  localLocationCriteria;

  parentEventCriteria="";
  parentLongitudeCriteria=-73.67649939547277;
  parentLatitudeCriteria= 45.58148250928232;
  parentDistanceCriteria=50;
  parentStartDateCriteria = new Date();
  parentStartTimeCriteria = new Date();
  parentEndDateCriteria;
  parentEndTimeCriteria;
  parentLocationCriteria;



  data: [];
  id = {'id': ''};

  constructor(
      public dialog:MatDialog,private router: Router, private socialAuthService: AuthService, private activiteService: ActiviteService) { }


  ngOnInit(){
    // Check if user is logged in to Facebook and return a user with its properties
      this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        if (user != null) {
          if (user.id != null) {
            this.loggedIn = true; }
          else {
            this.loggedIn = false;
          }
        } else {
          this.loggedIn = false;
        }

      });

  }
  /**
   * SignOut
   */
  public SignOut() {
    this.socialAuthService.signOut();
    this.router.navigate(['']);
  }

  private OnSearch(){
    console.log("OnSearch()");
    this.parentEventCriteria = this.localeventCriteria;
    this.parentLongitudeCriteria=this.localLongitudeCriteria;
    this.parentLatitudeCriteria= this.localLatitudeCriteria;
    this.parentDistanceCriteria= this.localDistanceCriteria;
    this.parentStartDateCriteria = this.localStartDateCriteria;
    this.parentStartTimeCriteria = this.localStartTimeCriteria;
    this.parentEndDateCriteria = this.localEndDateCriteria;
    this.parentEndTimeCriteria = this.localEndTimeCriteria;
    this.parentLocationCriteria = this.localLocationCriteria;
  }

}
