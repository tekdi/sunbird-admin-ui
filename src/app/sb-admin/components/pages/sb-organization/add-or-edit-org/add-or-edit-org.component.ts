import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-add-or-edit-org',
  templateUrl: './add-or-edit-org.component.html',
  styleUrls: ['./add-or-edit-org.component.scss']
})
export class AddOrEditOrgComponent {
  addEditOrgForm!:FormGroup;
  submitted :boolean=false;

  constructor(public formBuilder:FormBuilder,public ref: DynamicDialogRef,){
    this.addEditOrgForm = this.formBuilder.group({
      orgName: ['', Validators.required],
      description: ['', Validators.required],
      channel: ['', Validators.required],
      organisationType: ['', Validators.required],
    })

  }
  ngOnInit(){
  }

  cancel() {
    this.ref.close();
  }

  saveOrg(){
    this.submitted=true;
    //console.log(this.addEditOrgForm.value);
  }
}

