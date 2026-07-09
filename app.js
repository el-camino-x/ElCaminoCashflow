console.log("APP JS TERBACA");


const API_URL =
"https://script.google.com/macros/s/AKfycbwcVVx3BsjlcoDA0xzOQIIW_fm3dfklTkxDgqDlMdR1INBGuVBqKqBlopaD24SWR1Oz/exec";


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


        const isIncome = trx.Jenis === "Income";


        const typeClass = isIncome
            ? "income"
            : "expense";


        const icon = isIncome
            ? "🟢"
            : "🔴";


        const amount = isIncome
            ? "+ " + formatRupiah(trx.Nominal)
            : "- " + formatRupiah(trx.Nominal);



        html += `


        <div class="transaction-item">


            <div class="transaction-left">


                <div class="transaction-icon">

                    ${icon}

                </div>



                <div>


                    <b>
                        ${trx.Keterangan}
                    </b>


                    <small>

                        ${trx.Bank}
                        •
                        ${trx.Category}

                    </small>


                    <small>

                        ${trx.Tanggal}
                        |
                        ${trx.Jam}

                    </small>


                </div>


            </div>





            <strong class="${typeClass}">

                ${amount}

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

function showPage(page){


    const dashboard =
    document.getElementById("dashboardPage");


    const bank =
    document.getElementById("bankPage");



    if(page === "bankPage"){


        dashboard.style.display="none";


        bank.style.display="block";


        loadBanks();


    }




    if(page === "dashboardPage"){


        dashboard.style.display="block";


        bank.style.display="none";


    }


}

function loadBanks(){


    const script = document.createElement("script");


    script.src =
    `${API_URL}?action=getBanks&callback=handleBanks`;


    document.body.appendChild(script);


}



function handleBanks(result){


    console.log("BANK DATA");
    console.log(result);



    if(result.success){


        renderBankPage(
            result.data
        );


    }


}



function renderBankPage(data){


    let html="";


    data.forEach(bank=>{


        html += `


        <div class="bank-item"
        onclick="openBankDetail(${bank.ID})">


            <b>
                🏦 ${bank.Bank}
            </b>


            <br>


            ${bank["Nama Pemilik"]}


            <br>


            Rekening:
            ${bank["No Rekening"]}


            <br>


            <button>
                Lihat Detail
            </button>


        </div>


        `;


    });



    document.getElementById(
        "bankPageList"
    ).innerHTML = html;


}

function openBankDetail(id){


    console.log(
        "OPEN BANK DETAIL",
        id
    );


    const script =
    document.createElement("script");


    script.src =
    `${API_URL}?action=getBankDetail&id=${id}&callback=handleBankDetail`;


    document.body.appendChild(script);


}




function handleBankDetail(result){


    console.log(
        "BANK DETAIL",
        result
    );


}


// START

loadDashboard();
loadTransactions();
