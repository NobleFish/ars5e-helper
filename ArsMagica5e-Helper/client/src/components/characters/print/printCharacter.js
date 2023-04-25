import React from "react";
import {PDFDocument} from 'pdf-lib';

const cs_pg1 = require('./pdf_base/Ar5eCS-1.png');
const cs_pg2 = require('./pdf_base/Ar5eCS-2.png');
const cs_pg3 = require('./pdf_base/Ar5eCS-3.png');
const cs_pg4 = require('./pdf_base/Ar5eCS-4.png');
const cs_pdf = require('./pdf_base/Ar5eCS.pdf');


export function PrintCharacter(){

    async function createForm() {
        const pdfDoc = await PDFDocument.create();
      
        const page = pdfDoc.addPage([1700, 2200]);
      
        const pngImageBytes = await fetch(cs_pg1).then((res) => res.arrayBuffer());
        const pngImage = await pdfDoc.embedPng(pngImageBytes);


        const form = pdfDoc.getForm();
            
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: 1700,
            height: 2200,
        });

        const characterNameField = form.createTextField('character.name');
        characterNameField.setText(''); 
        characterNameField.addToPage(page, {x: 405, y: 2200-240, width:450, height:50});
        
        const playerNameField = form.createTextField('character.pname');
        playerNameField.setText(''); 
        playerNameField.addToPage(page, {x: 285, y: 2200-275, width:300, height:30});

        const sagaField = form.createTextField('character.saga');
        sagaField.setText(''); 
        sagaField.addToPage(page, {x: 290, y: 2200-340, width:300, height:50});

        const settingField = form.createTextField('character.setting');
        settingField.setText(''); 
        settingField.addToPage(page, {x: 295, y: 2200-375, width:200, height:30});
        
        const currYearField = form.createTextField('character.currYear');
        currYearField.setText(''); 
        currYearField.addToPage(page, {x: 295+378, y: 2200-375, width:100, height:30});
        
        let fieldHeight = 50;
        const covenantField = form.createTextField('character.covenant');
        covenantField.setText(''); 
        covenantField.addToPage(page, {x: 340, y: 2200-425-fieldHeight/2, width:100, height:fieldHeight});
        
        fieldHeight = 50;
        const ageField = form.createTextField('character.age');
        ageField.setText(''); 
        ageField.addToPage(page, {x: 275, y: 2200-490-fieldHeight/2, width:100, height:fieldHeight});
        
        fieldHeight = 50;
        const cSizeField = form.createTextField('character.size');
        cSizeField.setText(''); 
        cSizeField.addToPage(page, {x: 480, y: 2200-490-fieldHeight/2, width:100, height:fieldHeight});

        fieldHeight = 50;
        const confidenceField = form.createTextField('character.confidence');
        confidenceField.setText(''); 
        confidenceField.addToPage(page, {x: 755, y: 2200-490-fieldHeight/2, width:100, height:fieldHeight});
        
        

        let loopGap = 33.3;
        for(let i = 0; i < 30; i++){
            
            fieldHeight = 26;
            let fieldNameText = "character.ability"+i+"_exp";
            const abilityExpField = form.createTextField(fieldNameText);
            abilityExpField.setText(''); 
            abilityExpField.addToPage(page, {x: 896, y: 2200-993-fieldHeight/2-loopGap*i, width:33, height:fieldHeight});

            fieldHeight = 26;
            fieldNameText = "character.ability"+i+"_name";
            const abilityNameField = form.createTextField(fieldNameText);
            abilityNameField.setText(''); 
            abilityNameField.addToPage(page, {x: 950, y: 2200-993-fieldHeight/2-loopGap*i, width:200, height:fieldHeight});

            fieldHeight = 26;
            fieldNameText = "character.ability"+i+"_specialty";
            const abilitySpecialtyField = form.createTextField(fieldNameText);
            abilitySpecialtyField.setText(''); 
            abilitySpecialtyField.addToPage(page, {x: 1174, y: 2200-993-fieldHeight/2-loopGap*i, width:200, height:fieldHeight});

            fieldHeight = 26;
            fieldNameText = "character.ability"+i;
            const abilityScoreField = form.createTextField(fieldNameText);
            abilityScoreField.setText(''); 
            abilityScoreField.addToPage(page, {x: 1398, y: 2200-993-fieldHeight/2-loopGap*i, width:70, height:fieldHeight});

        }

        loopGap = 33.3;
        let characteristic = ["int","per","str","sta","pre","com","dex","qik"]
        for(let i = 0; i < 8; i++){
            fieldHeight = 26;
            let chaDescText = "character."+characteristic[i]+"_desc";
            const chaDescField = form.createTextField(chaDescText);
            chaDescField.setText(''); 
            chaDescField.addToPage(page, {x: 510, y: 2200-993-fieldHeight/2-loopGap*i, width:200, height:fieldHeight});

            let chaScoreText = "character."+characteristic[i];
            const chaScoreField = form.createTextField(chaScoreText);
            chaScoreField.setText(''); 
            chaScoreField.addToPage(page, {x: 733, y: 2200-993-fieldHeight/2-loopGap*i, width:80, height:fieldHeight});

        }



        const pdfBytes = await pdfDoc.save();
        openInNewWindow(pdfBytes);
        
    }
    
    

    function openInNewWindow(pdfBlob){
        var myBlob= new Blob([pdfBlob], {type: 'application/pdf'});
        const fileUrl = URL.createObjectURL(myBlob);    

        const iframe = document.createElement('iframe');
        iframe.src = fileUrl;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = 'none';

        const newWindow = window.open('', '_blank');
        newWindow.document.body.appendChild(iframe);
        newWindow.document.title = 'My Custom Title';
    }

    function generatePDF(){
        createForm();
    }

    

    return(
        <div>
            
            <button className="btn btn-dark" onClick={generatePDF}>Generate PDF</button>
        </div>
    )
};