import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-code-viewer',
  standalone: true,
  imports: [],
  templateUrl: './address-code-viewer.component.html',
  styleUrl: './address-code-viewer.component.scss'
})
export class AddressCodeViewerComponent {
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    console.log(this.router.parseUrl)
    console.log('Hola')
  }
}
