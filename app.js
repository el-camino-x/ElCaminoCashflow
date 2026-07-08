console.log("APP JS TERBACA");


const API_URL =
"https://script.google.com/macros/s/AKfycbygMf0ZrmYsVePR--4EktNHTKwLMBE0gDv5pw5mx0Q9BdnL3T86m3CLijpu2DCiSedB/exec";

// ==============================
// LOAD DASHBOARD
// ==============================

async function loadDashboard(){


    try{


        console.log("LOAD DASHBOARD");


        const response = await fetch(
            `${API_URL}?action=getDashboard`
        );


        const text = await response.text();

        const result = JSON.parse(text);


        console.log("HASIL API:");
        console.log(result);



        if(result.success){


            const data = result.data;



            // TOTAL SALDO

            document.getElementById(
                "totalSaldo"
            ).innerHTML =
            formatRupiah(data.totalSaldo);



            // TOTAL INCOME

            document.getElementById(
                "totalIncome"
            ).innerHTML =
            formatRupiah(data.totalIncome);



            // TOTAL EXPENSE

            document.getElementById(
                "totalExpense"
            ).innerHTML =
            formatRupiah(data.totalExpense);



            console.log("SALDO BANK:");
            console.log(data.saldoBank);



            renderBanks(
                data.saldoBank
            );


        } else {


            console.log(
                "API ERROR:",
                result.message
            );


        }



    }catch(error){


        console.log(
            "FETCH ERROR:",
            error
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





// ==============================
// START
// ==============================

loadDashboard();
