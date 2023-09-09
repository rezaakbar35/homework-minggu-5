//mendefinisikan class terlebih dahulu
class User {
    constructor(name, age, allowance){ 
        this.name = name;
        this.age = age;
        this.allowance = allowance;
    }
}

//membuat fitur untuk berpindah tab
function openForm() {
    let form = document.getElementById("form");
    if (form.style.display === "none") {
      form.style.display = "block";
      table.style.display = "none";
    }
}

function openTable() {
    let table = document.getElementById("table");
    if (table.style.display === "none") {
      table.style.display = "block";
      form.style.display = "none";
    }
}

//deklarasi variabel
let newName;
let newAge;
let newAllowance;
let listUser = [];

//membuat function untuk mendapatkan data dari input : Data nama
function getName() {
    newName = document.getElementById("name").value

    return new Promise((resolve, reject) => {
        if(newName.length >= 10){
        resolve(newName)
    } else {
        newName = null
        reject()
    }
    })
}

//membuat function untuk mendapatkan data dari input : Data umur
function getAge() {
    newAge = parseInt(document.getElementById("age").value)

    return new Promise((resolve, reject) => {
        if(newAge >= 25){
        resolve(newAge)
    } else {
        newAge = null
        reject()
    }
    })
}

//membuat function untuk mendapatkan data dari input : Data uang sangu
function getAllowance() {
    newAllowance = parseInt(document.getElementById("allowance").value)

    return new Promise((resolve, reject) => {
        if(newAllowance >= 100000 && newAllowance <= 1000000){
        resolve(newAllowance)
    } else {
        newAllowance = null
        reject()
    }
    })
}

//membuat fitur dimana setelah mengklik submit, maka data sebelumnya akan otomatis terhapus
const resetNameInput = () => {document.getElementById("name").value = ""}
const resetAgeInput = () => {document.getElementById("age").value = ""}
const resetAllowanceInput = () => {document.getElementById("allowance").value = ""}

//menyatukan ketiga function untuk mendapatkan data
const getData = () => {
    
    getName() //memanggil kembali function getName yang sudah ada promise nya
        .then()
        .catch(() => {
            alert('Nama minimal 10 huruf !')
        })
    getAge() //memanggil kembali function getAge yang sudah ada promise nya
        .then()
        .catch(() => {
            alert('Umur minimal 25 tahun !')
        })
    getAllowance() //memanggil kembali function getAllowance yang sudah ada promise nya
        .then()
        .catch(() => {
            alert('uang sangu minimal 100 ribu dan maksimal 1 juta')
        })
    
    //memanggil function menghapus input
    resetNameInput()
    resetAgeInput()
    resetAllowanceInput()
}

//mengecek apakah terdapat data null atau tidak, jika ada maka tidak masuk ke dalam database
const inputData = () => {
    getData()

    if(newName == null || newAge == null || newAllowance == null){
        ;
    } else {
        //memasukkan data yang sudah diinput menjadi objek baru dengan class Person serta mengeliminasi nilai null
        const newUser = new User(newName, newAge, newAllowance)

        //memasukkan objek baru ke dalam array untuk diubah ke dalam tabel
        listUser.push(newUser)
        console.log(listUser)
    }
}

//memindahkan array berisi user yang sudah dimasukkan menjadi tabel, tabel terbuat apabila berganti tab
function makeTable() {
    const target = document.getElementById('table-data');
    
    for (const user of listUser) {
        const newRow = document.createElement("tr");
        const tdName = document.createElement("td");
        const tdAge = document.createElement("td");
        const tdAllowance = document.createElement("td");
        
        tdName.textContent = user.name;
        tdAge.textContent = user.age;
        tdAllowance.textContent = user.allowance;
        
        newRow.appendChild(tdName);
        newRow.appendChild(tdAge);
        newRow.appendChild(tdAllowance);
        
        target.appendChild(newRow);
    }
}

//membuat function agar tidak terus menerus membuat tabel ketika berpindah tab
function eraseTable() {
    const tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
}

//membuat function untuk penulisan resume menggunakan DOM
function resume(listUser) {
    let sumAge = 0
    let avgAge = 0

    for (let user of listUser) {
        sumAge += user.age
    }

    avgAge = sumAge / listUser.length

    let sumAllowance = 0
    let avgAllowance = 0

    for (let user of listUser) {
        sumAllowance += user.allowance
    }

    avgAllowance = sumAllowance / listUser.length

    const resumePhrase = document.getElementById("resume")
    
    return resumePhrase.innerHTML = `Rata rata pendaftar memiliki uang sangu sebesar ${avgAllowance} dengan rata rata umur ${avgAge}`
}