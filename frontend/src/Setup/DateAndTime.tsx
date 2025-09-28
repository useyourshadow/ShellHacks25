import { DatePicker } from "../DatePicker";
import { useState } from "react";

export default function DateAndTime(){
    const [date, setDate] = useState("");
    return(
        <DatePicker value = {date} onChange = {setDate}></DatePicker>
    )
}