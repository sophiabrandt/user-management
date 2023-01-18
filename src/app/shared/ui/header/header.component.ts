import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'usrm-header',
  standalone: true,
  imports: [],
  templateUrl: 'header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
