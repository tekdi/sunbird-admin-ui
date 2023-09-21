import * as React from 'react'

import { useState } from 'react'
import {Button} from '@deepalilodhi/react-bulk-upload-1'


const BulkUpload = () =>{
    return (
        <div>
            <Button buttonName={'Upload'} uploadUrl={"/bulkupload/ops-tool-upload"} cookie={''} reviewerCookie={''}/>
        </div>
    )
}

export default BulkUpload;
