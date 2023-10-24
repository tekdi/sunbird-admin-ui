import * as React from 'react'
import {Button} from '@deepalilodhi/react-bulk-upload-1'

const BulkUpload = () =>{
return (
<div>
<Button buttonName={'Upload'} uploadUrl={"/bulkupload/ops-tool-upload"} />
</div>
)
}

export default BulkUpload;