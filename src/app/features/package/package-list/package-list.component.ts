import { Component } from '@angular/core';
import { PackingService } from '../../../core/service/packing.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-list',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css'
})
export class PackageListComponent {
  packages: any;
filters = {
  location: '',
  minPrice: '',
  maxPrice: ''
};


  constructor(private packingSer:PackingService){

  }
   ngOnInit() {
    this.loadPackages();
  }
  loadPackages() {
    this.packingSer.getPackages(this.filters)
      .subscribe({
        next: (res) => this.packages = res,
        error: (err) => console.error(err)
      });
  }

  applyFilter() {
  this.loadPackages();
}

// 🔄 reset
resetFilter() {
  this.filters = {
    location: '',
    minPrice: '',
    maxPrice: ''
  };
  this.loadPackages();
}
}
