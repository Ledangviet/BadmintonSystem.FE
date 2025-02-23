import { Component , Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputField } from '../../../model/inputfield.model';
import { InputType } from '../../../model/enum';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent {
  @Input() inputFields: InputField[] = [];
  @Output() saveEvent = new EventEmitter<any>();
  inputType = InputType;
  isVisible = false;
  @Input() title: string = 'Popup Title';

  save() {
    const result: { [key: string]: any } = {};
    this.inputFields.forEach(field => {
      result[field.label] = field.value;
    });
    this.saveEvent.emit(result);
    this.close();
  }

  close() {
    this.isVisible = false;
  }

  open() {
    this.isVisible = true;
  }
}