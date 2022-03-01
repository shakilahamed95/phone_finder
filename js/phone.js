const searchResult = document.getElementById("search-result")
const phoneDetail = document.getElementById("phone-detail");

const searchPhone = () => {
    const searchField = document.getElementById("search-field")
    const inputError = document.getElementById("error");
    const searchText = searchField.value;
    searchField.value = '';
    phoneDetail.innerHTML = "";
    if (searchText.toLowerCase() === "huawei" || searchText.toLowerCase() === "iphone" || searchText.toLowerCase() === "samsung" || searchText.toLowerCase() === "oppo") {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(response => response.json())
            .then(data => displayPhone(data.data))
        inputError.innerText = "";
    }
    else {

        inputError.innerText = "Sorry no result found";
        searchResult.innerHTML = "";
    }
}
const displayPhone = (phones) => {
    searchResult.textContent = '';
    if (phones.length > 20) {
        phones = phones.slice(0, 20)
    }
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add("col-lg-4")
        div.classList.add("col-md-4")
        div.classList.add("col-sm-6")
        div.classList.add("col-12")
        div.classList.add("mb-5")
        div.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.brand}</h5>
                    <p class="card-text">${phone.phone_name}</p>
                    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">See Details</button>
                </div>
            </div>
                    `
        searchResult.appendChild(div);
    })
}
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetail(data.data))


}
const showPhoneDetail = (phone) => {
    console.log(phone.releaseDate)
    phoneDetail.innerHTML = "";
    let releaseDate = phone.releaseDate;
    if (releaseDate === "") {
        releaseDate = "No relese date available";
    }
    const div = document.createElement('div');
    div.classList.add("col-lg-4")
    div.classList.add("col-md-4")
    div.classList.add("col-sm-6")
    div.classList.add("col-12")
    div.classList.add("mb-5")
    div.innerHTML = `
                <div class="card" style="width: 18rem;">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h4 class="card-title">${phone.brand}</h4>
                    <h5 class="card-text">${phone.name}</h5>
                    <p> Relese Date: ${releaseDate} </p>
                    <p > Storage: ${phone.mainFeatures.storage}</p>
                    <p > Display : ${phone.mainFeatures.displaySize}</p>
                </div>
            </div>
                    `


    phoneDetail.appendChild(div);


}