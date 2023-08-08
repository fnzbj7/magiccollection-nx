import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-toggle-switch',
    templateUrl: './toggle-switch.component.html',
    // styleUrls: ['./toggle-switch.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ToggleSwitchComponent),
            multi: true,
        },
    ],
})
export class ToggleSwitchComponent implements ControlValueAccessor {
    isChecked = false;

    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() change = new EventEmitter<boolean>();

    // Function to call when the toggle receives a change event.
    onChange = (isChecked: boolean) => {
        // Empty
        console.log(this.isChecked);
    };

    // Function to call when the toggle is touched.
    onTouched = () => {
        // Empty
    };

    // Allows Angular to update the isChecked model (update from model -> view).
    writeValue(isChecked: boolean): void {
        this.isChecked = isChecked;
    }

    // Allows Angular to register a change function (view -> model).
    registerOnChange(fn: (isChecked: boolean) => void): void {
        this.onChange = fn;
    }

    // Allows Angular to register a touched function.
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    // Toggle the value and notify changes.
    toggleChange() {
        console.log(this.isChecked);
        // this.isChecked = !this.isChecked;
        this.onChange(this.isChecked);
        this.onTouched();
        this.change.emit(this.isChecked); // Emitting the change event
    }
}
