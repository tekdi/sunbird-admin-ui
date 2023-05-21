import { Component} from '@angular/core';
//import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-add-or-edit-org',
  templateUrl: './add-or-edit-org.component.html',
  styleUrls: ['./add-or-edit-org.component.scss']
})
export class AddOrEditOrgComponent {
  addEditOrgForm!:FormGroup;

  constructor(public formBuilder:FormBuilder){

  }
  ngOnInit(){
    this.initializeForm();

  }
  initializeForm() {
    this.addEditOrgForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      phone: ['', Validators.pattern("[0-9]{10}")],
      password: ['', Validators.required],
     
    })
  }
}

