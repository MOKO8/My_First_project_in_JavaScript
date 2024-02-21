// get ides
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let descount = document.getElementById("descount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp; //! هذا المتغير الوهمي مهم جداَ جداَ

// get title
function getTitle() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - descount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}

// creat prodoct

let dataPro;
if (localStorage.prodoct != null) {
    dataPro = JSON.parse(localStorage.prodoct);
} else {
    dataPro = [];
}
submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        descount: descount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };

    if (title.value != "" && price.value != "" && category.value != "" && newPro.count <= 100 ) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData()
    }
    // save localstorage
    localStorage.setItem("prodoct", JSON.stringify(dataPro));
    // clearData();
    showData();
};

// clear inputs
function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    descount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

// raed

function showData() {
    let table = "";
    getTitle();
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].descount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateData( ${i} )" >update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
            </tr>
            `;
    }
    document.getElementById("tbody").innerHTML = table;
    let btnDeleteAll = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = `
            <button id='zoom' onclick="deleteAll()" >Delete All  (${dataPro.length})</button>
        `;
    } else {
        btnDeleteAll.innerHTML = "";
    }
}
showData();

// Delete
function deleteData(i) {
    // console.log(i)
    dataPro.splice(i, 1);
    localStorage.prodoct = JSON.stringify(dataPro);
    showData();
}

function deleteAll() {
    let zoom = document.getElementById("zoom");
    zoom.innerHTML = ` 
<div id="nodelete" class="areyoushor">
    <h3>Are You Sure</h3>
    <button onclick="deleteAllShure()" >Yes</button>
    <button onclick="noDeleteAll()">No</button>
</div>
    `;
}
function deleteAllShure() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
function noDeleteAll() {
    location.reload();
}

// cont

// update

function updateData(i) {
    (title.value = dataPro[i].title),
        (price.value = dataPro[i].price),
        (taxes.value = dataPro[i].taxes),
        (ads.value = dataPro[i].ads),
        (descount.value = dataPro[i].descount);
    getTitle();
    count.style.display = "none";
    submit.innerHTML = "Update";
    category.value = dataPro[i].category;
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// search
let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    if (id == "searchTitle") {
        searchMood = "title";
    } else {
        searchMood = "category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                        <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].descount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick="updateData( ${i} )" >update</button></td>
                            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                            </tr>
                        `;
            }
        } else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].descount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button id="update" onclick="updateData( ${i} )" >update</button></td>
                            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
                            </tr>
                        `;
            }
        }
    }

    document.getElementById("tbody").innerHTML = table;
}
