import { Injectable } from '@angular/core';
import { User } from './models/user-interface';
import { v4 as uuidv4 } from 'uuid';
import { userProfile } from './models/user-profile-interface';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private users: Array<User> = [
    {
      id: uuidv4(),
      name: 'Faiq',
      email: 'faiq1223@gmail.com',
      password: 'developer@slidex',
      phoneNumber: '+923044819744',
      dateOfBirth: Date.now().toString()
    }
  ] 


  private profiles: Array<userProfile> = [
    {
      name: 'Micheal Jim',
      handler: '@Micheal',
      email: 'micheal@gmail.com',
      website: 'https://www.michealcosmetics.com',
      phoneNumber: '+923044819744',
      joined: new Date(),
      description: `CEO System D, Because your satisfaction is
      everything & Standing out from the rest, and that's
      what we want you to be as well.`,
      image: 'assets/images/profile.png'
    }];

  constructor() { }

  getUsers(): Array<User> {
    return this.users;
  }

  createUser(user: User): void {
    this.users.push(user);
  }
  
  getProfile(): userProfile {
    return this.profiles[0];
  }
}
