import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerService } from '../../core/service/spinner.service';

@Component({
  selector: 'app-loader',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {



    constructor(public spinner: SpinnerService) {}

}
