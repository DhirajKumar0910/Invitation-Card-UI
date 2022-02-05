import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { ContentControl, ContentDTO, conToContentDTO } from '../model/content';
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
  file!: File
  createInvRes!: CreateInvResp;
  successMessage!: string | null;
  errorMessage!: string | null; 
  countArr: number[] = [0];

  constructor(private formBuilder: FormBuilder, private createInvServ: CreateinvitationService) { }

  ngOnInit(): void {
    this.createSingleInvForm = this.formBuilder.group({
      file: [null, [Validators.required, requiredFileType(['pdf'])]],
      inviteeName: ['', Validators.required],
      inviteeCity: ['', Validators.required],
      contentSet: this.formBuilder.array([])
    });
  }

  createSingleInvitation(){
    let invitation = new InvitationDTO();
    invitation.inviteeName = this.createSingleInvForm.get('inviteeName')?.value;
    invitation.inviteeCity = this.createSingleInvForm.get('inviteeCity')?.value;
    let contentContList: ContentControl[] = this.createSingleInvForm.get('contentSet')?.value;
    this.file = this.createSingleInvForm.get('file')?.value.item(0);

    let fontFileArray: File[] = [];
    for(let contentCont of contentContList){
      let contentDTO: ContentDTO = conToContentDTO(contentCont);
      invitation.contentList.push(contentDTO);
      if(contentCont.fontFile){
        contentDTO.fontFileProv = true;
        fontFileArray.push(contentCont.fontFile[0]);
      }
    }
    
    this.createInvServ.createSingleInvitation(invitation, this.file, fontFileArray).subscribe(
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

  addCounter() {
    this.countArr.push(0);
  }


}

export function requiredFileType( type: string[] ): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const file = control.value;
    if ( file ) {
      let fileName: String = file.item(0).name;
      let array = fileName.split('.');
      const extension = array[array.length-1].toLowerCase();
      let returnVal!: any;
      for(let ext of type){
        if(ext.toLowerCase() === extension.toLowerCase()){
          returnVal = null;
          break;
        } else {
          returnVal = {wrongExt: extension};
        }
      }
      return returnVal;
    }
    return {wrongExt: ''}
  }

}