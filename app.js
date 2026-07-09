console.log("APP JS TERBACA");


const API_URL =
"https://script.google.com/macros/s/AKfycbw2mF6o7wNDA9ZOR1kULysqfFiAD_jxTBY-PRRhsKNKgOYpRHwEir7a9MPcaI5K6Q-o/exec";



// ==============================
// LOAD DASHBOARD
// ==============================

function loadDashboard(){


    console.log("LOAD DASHBOARD");


    const script = document.createElement("script");


    script.src =
    `${API_URL}?action=getDashboard&callback=handleDashboard`;



    document.body.appendChild(script);



}


// ==============================
// LOAD TRANSACTIONS
// ==============================

function loadTransactions(){


    console.log("LOAD TRANSACTIONS");


    const script = document.createElement("script");


    script.src =
    `${API_URL}?action=getTransactions&callback=handleTransactions`;


    document.body.appendChild(script);


}




function handleTransactions(result){


    console.log("TRANSACTIONS:");
    console.log(result);



    if(result.success){


        renderTransactions(
            result.data
        );


    }


}




// ==============================
// CALLBACK DARI APPSCRIPT
// ==============================

function handleDashboard(result){


    console.log("HASIL API:");
    console.log(result);



    if(result.success){


        const data = result.data;



        document.getElementById(
            "totalSaldo"
        ).innerHTML =
        formatRupiah(data.totalSaldo);



        document.getElementById(
            "totalIncome"
        ).innerHTML =
        formatRupiah(data.totalIncome);



        document.getElementById(
            "totalExpense"
        ).innerHTML =
        formatRupiah(data.totalExpense);



        console.log(
            "SALDO BANK:",
            data.saldoBank
        );


        renderBanks(
            data.saldoBank
        );


    }


}






// ==============================
// RENDER BANK
// ==============================

function renderBanks(data){


    console.log("MASUK RENDER BANK");


    let html = "";



    data.forEach(bank=>{


        html += `

        <div class="bank-item">


            <div>
                🏦 ${bank.Bank}
            </div>


            <strong>
                ${formatRupiah(bank.Saldo)}
            </strong>


        </div>

        `;


    });



    document.getElementById(
        "bankList"
    ).innerHTML = html;



}

function renderTransactions(data){


    let html = "";



    data.slice(0,5).forEach(trx=>{


        html += `


        <div class="transaction-item">


            <div>


                <b>
                ${trx.Jenis}
                </b>


                <br>


                <small>
                ${trx.Tanggal}
                ${trx.Jam}
                </small>


                <br>


                ${trx.Keterangan}


            </div>




            <strong>

            ${formatRupiah(trx.Nominal)}

            </strong>



        </div>


        `;


    });



    document.getElementById(
        "transactionList"
    ).innerHTML = html;



}




// ==============================
// FORMAT RUPIAH
// ==============================

function formatRupiah(number){


    return new Intl.NumberFormat(
        "id-ID",
        {
            style:"currency",
            currency:"IDR",
            maximumFractionDigits:0
        }

    ).format(number);


}




// START

loadDashboard();
loadTransactions();
