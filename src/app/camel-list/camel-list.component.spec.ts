import { FormBuilder, Validators } from '@angular/forms';

describe('Tesztek', () => {
  it('Ures', () => {
    const fb = new FormBuilder();
    const form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      humpCount: [null, [Validators.required]]
    });

    expect(form.valid).toBe(false);
  });

  it('Kotelezo_Nev', () => {
    const fb = new FormBuilder();
    const form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });

    const nameField = form.controls['name'];
    nameField.setValue('');
    expect(nameField.hasError('required')).toBe(true);
  });

  it('Min_2_Char', () => {
    const fb = new FormBuilder();
    const form = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });

    const nameField = form.controls['name'];
    nameField.setValue('A');
    expect(nameField.hasError('minlength')).toBe(true);
    
    nameField.setValue('Te');
    expect(nameField.valid).toBe(true);
  });

  it('Pup_Mezo', () => {
    const fb = new FormBuilder();
    const form = fb.group({
      humpCount: [null, [Validators.required]]
    });

    const humpField = form.controls['humpCount'];
    humpField.setValue(null);
    expect(humpField.hasError('required')).toBe(true);
  });
});