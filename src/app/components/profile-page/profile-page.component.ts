import { CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { userProfile } from 'src/app/services/models/user-profile-interface';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profile: userProfile | undefined;
  isFollowed: boolean = false;

  coordinate: any = {
    website: {
      positionY: 0,
      positionX:0
    },
    phone: {
      positionY: 0,
      positionX:0
    },
    email: {
      positionY: 0,
      positionX:0
    }, 
    joined: {
      positionY: 0,
      positionX:0
    }
  }
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.profile = this.authService.getProfile();
  }

  onFollow(): void {
    this.isFollowed = !this.isFollowed;
  }

  updatePosition(event: CdkDragMove, type: string) {
    this.coordinate[type].positionX = event.source.getFreeDragPosition().x;
    this.coordinate[type].positionY = event.source.getFreeDragPosition().y;
  }
}
