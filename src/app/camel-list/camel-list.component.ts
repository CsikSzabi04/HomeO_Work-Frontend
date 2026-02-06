import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CamelService } from '../services/camel.service';
import { Camel } from '../models/camel.model';

@Component({
  selector: 'app-camel-list',
  templateUrl: './camel-list.component.html',
  styleUrls: ['./camel-list.component.css']
})
export class CamelListComponent implements OnInit {
  camels: Camel[] = [];
  camelForm: FormGroup;
  isEditing = false;
  currentCamelId?: number;
  errorMessage = '';
  successMessage = '';
  isLoading = true;
  deleteConfirmId?: number;
  deleteConfirmName = '';

  constructor(
    private camelService: CamelService,
    private fb: FormBuilder
  ) {
    this.camelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      color: [''],
      lastFed: [''],
      humpCount: [null, [Validators.required, Validators.min(1), Validators.max(2)]]
    });
  }

  ngOnInit(): void {
    this.loadCamels();
  }

  loadCamels(): void {
    this.isLoading = true;
    this.camelService.getCamels().subscribe(
      (data) => {
        this.camels = data;
        this.errorMessage = '';
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Hiba!';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.camelForm.invalid) {
      return;
    }

    const formValue = this.camelForm.value;
    const camelData: Camel = {
      name: formValue.name,
      color: formValue.color,
      lastFed: formValue.lastFed ? new Date(formValue.lastFed).toISOString() : null,
      humpCount: formValue.humpCount
    };

    if (this.isEditing && this.currentCamelId) {
      this.camelService.updateCamel(this.currentCamelId, camelData).subscribe(
        () => {
          this.loadCamels();
          this.resetForm();
          this.successMessage = 'Siker!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Hiba!';
        }
      );
    } else {
      this.camelService.createCamel(camelData).subscribe(
        () => {
          this.loadCamels();
          this.resetForm();
          this.successMessage = 'Siker!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        (error) => {
          this.errorMessage = 'Hiba!';
        }
      );
    }
  }

  editCamel(camel: Camel): void {
    this.isEditing = true;
    this.currentCamelId = camel.id;
    
    let lastFedFormatted = '';
    if (camel.lastFed) {
      const date = new Date(camel.lastFed);
      lastFedFormatted = date.toISOString().slice(0, 16);
    }
    
    this.camelForm.patchValue({
      name: camel.name,
      color: camel.color,
      lastFed: lastFedFormatted,
      humpCount: camel.humpCount
    });
    window.scrollTo(0, 0);
  }

  confirmDelete(camel: Camel): void {
    if (camel.id && camel.name) {
      this.deleteConfirmId = camel.id;
      this.deleteConfirmName = camel.name;
    }
  }

  cancelDelete(): void {
    this.deleteConfirmId = undefined;
    this.deleteConfirmName = '';
  }

  deleteCamel(): void {
    if (this.deleteConfirmId) {
      this.camelService.deleteCamel(this.deleteConfirmId).subscribe(
        () => {
          this.loadCamels();
          this.successMessage = 'Siker!';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.cancelDelete();
        },
        (error) => {
          this.errorMessage = 'Hiba!';
          this.cancelDelete();
        }
      );
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.currentCamelId = undefined;
    this.camelForm.reset();
    const controls = this.camelForm.controls;
    for (let key in controls) {
      if (controls.hasOwnProperty(key)) {
        controls[key].setErrors(null);
      }
    }
  }

  get name() {
    return this.camelForm.get('name');
  }

  get color() {
    return this.camelForm.get('color');
  }

  get lastFed() {
    return this.camelForm.get('lastFed');
  }

  get humpCount() {
    return this.camelForm.get('humpCount');
  }
}