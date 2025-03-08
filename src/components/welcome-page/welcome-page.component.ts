import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router, RouterOutlet } from '@angular/router';
import { MatCard } from '@angular/material/card';
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatCard],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent {

  token: string = '';
  clickOnLogin=false;

  constructor(private usersService: UsersService, private router: Router) {

   
  }
  ngOnInit() {
    this.usersService.clearUserData();
    this.token = this.usersService.getToken()||"";

    if (this.token !="") {
      this.router.navigate(['/menu/home']);
    }
  }
  clickLogin() {
    this.clickOnLogin=true;
    this.router.navigate(['/login']);

  }
}
