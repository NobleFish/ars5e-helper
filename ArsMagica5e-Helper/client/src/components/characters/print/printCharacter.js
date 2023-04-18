import React from "react";
import { jsPDF } from "jspdf";

const cs_pg1 = require('./pdf_base/Ar5eCS-1.png');


export function PrintCharacter(){

    var doc = new jsPDF('portrait',"px",[1700,2200]);
    var {ComboBox,ListBox,CheckBox,PushButton,TextField,PasswordField,RadioButton, Appearance} = jsPDF.AcroForm;

    function generatePDF(){
        
        doc.addImage(cs_pg1, "PNG", 0, 0, 1700, 2200);
        doc.output('dataurlnewwindow');
        
    }


    return(
        <div>
            
            <button className="btn btn-dark" onClick={generatePDF}>Generate PDF</button>
        </div>
    )
};