let usageChart;
let billChart;



async function loadCharts(){


    const bills =
    await getBills();



    if(bills.length <= 1)
    return;



    const data =
    bills.slice(1);



    const months =
    data.map(row=>row[0]);



    const units =
    data.map(row=>Number(row[1]));



    const billValues =
    data.map(row=>Number(row[18]));





    // Summary calculations


    const avgUsage =
    units.reduce((a,b)=>a+b,0)
    /
    units.length;



    const avgBill =
    billValues.reduce((a,b)=>a+b,0)
    /
    billValues.length;




    document
    .getElementById("avgUsage")
    .textContent =
    avgUsage.toFixed(1)
    +
    " kWh";



    document
    .getElementById("avgBill")
    .textContent =
    "৳ "
    +
    avgBill.toFixed(2);






    createUsageChart(
        months,
        units
    );



    createBillChart(
        months,
        billValues
    );


}







function createUsageChart(labels,data){


    const ctx =
    document
    .getElementById("usageChart");



    if(usageChart)
    usageChart.destroy();



    usageChart =
    new Chart(
        ctx,
        {

        type:"line",

        data:{

            labels,

            datasets:[{

                label:"kWh",

                data,

                tension:0.3

            }]

        },

        options:{

            responsive:true

        }


    });


}








function createBillChart(labels,data){


    const ctx =
    document
    .getElementById("billChart");



    if(billChart)
    billChart.destroy();



    billChart =
    new Chart(
        ctx,
        {

        type:"bar",

        data:{

            labels,

            datasets:[{

                label:"Bill (৳)",

                data

            }]

        },


        options:{

            responsive:true

        }


    });


}
