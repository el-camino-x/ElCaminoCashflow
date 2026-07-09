console.log("APP JS TERBACA");

const API_URL="https://script.google.com/macros/s/AKfycbwxnWgF5X6aIYadR0agppvvfUIh0Gmtka_2Mpq4nxet5U2_NMO8znE6bGhZeY_3X8w/exec";

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
<strong>${sign} ${formatRupiah(trx.Nominal)}</strong>
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
document.getElementById("transferPage").style.display="none";

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

if(page==="transferPage"){
document.getElementById("transferPage").style.display="block";
setDefaultTransferDateTime();
loadTransferBanks();
}

}

function openBankDetail(id){

console.log("OPEN BANK DETAIL",id);

const script=document.createElement("script");

script.src=`${API_URL}?action=getBankDetail&id=${id}&callback=handleBankDetail`;

document.body.appendChild(script);

}

function handleBankDetail(result){

console.log("BANK DETAIL",result);

if(result.success){

renderBankDetail(result.data);

}

}

function renderBankDetail(data){

let html=`

<div class="panel">

<h3>🏦 ${data.bank.Nama}</h3>

<p>Pemilik : ${data.bank.Pemilik}</p>

<p>Rekening : ${data.bank.Rekening}</p>

<h3>Saldo : ${formatRupiah(data.saldo)}</h3>

<hr>

<h3>Riwayat Transaksi</h3>

`;

data.transactions.forEach(trx=>{

let icon=trx.Jenis==="Income"?"🟢":"🔴";

html+=`

<div class="transaction-item">

<div>

<b>${icon} ${trx.Jenis}</b>

<br>

<small>${trx.Tanggal} ${trx.Jam}</small>

<br>

${trx.Keterangan}

</div>

<strong>${formatRupiah(trx.Nominal)}</strong>

</div>

`;

});

html+=`

</div>

`;

document.getElementById("bankPageList").innerHTML=html;

}

