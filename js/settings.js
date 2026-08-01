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
    currentSettings["VAT"] || 0;



    document
    .getElementById("meterRentInput")
    .value =
    currentSettings["Meter Rent"] || 0;



    document
    .getElementById("otherChargesInput")
    .value =
    currentSettings["Other Charges"] || 0;



}
