import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  createSingleInvForm!: FormGroup;
  contentCountList: Array<number> = [];
  contentSet!: FormArray;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createSingleInvForm = this.formBuilder.group({
      inviteeName: ['', Validators.required],
      inviteeCity: ['', Validators.required],
      contentSet: this.formBuilder.array([ this.createContentSet() ])
    });
  }

  createContentSet(): FormGroup {
    return this.formBuilder.group({
      pageNo: [0, [Validators.min(1), Validators.required]],
      xcoOrd: [0, Validators.required],
      ycoOrd: [0, Validators.required],
      content: ['', Validators.required]
    });
  }

  decrContCount(i: number){
    this.contentCountList.splice(i, 1);
    this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
    this.contentSet.removeAt(i);
    console.log('contentCountList ' + this.contentCountList.length)
    console.log('contentSet: ' + this.contentSet.length)
  }

  addContCount(){
    this.contentCountList.push(0);
    this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
    this.contentSet.push(this.createContentSet());
    console.log('contentCountList: ' + this.contentCountList.length)
    console.log('contentSet: ' + this.contentSet.length)
  }

  // getContentSet(){
  //   this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
  //   return this.contentSet;
  // }

  // addcontentSet(): void {
  //   this.contentSet = this.createSingleInvForm.get('contentSet') as FormArray;
  //   this.contentSet.push(this.createContentSet());
  //   console.log(this.contentSet)
  // }

}
