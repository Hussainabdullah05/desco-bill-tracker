let currentSettings = {};



async function loadSettingsPage(){


    const data =
    await getSettings();



    currentSettings={};



    data
    .slice(1)
    .forEach(row=>{

        currentSettings[row[0]]
        =
        Number(row[1]);

    });



    document
    .getElementById("vatInput")
    .value =
    currentSettings["VAT"];



    document
    .getElementById("meterRentInput")
    .value =
    currentSettings["Meter Rent"];



    document
    .getElementById("otherChargesInput")
    .value =
    currentSettings["Other Charges"];





    document
    .getElementById("saveSettingsBtn")
    .onclick =
    saveSettings;



}




async function saveSettings(){


    const data={


        vat:
        Number(
        document.getElementById("vatInput").value
        ),


        meterRent:
        Number(
        document.getElementById("meterRentInput").value
        ),


        otherCharges:
        Number(
        document.getElementById("otherChargesInput").value
        )


    };




    const result =
    await updateSettings(data);



    if(result.success){

        alert(
        "Settings updated"
        );


    }


}
