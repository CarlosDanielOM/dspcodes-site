import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-codes-view',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './codes-view.component.html',
  styleUrl: './codes-view.component.scss'
})
export class CodesViewComponent {

}
