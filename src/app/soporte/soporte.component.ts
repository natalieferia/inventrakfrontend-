import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthenticatedNavbarComponent } from '../authenticated-navbar/authenticated-navbar.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-soporte',
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, AuthenticatedNavbarComponent,HttpClientModule],
  standalone: true,
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css'
})
export class SoporteComponent {

}
