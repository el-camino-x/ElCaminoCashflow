console.log("APP JS TERBACA");


const API_URL = 
"https://script.google.com/macros/s/AKfycbz5Bt0QgKY0yIhOv3_3SKM8MogS4c4FdRXBklwl3YuXMAy7cBuoZDw8h1U6Iso37CsL/exec";





async function loadDashboard(){


    try{


        const response = await fetch(
            `${API_URL}?action=getDashboard`
        );


const result = await response.json();

console.log("HASIL API:");
console.log(result);


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



console.log("SALDO BANK:");
console.log(data.saldoBank);


renderBanks(
    data.saldoBank
);


        }



    }catch(error){


        console.log(error);


    }


}





function renderBanks(data){

    console.log("MASUK RENDER BANK");
    console.log(data);


    let html="";


    let html="";


    data.forEach(bank=>{


        html += `

        <div class="bank-item">

            🏦 ${bank.Bank}

            <br>

            <b>
            ${formatRupiah(bank.Saldo)}
            </b>

        </div>

        `;


    });



    document.getElementById(
        "bankList"
    ).innerHTML = html;


}





function formatRupiah(number){


    return new Intl.NumberFormat(
        "id-ID",
        {
            style:"currency",
            currency:"IDR"
        }

    ).format(number);


}





loadDashboard();