function loadIncomeBanks(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getBanks&callback=handleIncomeBanks`;

document.body.appendChild(script);

}

function handleIncomeBanks(result){

console.log("INCOME BANK",result);

if(result.success){

let html="<option value=''>Pilih Bank</option>";

result.data.forEach(bank=>{

html+=`

<option value="${bank.ID}">
${bank.Bank}
</option>

`;

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

html+=`

<option value="${bank.ID}">
${bank.Bank}
</option>

`;

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

html+=`

<option value="${cat.ID}">
${cat["Nama Kategori"]}
</option>

`;

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

html+=`

<option value="${cat.ID}">
${cat["Nama Kategori"]}
</option>

`;

}

});

document.getElementById("expenseCategory").innerHTML=html;

}

}

function saveTransaction(type){

let bank =
type==="Income"
?
incomeBank.value
:
expenseBank.value;


let category =
type==="Income"
?
incomeCategory.value
:
expenseCategory.value;


let nominal =
type==="Income"
?
incomeNominal.value
:
expenseNominal.value;


let keterangan =
type==="Income"
?
incomeKeterangan.value.trim()
:
expenseKeterangan.value.trim();



if(bank===""){

alert("Pilih Bank terlebih dahulu");

return;

}


if(category===""){

alert("Pilih Category terlebih dahulu");

return;

}


if(nominal==="" || Number(nominal)<=0){

alert("Masukkan nominal yang benar");

return;

}


if(keterangan===""){

alert("Keterangan wajib diisi");

return;

}



let data={

tanggal:
type==="Income"
?
incomeTanggal.value
:
expenseTanggal.value,


jam:
type==="Income"
?
incomeJam.value
:
expenseJam.value,


jenis:type,


bankID:bank,


categoryID:category,


nominal:nominal,


keterangan:keterangan

};


console.log("SAVE DATA",data);



const script=document.createElement("script");

script.src=
`${API_URL}?action=addTransaction`
+
`&tanggal=${data.tanggal}`
+
`&jam=${data.jam}`
+
`&jenis=${data.jenis}`
+
`&bankID=${data.bankID}`
+
`&categoryID=${data.categoryID}`
+
`&nominal=${data.nominal}`
+
`&keterangan=${encodeURIComponent(data.keterangan)}`
+
`&callback=handleSaveTransaction`;

document.body.appendChild(script);

}

function handleSaveTransaction(result){

console.log("SAVE RESULT",result);

if(result.success){

alert("Transaksi berhasil disimpan");

loadDashboard();

loadTransactions();

}

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

function loadTransferBanks(){

const script=document.createElement("script");

script.src=`${API_URL}?action=getBanks&callback=handleTransferBanks`;

document.body.appendChild(script);

}


function handleTransferBanks(result){

console.log("TRANSFER BANK",result);


if(result.success){


let html="<option value=''>Pilih Bank</option>";


result.data.forEach(bank=>{


html+=`

<option value="${bank.ID}">
${bank.Bank}
</option>

`;

});


document.getElementById("transferDariBank").innerHTML=html;

document.getElementById("transferKeBank").innerHTML=html;


}

}



function setDefaultTransferDateTime(){


const now=new Date();


document.getElementById("transferTanggal").value =
now.toISOString().split("T")[0];


document.getElementById("transferJam").value =
now.toTimeString().substring(0,5);


}

function saveTransfer(){

let dari =
document.getElementById("transferDariBank").value;

let ke =
document.getElementById("transferKeBank").value;

let nominal =
document.getElementById("transferNominal").value;

let keterangan =
document.getElementById("transferKeterangan").value.trim();


if(dari===""){
alert("Pilih bank asal");
return;
}

if(ke===""){
alert("Pilih bank tujuan");
return;
}

if(dari===ke){
alert("Bank asal dan tujuan tidak boleh sama");
return;
}

if(nominal==="" || Number(nominal)<=0){
alert("Nominal tidak valid");
return;
}

if(keterangan===""){
alert("Keterangan wajib diisi");
return;
}


let data={

tanggal:
document.getElementById("transferTanggal").value,

jam:
document.getElementById("transferJam").value,

dariBankID:dari,

keBankID:ke,

nominal:nominal,

keterangan:keterangan

};


console.log("SAVE TRANSFER",data);



const script=document.createElement("script");


script.src=
`${API_URL}?action=addTransfer`
+
`&tanggal=${data.tanggal}`
+
`&jam=${data.jam}`
+
`&dariBankID=${data.dariBankID}`
+
`&keBankID=${data.keBankID}`
+
`&nominal=${data.nominal}`
+
`&keterangan=${encodeURIComponent(data.keterangan)}`
+
`&callback=handleSaveTransfer`;


document.body.appendChild(script);


}



function handleSaveTransfer(result){

console.log("TRANSFER RESULT",result);


if(result.success){

alert("Transfer berhasil");

loadDashboard();

loadTransactions();

}

}



function formatRupiah(number){

return new Intl.NumberFormat("id-ID",{

style:"currency",

currency:"IDR",

maximumFractionDigits:0

}).format(number);

}

document.addEventListener("DOMContentLoaded",()=>{

const incomeBtn = document.getElementById("saveIncomeBtn");

const expenseBtn = document.getElementById("saveExpenseBtn");

const transferBtn = document.getElementById("saveTransferBtn");


console.log("INCOME BTN:", incomeBtn);

console.log("EXPENSE BTN:", expenseBtn);

console.log("TRANSFER BTN:", transferBtn);



if(incomeBtn){

incomeBtn.onclick=function(){

console.log("CLICK INCOME");

saveTransaction("Income");

};

}



if(expenseBtn){

expenseBtn.onclick=function(){

console.log("CLICK EXPENSE");

saveTransaction("Expense");

};

}



if(transferBtn){

transferBtn.onclick=function(){

console.log("CLICK TRANSFER");

saveTransfer();

};

}



loadDashboard();

loadTransactions();


});
