console.log("APP JS TERBACA");

const API_URL="https://script.google.com/macros/s/AKfycbyaE37KIogtOc54wq1LMUUVu4qtrOXozwL0JvzYcAotVfIdgsoS2Ra4nzqz_jPN7ith/exec";

function loadDashboard(){
const script=document.createElement("script");
script.src=`${API_URL}?action=getDashboard&callback=handleDashboard`;
document.body.appendChild(script);
}

function handleDashboard(result){
console.log("DASHBOARD",result);

if(result.success){

const data=result.data;

document.getElementById("totalSaldo").innerHTML=formatRupiah(data.totalSaldo);
document.getElementById("totalIncome").innerHTML=formatRupiah(data.totalIncome);
document.getElementById("totalExpense").innerHTML=formatRupiah(data.totalExpense);

renderBanks(data.saldoBank);

}

}

function loadTransactions(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getTransactions&callback=handleTransactions`;

document.body.appendChild(script);

}

function handleTransactions(result){

console.log("TRANSACTION",result);

if(result.success){

renderTransactions(result.data);

}

}

function renderTransactions(data){

let html="";

data.slice(0,5).forEach(trx=>{

let icon=trx.Jenis==="Income"?"🟢":"🔴";

let sign=trx.Jenis==="Income"?"+":"-";

html+=`

<div class="transaction-item">

<div>

<b>${icon} ${trx.Keterangan}</b>

<br>

<small>${trx.Bank} • ${trx.Category}</small>

<br>

<small>${trx.Tanggal} ${trx.Jam}</small>

</div>

<strong>
${sign} ${formatRupiah(trx.Nominal)}
</strong>

</div>

`;

});

document.getElementById("transactionList").innerHTML=html;

}


function renderBanks(data){

let html="";

data.forEach(bank=>{

html+=`

<div class="bank-item">

<b>🏦 ${bank.Bank}</b>

<br>

${formatRupiah(bank.Saldo)}

</div>

`;

});

document.getElementById("bankList").innerHTML=html;

}


function loadBanks(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getBanks&callback=handleBanks`;

document.body.appendChild(script);

}


function handleBanks(result){

console.log("BANK",result);

if(result.success){

renderBankPage(result.data);

}

}


function renderBankPage(data){

let html="";

data.forEach(bank=>{

html+=`

<div class="bank-item">

<b>🏦 ${bank.Bank}</b>

<br>

Pemilik : ${bank["Nama Pemilik"]}

<br>

Rekening : ${bank["No Rekening"]}

<br>

<button onclick="openBankDetail(${bank.ID})">

Lihat Detail

</button>

</div>

`;

});

document.getElementById("bankPageList").innerHTML=html;

}


function loadCategories(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getCategories&callback=handleCategories`;

document.body.appendChild(script);

}


function handleCategories(result){

console.log("CATEGORY",result);

if(result.success){

renderCategoryPage(result.data);

}

}


function renderCategoryPage(data){

let html="";

data.forEach(cat=>{

let type=cat.Jenis==="Income"?"🟢 Income":"🔴 Expense";

html+=`

<div class="bank-item">

<b>📂 ${cat["Nama Kategori"]}</b>

<br>

${type}

<br>

Status : ${cat.Status}

</div>

`;

});

document.getElementById("categoryPageList").innerHTML=html;

}


function showPage(page){

document.getElementById("dashboardPage").style.display="none";
document.getElementById("bankPage").style.display="none";
document.getElementById("categoryPage").style.display="none";
document.getElementById("incomePage").style.display="none";
document.getElementById("expensePage").style.display="none";


if(page==="dashboardPage"){

document.getElementById("dashboardPage").style.display="block";

}


if(page==="bankPage"){

document.getElementById("bankPage").style.display="block";

loadBanks();

}


if(page==="categoryPage"){

document.getElementById("categoryPage").style.display="block";

loadCategories();

}


if(page==="incomePage"){

document.getElementById("incomePage").style.display="block";

setDefaultDateTime();

loadIncomeBanks();

loadIncomeCategories();

}


if(page==="expensePage"){

document.getElementById("expensePage").style.display="block";

setDefaultExpenseDateTime();

loadExpenseBanks();

loadExpenseCategories();

}

}



function loadIncomeBanks(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getBanks&callback=handleIncomeBanks`;

document.body.appendChild(script);

}


