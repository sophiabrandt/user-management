import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'usrm-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: ` <usrm-header></usrm-header> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
