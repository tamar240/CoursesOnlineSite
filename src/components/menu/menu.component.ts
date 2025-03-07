import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ 
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink, 
    RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  role: string="";

  constructor(private router:Router,private usersService:UsersService){

  }
  ngOnInit() {
    this.role=this.usersService.getRole()||"student";

  }
  navigateToLoginout() {
    this.usersService.clearUserData();  
    this.router.navigate(['/']); 
  }
}
