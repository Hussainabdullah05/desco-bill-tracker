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



    const billsAmount =
    data.map(row=>Number(row[18]));




    createUsageChart(
        months,
        units
    );



    createBillChart(
        months,
        billsAmount
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

            labels:labels,

            datasets:[{

                label:"kWh Usage",

                data:data,

                tension:0.3

            }]

        },

        options:{

            responsive:true

        }


    });


}



function createBillChart(labels,data){


    const canvas =
    document.createElement("canvas");


    canvas.id =
    "billChart";


    document
    .querySelector("#charts .card")
    .appendChild(canvas);



    if(billChart)
    billChart.destroy();



    billChart =
    new Chart(
        canvas,
        {

        type:"bar",

        data:{

            labels:labels,

            datasets:[{

                label:"Monthly Bill",

                data:data

            }]

        },

        options:{

            responsive:true

        }


    });


}
