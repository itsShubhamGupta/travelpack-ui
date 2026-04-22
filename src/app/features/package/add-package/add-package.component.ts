import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PackingService } from '../../../core/service/packing.service';
import { NotificationService } from '../../../core/service/notification.service';

@Component({
  standalone: true,
  selector: 'app-add-package',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-package.component.html'
})
export class AddPackageComponent {

  form!: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private packageService: PackingService,
    private router: Router,
    private notification:NotificationService
  ) {}

  ngOnInit() {
     this.form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    location: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(1)]],
    duration: [null, [Validators.required, Validators.min(1)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    availableSlots: [null, [Validators.required, Validators.min(1)]],

    itineraries: this.fb.array([
      this.createItinerary(1) // ✅ default Day 1
    ])
  });
  }

  // 🔥 create itinerary row
 
  get itineraries(): FormArray {
    return this.form.get('itineraries') as FormArray;
  }

  createItinerary(day: number): FormGroup {
  return this.fb.group({
    dayNumber: [{ value: day, disabled: true }], // auto-set
    details: ['', Validators.required]
  });
}

// auto increment day
addItinerary() {
  const nextDay = this.itineraries.length + 1;
  this.itineraries.push(this.createItinerary(nextDay));
}

// prevent removing first day
removeItinerary(index: number) {
  if (index === 0) return;
  this.itineraries.removeAt(index);
}

  // 📸 file select
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // 🚀 submit
  submit() {

    if (this.form.invalid) return;

    const formData = new FormData();

    // 🔹 append normal fields
    Object.keys(this.form.value).forEach(key => {
      if (key !== 'itineraries') {
        formData.append(key, this.form.value[key]);
      }
    });

    // 🔹 append image
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const itineraries = this.itineraries.controls.map((it, i) => ({
  dayNumber: i + 1,
  details: it.value.details
}));

formData.append('itineraries', JSON.stringify(itineraries));

    // 🔹 convert itinerary to JSON string
  
    // 🔥 API call
    this.packageService.addPackage(formData)
      .subscribe({
        next: () => {
          this.notification.show("Package Added Successfully!","success")
          this.form.reset()
          // this.router.navigate(['/']);
        },
        error: (err) => console.error(err)
      });
  }
}