import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
  }]
})
export class FileUploadComponent implements ControlValueAccessor {
  onChange!: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: File ) {
    const file = event;
    this.onChange(file);
    this.file = file;
  }

  constructor(@Inject(ElementRef) private host: ElementRef<HTMLInputElement> ) {
  }

 

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

}
