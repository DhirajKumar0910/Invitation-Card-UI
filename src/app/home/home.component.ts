import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CreateInvResp } from '../model/create-inv-resp';
import { InvitationDTO } from '../model/invitation';
import { CreateinvitationService } from './createinvitation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createSingleInvForm!: FormGroup;
  contentSet!: FormArray;
  file!: File
  createInvRes!: CreateInvResp;
  successMessage!: string | null;
  errorMessage!: string | null; 
  getFTErrMsg!: boolean;
  fontDDEnabled!: boolean;
  fontFileEnabled!: boolean; 
  fontTypeList!: string[];
  constructor(private formBuilder: FormBuilder, private createInvServ: CreateinvitationService) { }

  ngOnInit(): void {
    this.createSingleInvForm = this.formBuilder.group({
      file: [null, [Validators.required, requiredFileType('pdf')]],
      inviteeName: ['', Validators.required],
      inviteeCity: ['', Validators.required],
      contentSet: this.formBuilder.array([])
    });
  }

  createContentSet(): FormGroup {
    return this.formBuilder.group({
      pageNo: [0, [Validators.min(1), Validators.required]],
      fontType: ["", fontTypeValidator()],
      fontFile: [null, [Validators.required, requiredFileType('ttf')]],
      fontSize: [0, [Validators.min(2), Validators.max(72), Validators.required]],
      fontColor: ['', [Validators.required, Validators.pattern("#([A-Fa-f0-9]{3}){1,2}")]],
      xcoOrd: [0, Validators.required],
      ycoOrd: [0, Validators.required],
      content: ['', Validators.required]
    });
  }

  createSingleInvitation(){
    const invitation = new InvitationDTO();
    invitation.inviteeName = this.createSingleInvForm.get('inviteeName')?.value;
    invitation.inviteeCity = this.createSingleInvForm.get('inviteeCity')?.value;
    invitation.contentList = this.createSingleInvForm.get('contentSet')?.value;
    this.file = this.createSingleInvForm.get('file')?.value.item(0);
    this.createInvServ.createSingleInvitation(invitation, this.file).subscribe(
      (response)=>{
        this.createInvRes = response;
        if(this.createInvRes.isSuccess){
          this.successMessage = this.createInvRes.message;
          this.errorMessage = null;
        } else {
          this.errorMessage = this.createInvRes.message;
          this.successMessage = null;
        }
      },
      (errorResponse)=>{
        this.errorMessage = errorResponse.error.message;
        this.successMessage = null;
      }
    )
  }

  radioChange(event: any){
    if(event.target.value==="DD"){
      this.fontDDEnabled = true;
      this.fontFileEnabled = !this.fontDDEnabled;
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
    }
  }

  decrContCount(i: number){
    this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
    this.contentSet.removeAt(i);
  }

  addContCount(){
    this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
    this.contentSet.push(this.createContentSet());
  }

  getContentSet(){
    this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
    return this.contentSet;
  }

}

export function fontTypeValidator (){
  return function (control: FormControl){
    let fontType = control.value;
    if(fontType === ""){
      return {
        fontValidator: true
      };
    }
    return null;
  };
}

export function requiredFileType( type: string ) {
  return function (control: FormControl) {
    const file = control.value;
    if ( file ) {
      let fileName: String = file.item(0).name;
      let array = fileName.split('.');
      const extension = array[array.length-1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }
      return null;
    }
    return null;
  };
}