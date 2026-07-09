console.log("APP JS TERBACA");



const API_URL =
"https://script.google.com/macros/s/AKfycbyfHPRLAbsk5JqwW7G_zasV-1tsJoCfFzHxIY7tFKxOforS1xtTCEgTKwLhpiTikb6a/exec";




// ==============================
// LOAD DASHBOARD
// ==============================

function loadDashboard(){


    console.log("LOAD DASHBOARD");


    const script =
    document.createElement("script");


    script.src =
    `${API_URL}?action=getDashboard&callback=handleDashboard`;


    document.body.appendChild(script);


}





// ==============================
// LOAD TRANSACTION
// ==============================


function loadTransactions(){


    console.log("LOAD TRANSACTIONS");


    const script =
    document.createElement("script");


    script.src =
    `${API_URL}?action=getTransactions&callback=handleTransactions`;


    document.body.appendChild(script);


}





// ==============================
// HANDLE TRANSACTION
// ==============================


function handleTransactions(result){


    console.log(
        "TRANSACTIONS:",
        result
    );



    if(result.success){


        renderTransactions(
            result.data
        );


    }


}






// ==============================
// HANDLE DASHBOARD
// ==============================


function handleDashboard(result){


    console.log(
        "HASIL DASHBOARD:",
        result
    );



    if(result.success){


        const data =
        result.data;



        document.getElementById(
            "totalSaldo"
        ).innerHTML =
        formatRupiah(
            data.totalSaldo
        );



        document.getElementById(
            "totalIncome"
        ).innerHTML =
        formatRupiah(
            data.totalIncome
        );



        document.getElementById(
            "totalExpense"
        ).innerHTML =
        formatRupiah(
            data.totalExpense
        );



        renderBanks(
            data.saldoBank
        );


    }


}








// ==============================
// RENDER DASHBOARD BANK
// ==============================


function renderBanks(data){


    let html="";



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









// ==============================
// RENDER RECENT TRANSACTION
// ==============================


function renderTransactions(data){


    let html="";



    data.slice(0,5)
    .forEach(trx=>{


        const income =
        trx.Jenis === "Income";



        const icon =
        income ? "🟢" : "🔴";



        const amount =
        income
        ?
        "+ " + formatRupiah(trx.Nominal)
        :
        "- " + formatRupiah(trx.Nominal);




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


                    <br>


                    <small>

                        ${trx.Bank}
                        -
                        ${trx.Category}

                    </small>



                    <br>


                    <small>

                        ${trx.Tanggal}
                        |
                        ${trx.Jam}

                    </small>



                </div>


            </div>





            <strong>

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
// PAGE ROUTER
// ==============================


function showPage(page){



    document.getElementById(
        "dashboardPage"
    ).style.display="none";



    document.getElementById(
        "bankPage"
    ).style.display="none";



    document.getElementById(
        "bankDetailPage"
    ).style.display="none";







    if(page==="dashboardPage"){


        document.getElementById(
            "dashboardPage"
        ).style.display="block";


    }






    if(page==="bankPage"){


        document.getElementById(
            "bankPage"
        ).style.display="block";


        loadBanks();



    }






    if(page==="bankDetailPage"){


        document.getElementById(
            "bankDetailPage"
        ).style.display="block";


    }





}









// ==============================
// LOAD BANK PAGE
// ==============================


function loadBanks(){



    const script =
    document.createElement("script");



    script.src =
    `${API_URL}?action=getBanks&callback=handleBanks`;



    document.body.appendChild(script);



}







// ==============================
// HANDLE BANK PAGE
// ==============================


function handleBanks(result){



    console.log(
        "BANK DATA",
        result
    );



    if(result.success){


        renderBankPage(
            result.data
        );


    }


}








// ==============================
// RENDER BANK PAGE
// ==============================


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



            <br><br>


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









// ==============================
// OPEN BANK DETAIL
// ==============================


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










// ==============================
// HANDLE BANK DETAIL
// ==============================


function handleBankDetail(result){



    console.log(
        "BANK DETAIL",
        result
    );



    if(result.success){


        showPage(
            "bankDetailPage"
        );



        renderBankDetail(
            result.data
        );



    }



}









// ==============================
// RENDER BANK DETAIL
// ==============================


function renderBankDetail(data){



    document.getElementById(
        "detailBankName"
    ).innerHTML =

    `
    🏦 ${data.bank.Nama}
    `;






    document.getElementById(
        "detailBankInfo"
    ).innerHTML =


    `

    <p>
    Pemilik:
    ${data.bank.Pemilik}
    </p>


    <p>
    Rekening:
    ${data.bank.Rekening}
    </p>


    <h2>

    Saldo:
    ${formatRupiah(data.saldo)}

    </h2>


    `;






    let html="";



    data.transactions.forEach(trx=>{


        const income =
        trx.Jenis==="Income";



        html += `


        <div class="transaction-item">



            <div>


                <b>

                ${trx.Jenis}

                </b>


                <br>


                ${trx.Keterangan}



                <br>


                <small>

                ${trx.Tanggal}
                |
                ${trx.Jam}

                </small>



            </div>




            <strong>


            ${
                income
                ?
                "+ "
                :
                "- "
            }


            ${formatRupiah(trx.Nominal)}



            </strong>



        </div>


        `;



    });




    document.getElementById(
        "detailTransactionList"
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







// ==============================
// START
// ==============================


loadDashboard();

loadTransactions();
