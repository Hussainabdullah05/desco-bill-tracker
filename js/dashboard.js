let currentBill = {};



async function initDashboard(){


    // Load tariff data

    const tariffData =
    await getTariffs();

    loadTariffs(tariffData);



    // Load settings

    const settingsData =
    await getSettings();

    loadSettings(settingsData);




    // Set current month

    const today = new Date();

    document.getElementById("billMonth").value =
    today.toISOString().slice(0,7);





    // Listen for unit changes

    document
    .getElementById("units")
    .addEventListener(
        "input",
        updateCalculation
    );





    // Save button

    document
    .getElementById("saveBtn")
    .addEventListener(
        "click",
        saveCurrentBill
    );



}





function updateCalculation(){


    const units =
    document.getElementById("units").value;



    if(!units){

        updateDashboard({
            totalBill:0,
            energyCharge:0,
            vat:0,
            meterRent:0,
            otherCharges:0
        });

        return;

    }



    currentBill =
    calculateBill(units);



    currentBill.units =
    Number(units);



    updateDashboard(currentBill);


}





function updateDashboard(bill){



    document
    .getElementById("totalBill")
    .textContent =
    bill.totalBill.toFixed(2);




    document
    .getElementById("energyCharge")
    .textContent =
    "৳ " + bill.energyCharge.toFixed(2);




    document
    .getElementById("vat")
    .textContent =
    "৳ " + bill.vat.toFixed(2);




    document
    .getElementById("meterRent")
    .textContent =
    "৳ " + bill.meterRent.toFixed(2);




    document
    .getElementById("otherCharges")
    .textContent =
    "৳ " + bill.otherCharges.toFixed(2);




    if(bill.units){

        document
        .getElementById("totalUnits")
        .textContent =
        bill.units + " kWh";



        document
        .getElementById("averageDaily")
        .textContent =
        (bill.units/30).toFixed(2)
        + " kWh";

    }


}







async function saveCurrentBill(){



    const month =
    document.getElementById("billMonth").value;



    if(!currentBill.units){

        alert(
        "Please enter consumption"
        );

        return;

    }




    const data={

        month:month,

        ...currentBill

    };




    const result =
    await saveBill(data);




    if(result.success){


        if(result.action==="created"){

            alert(
            "New bill saved"
            );

        }
        else{

            alert(
            "Existing bill updated"
            );

        }


    }



}