function handleIncomeBanks(result){

if(result.success){

let html="<option value=''>Pilih Bank</option>";

result.data.forEach(bank=>{

html+=`<option value="${bank.ID}">${bank.Bank}</option>`;

});

document.getElementById("incomeBank").innerHTML=html;

}

}


function loadExpenseBanks(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getBanks&callback=handleExpenseBanks`;

document.body.appendChild(script);

}


function handleExpenseBanks(result){

console.log("EXPENSE BANK",result);

if(result.success){

let html="<option value=''>Pilih Bank</option>";

result.data.forEach(bank=>{

html+=`<option value="${bank.ID}">${bank.Bank}</option>`;

});

document.getElementById("expenseBank").innerHTML=html;

}

}


function loadIncomeCategories(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getCategories&callback=handleIncomeCategories`;

document.body.appendChild(script);

}


function handleIncomeCategories(result){

if(result.success){

let html="<option value=''>Pilih Category</option>";

result.data.forEach(cat=>{

if(cat.Jenis==="Income"){

html+=`<option value="${cat.ID}">${cat["Nama Kategori"]}</option>`;

}

});

document.getElementById("incomeCategory").innerHTML=html;

}

}


function loadExpenseCategories(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getCategories&callback=handleExpenseCategories`;

document.body.appendChild(script);

}


function handleExpenseCategories(result){

console.log("EXPENSE CATEGORY",result);

if(result.success){

let html="<option value=''>Pilih Category</option>";

result.data.forEach(cat=>{

if(cat.Jenis==="Expense"){

html+=`<option value="${cat.ID}">${cat["Nama Kategori"]}</option>`;

}

});

document.getElementById("expenseCategory").innerHTML=html;

}

}


function saveTransaction(type){

let data={

tanggal:type==="Income"?incomeTanggal.value:expenseTanggal.value,

jam:type==="Income"?incomeJam.value:expenseJam.value,

jenis:type,

bankID:type==="Income"?incomeBank.value:expenseBank.value,

categoryID:type==="Income"?incomeCategory.value:expenseCategory.value,

nominal:type==="Income"?incomeNominal.value:expenseNominal.value,

keterangan:type==="Income"?incomeKeterangan.value:expenseKeterangan.value

};


console.log("SAVE DATA",data);


fetch(`${API_URL}?action=addTransaction`,
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

})

.then(res=>res.json())

.then(result=>{

console.log("RESULT SAVE",result);

if(result.success){

alert("Berhasil");

loadDashboard();

loadTransactions();

}

});


}



function setDefaultDateTime(){

const now=new Date();

incomeTanggal.value=now.toISOString().split("T")[0];

incomeJam.value=now.toTimeString().substring(0,5);

}


function setDefaultExpenseDateTime(){

const now=new Date();

expenseTanggal.value=now.toISOString().split("T")[0];

expenseJam.value=now.toTimeString().substring(0,5);

}


function formatRupiah(number){

return new Intl.NumberFormat("id-ID",
{
style:"currency",
currency:"IDR",
maximumFractionDigits:0
}).format(number);

}


document.addEventListener("DOMContentLoaded",()=>{

const incomeBtn=document.getElementById("saveIncomeBtn");

const expenseBtn=document.getElementById("saveExpenseBtn");


if(incomeBtn){

incomeBtn.onclick=()=>{

console.log("CLICK INCOME");

saveTransaction("Income");

};

}


if(expenseBtn){

expenseBtn.onclick=()=>{

console.log("CLICK EXPENSE");

saveTransaction("Expense");

};

}


loadDashboard();

loadTransactions();

});
