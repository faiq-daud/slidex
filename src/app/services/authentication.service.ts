import { Injectable } from '@angular/core';
import { DataStoreService } from './data-store.service';
import { authUser } from './models/auth-interface';
import { User } from './models/user-interface';
import { userProfile } from './models/user-profile-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticatedUser: boolean = false;
  constructor(private dataStore: DataStoreService) { }


  authenticateUser(user: authUser): boolean {
    const users = this.dataStore.getUsers();
    return this.isAuthenticatedUser =  !!users.find(userMetadata => {
      return userMetadata.email === user.email && userMetadata.password === user.password;
    })
    
  }


  createUser(user: User): void {
    this.dataStore.createUser(user);
  }

  listUsers(): Array<User> {
    return this.dataStore.getUsers();
  }

  getProfile(): userProfile {
    return this.dataStore.getProfile();
  }


  isLoggedIn(): boolean {
    return this.isAuthenticatedUser;
  }
}
