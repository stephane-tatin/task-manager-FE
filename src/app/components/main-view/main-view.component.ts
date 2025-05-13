import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-main-view',
  imports: [MenuComponent, TableComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
})
export class MainViewComponent {}
