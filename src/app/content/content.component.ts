import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CreateinvitationService } from '../home/createinvitation.service';
import { requiredFileType } from '../home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  contentForm!: FormGroup;
  fontDDEnabled!: boolean;
  fontFileEnabled!: boolean;
  fontTypeList!: string[];
  getFTErrMsg!: boolean;
  contentSet!: FormArray;

  constructor(private formBuilder: FormBuilder, private createInvServ: CreateinvitationService) { }

  @Input() parentForm!: FormGroup;
  @Input() contentIndex!: number;
  @Input() counterArr!: number[];

  ngOnInit(): void {
    this.contentForm = this.formBuilder.group({
      pageNo: [0, [Validators.min(1), Validators.required]],
      fontRadio: [null, Validators.required],
      fontSize: [0, [Validators.min(2), Validators.max(72), Validators.required]],
      fontColor: ['', [Validators.required, Validators.pattern("#([A-Fa-f0-9]{3}){1,2}")]],
      xcoOrd: [0, Validators.required],
      ycoOrd: [0, Validators.required],
      content: ['', Validators.required]
    });
    this.contentSet = this.parentForm.get('contentSet') as FormArray;
    this.contentSet.push(this.contentForm);
  }

  radioChange(event: any){
    if(event.target.value==="DD"){
      this.fontDDEnabled = true;
      this.fontFileEnabled = !this.fontDDEnabled;
      this.contentForm.addControl('fontName', this.formBuilder.control('', Validators.required));
      if(this.contentForm.contains('fontFile')){
        this.contentForm.removeControl('fontFile');
      }
      this.createInvServ.getFontTypes().subscribe(
      (response)=>{
        this.fontTypeList = response;
      },
      (errorResponse)=>{
        this.getFTErrMsg = errorResponse.error.message;
      });
    } else if (event.target.value==="File") {
      this.fontDDEnabled = false;
      this.fontFileEnabled = !this.fontDDEnabled;
      this.contentForm.addControl('fontFile', this.formBuilder.control(null, requiredFileType(['ttf','otf'])));
      if(this.contentForm.contains('fontName')){
        this.contentForm.removeControl('fontName');
      }
    }
  }

  fontNameChange(){
    this.contentForm.get('fontName')?.setValidators(Validators.required);
  }

  fontFileChange(){
    this.contentForm.get('fontFile')?.setValidators(requiredFileType(['ttf','otf']));
  }

  decrContCount(){
    this.contentSet = this.parentForm.get('contentSet') as FormArray;
    this.contentSet.removeAt(this.contentIndex);
    this.counterArr.splice(this.contentIndex, 1);
  }

}
