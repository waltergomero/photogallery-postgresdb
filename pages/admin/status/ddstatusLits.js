import { useState, useEffect } from 'react';
import { statusService } from '@/services/status.service';

export default function StatusDDList(props) {
    const [ddlist, setDDList] = useState(null);
    console.log("ddlist props: ", props)

    useEffect(() => {
        statusService.getDDList().then(x => setDDList(x));
    }, []);


    //On the change event for the select box pass the selected value back to the parent
    const handleChange = (event) =>
    {
        props.onSelectChange(event.target.value);
    }
   
    return (       
        <>
       <select 
        name="status_id" 
        required
        className="w-full px-4 py-1 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"  
        onChange={handleChange} 
        value={props.selectedValue} >
            <option value=""></option>
            {ddlist && ddlist.map((d) => <option key={d.status_id}  value={d.status_id}>{d.status_name}</option>)}
        </select>
        </>
    ) 
}
StatusDDList.layout = "Admin";

