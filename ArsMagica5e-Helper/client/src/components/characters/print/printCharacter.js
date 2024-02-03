import React from "react";
import {PDFDocument, setFontAndSize} from 'pdf-lib';

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
        sagaField.addToPage(page, {x: 290, y: 2200-340, width:300, height:40});

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
        
        let endLineX = 1469 
        fieldHeight = 30;
        const birthNameField = form.createTextField('character.birth_name');
        birthNameField.setText(''); 
        birthNameField.addToPage(page, {x: 1034, y: 2200-490-fieldHeight/2, width:1469-1034, height:fieldHeight});
        
        const yearBornField = form.createTextField('character.year_born');
        yearBornField.setText(''); 
        yearBornField.addToPage(page, {x: 1015, y: 2200-525-fieldHeight/2, width:1469-1015, height:fieldHeight});
        
        const genderField = form.createTextField('character.gender');
        genderField.setText(''); 
        genderField.addToPage(page, {x: 985, y: 2200-560-fieldHeight/2, width:1469-985, height:fieldHeight});
        
        const nationalityField = form.createTextField('character.nationality');
        nationalityField.setText(''); 
        nationalityField.addToPage(page, {x: 1085, y: 2200-595-fieldHeight/2, width:1469-1085, height:fieldHeight});
        
        const originPlaceField = form.createTextField('character.origin_place');
        originPlaceField.setText(''); 
        originPlaceField.addToPage(page, {x: 1085, y: 2200-628-fieldHeight/2, width:1469-1085, height:fieldHeight});
        
        const religionField = form.createTextField('character.religion');
        religionField.setText(''); 
        religionField.addToPage(page, {x: 998, y: 2200-663-fieldHeight/2, width:1469-998, height:fieldHeight});
        
        const professionField = form.createTextField('character.profession');
        professionField.setText(''); 
        professionField.addToPage(page, {x: 1085, y: 2200-695-fieldHeight/2, width:1469-1085, height:fieldHeight});
        
        const heightField = form.createTextField('character.height');
        heightField.setText(''); 
        heightField.addToPage(page, {x: 980, y: 2200-730-fieldHeight/2, width:1144-980, height:fieldHeight});
        
        const weightField = form.createTextField('character.weight');
        weightField.setText(''); 
        weightField.addToPage(page, {x: 1278, y: 2200-730-fieldHeight/2, width:1469-1278, height:fieldHeight});
        
        fieldHeight = 26;
        const hairDescField = form.createTextField('character.hair_desc');
        hairDescField.setText(''); 
        hairDescField.addToPage(page, {x: 948, y: 2200-762-fieldHeight/2, width:1144-948, height:fieldHeight});
        
        const eyesDescField = form.createTextField('character.eyes_desc');
        eyesDescField.setText(''); 
        eyesDescField.addToPage(page, {x: 1238, y: 2200-762-fieldHeight/2, width:1469-1238, height:fieldHeight});
        
        fieldHeight = 30;
        const handednessField = form.createTextField('character.handedness');
        handednessField.setText(''); 
        handednessField.addToPage(page, {x: 1039, y: 2200-800-fieldHeight/2, width:1469-1039, height:fieldHeight});
        

        fieldHeight = 40;
        const decreptitudeField = form.createTextField('character.decreptitude');
        decreptitudeField.setText(''); 
        decreptitudeField.addToPage(page, {x: 396, y: 2200-586-fieldHeight/2, width:80, height:fieldHeight});

        fieldHeight = 190;
        const decreptitudeListField = form.createTextField('character.decreptitude_list');
        let da = decreptitudeListField.acroField.getDefaultAppearance() ?? '';
        let newDa = da + '\n' + setFontAndSize('Courier', 20).toString(); 
        decreptitudeListField.acroField.setDefaultAppearance(newDa);
        decreptitudeListField.enableMultiline();
        decreptitudeListField.setText(''); 
        decreptitudeListField.addToPage(page, {setFontSize:2,x: 221, y: 2200-736-fieldHeight/2, width:265, height:fieldHeight});


        fieldHeight = 40;
        const warpingField = form.createTextField('character.warping');
        warpingField.setText(''); 
        warpingField.addToPage(page, {x: 680, y: 2200-586-fieldHeight/2, width:130, height:fieldHeight});

        fieldHeight = 190;
        const warpingListField = form.createTextField('character.warping_list');
        da = warpingListField.acroField.getDefaultAppearance() ?? '';
        newDa = da + '\n' + setFontAndSize('Courier', 20).toString(); 
        warpingListField.acroField.setDefaultAppearance(newDa);
        warpingListField.enableMultiline();
        warpingListField.setText(''); 
        warpingListField.addToPage(page, {x: 550, y: 2200-736-fieldHeight/2, width:265, height:fieldHeight});

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

        fieldHeight = 280;
        const virtuesField = form.createTextField('character.virtues');
        da = virtuesField.acroField.getDefaultAppearance() ?? '';
        newDa = da + '\n' + setFontAndSize('Courier', 20).toString(); 
        virtuesField.acroField.setDefaultAppearance(newDa);
        virtuesField.enableMultiline();
        virtuesField.setText(''); 
        virtuesField.addToPage(page, {x: 220, y: 2200-1515-fieldHeight/2, width:600, height:fieldHeight});

        fieldHeight = 280;
        const flawsField = form.createTextField('character.flaws');
        da = flawsField.acroField.getDefaultAppearance() ?? '';
        newDa = da + '\n' + setFontAndSize('Courier', 20).toString(); 
        flawsField.acroField.setDefaultAppearance(newDa);
        flawsField.enableMultiline();
        flawsField.setText(''); 
        flawsField.addToPage(page, {x: 220, y: 2200-1845-fieldHeight/2, width:600, height:fieldHeight});


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