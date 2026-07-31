let tariffs = [];
let settings = {};

function loadTariffs(tariffData) {

    tariffs = tariffData.slice(1).map(row => ({
        from: Number(row[1]),
        to: Number(row[2]),
        rate: Number(row[3])
    }));

}

function loadSettings(settingData) {

    settings = {};

    for (let i = 1; i < settingData.length; i++) {

        settings[settingData[i][0]] = Number(settingData[i][1]);

    }

}

function calculateBill(units) {

    units = Number(units);

    if (isNaN(units) || units <= 0) {

        return {
            slab1Units:0, slab1Cost:0,
            slab2Units:0, slab2Cost:0,
            slab3Units:0, slab3Cost:0,
            slab4Units:0, slab4Cost:0,
            slab5Units:0, slab5Cost:0,
            slab6Units:0, slab6Cost:0,
            energyCharge:0,
            vat:0,
            meterRent:settings["Meter Rent"] || 0,
            otherCharges:settings["Other Charges"] || 0,
            totalBill:0
        };

    }

    let remaining = units;

    const result = {};

    let energy = 0;

    tariffs.forEach((slab,index)=>{

        const capacity = slab.to - slab.from + 1;

        const used = Math.max(0, Math.min(remaining, capacity));

        const cost = used * slab.rate;

        result[`slab${index+1}Units`] = used;
        result[`slab${index+1}Cost`] = Number(cost.toFixed(2));

        energy += cost;

        remaining -= used;

    });

    result.energyCharge = Number(energy.toFixed(2));

    result.vat =
        Number((energy * (settings["VAT"]/100)).toFixed(2));

    result.meterRent =
        settings["Meter Rent"];

    result.otherCharges =
        settings["Other Charges"];

    result.totalBill =
        Number((
            result.energyCharge +
            result.vat +
            result.meterRent +
            result.otherCharges
        ).toFixed(2));

    return result;

}
