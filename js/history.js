async function loadHistory(){


    const container =
    document.getElementById("historyList");


    container.innerHTML =
    "Loading...";



    const bills =
    await getBills();



    if(bills.length <= 1){

        container.innerHTML =
        "No bills saved yet.";

        return;

    }




    let html = "";



    // Remove header and reverse order

    const data =
    bills
    .slice(1)
    .reverse();




    data.forEach(row=>{


        const month =
        row[0];


        const units =
        row[1];


        const bill =
        row[18];



        html += `

        <div class="history-item">


            <div>

                <strong>
                    ${month}
                </strong>

                <br>

                <span>
                    ${units} kWh
                </span>

            </div>


            <div>

                <strong>
                    ৳ ${Number(bill).toFixed(2)}
                </strong>


                <br>


                <button
                onclick="deleteHistoryBill('${month}')">

                Delete

                </button>

            </div>



        </div>

        `;


    });



    container.innerHTML = html;


}








async function deleteHistoryBill(month){



    const confirmDelete =
    confirm(
        "Delete bill for "
        + month
        + "?"
    );



    if(!confirmDelete)
    return;



    const result =
    await deleteBill(month);



    if(result.success){

        alert(
        "Bill deleted"
        );


        loadHistory();

    }



}
