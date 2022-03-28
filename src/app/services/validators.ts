import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ageValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (!control.value) return null;
  const dobInSeconds = (control.value as Date).getTime() / 1000;
  const nowInSeconds = new Date().getTime() / 1000;
  const fifteenYearsInSeconds = 473353890;
  if (nowInSeconds - dobInSeconds < fifteenYearsInSeconds)
    return { lessThanFifteen: true };
  return null;
}
