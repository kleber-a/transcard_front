import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'transcard-frontend';
}
