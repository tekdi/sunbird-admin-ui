import { Component, SimpleChanges } from '@angular/core';
import React from 'react';
import ReactDOM from 'react-dom';
import BulkUpload from './BulkUpload';


@Component({
selector: 'app-bulk-upload',
template: '<div [id]="bulkUploadId"></div>', // Use 'template' instead of 'templateUrl'
styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent {
public bulkUploadId = 'bulkUploadId'


ngOnChanges(changes: SimpleChanges){
this.render();
}


ngAfterViewInit(){
this.render();
}


ngOnDestroy(){


}


private render(){
ReactDOM.render(React.createElement(BulkUpload), document.getElementById(this.bulkUploadId));
}
}
