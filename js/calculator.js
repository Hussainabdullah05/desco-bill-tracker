let tariffs=[];
let settings={};



function loadTariffs(data){

    tariffs=data
    .slice(1)
    .map(row=>({

        from:Number(row[1]),
        to:Number(row[2]),
        rate:Number(row[3])

    }));

}





function loadSettings(data){


    settings={};


    data
    .slice(1)
    .forEach(row=>{


        settings[row[0]]
        =
        Number(row[1]);


    });


}







function calculateBill(units){


    units=Number(units);


    let remaining=units;

    let energy=0;


    let result={};



    tariffs.forEach((slab,index)=>{


        let available =
        slab.to-slab.from+1;


        let used =
        Math.min(
            Math.max(remaining,0),
            available
        );



        let cost =
        used * slab.rate;



        result[`slab${index+1}Units`]
        =
        used;



        result[`slab${index+1}Cost`]
        =
        cost;



        energy += cost;


        remaining -= used;


    });




    result.energyCharge =
    energy;



    result.vat =
    energy *
    (settings["VAT"]/100);



    result.meterRent =
    settings["Meter Rent"] || 0;



    result.otherCharges =
    settings["Other Charges"] || 0;



    result.totalBill =
    result.energyCharge +
    result.vat +
    result.meterRent +
    result.otherCharges;



    return result;


}
