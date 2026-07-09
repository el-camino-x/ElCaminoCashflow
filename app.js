console.log("APP JS TERBACA");


const API_URL =
"https://script.google.com/macros/s/AKfycbygMf0ZrmYsVePR--4EktNHTKwLMBE0gDv5pw5mx0Q9BdnL3T86m3CLijpu2DCiSedB/exec";



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
