const searchResult = document.getElementById("search-result")
const phoneDetail = document.getElementById("phone-detail");
//  search phone section 
const searchPhone = () => {
    const searchField = document.getElementById("search-field")
    const inputError = document.getElementById("error");
    const searchText = searchField.value;
    searchField.value = '';
    phoneDetail.innerHTML = "";
    // input search error handling 
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
// display phone function 
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
// phone deatial section 
const phoneDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showPhoneDetail(data.data))


}
const showPhoneDetail = (phone) => {
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
                    <p> Storage: ${phone.mainFeatures.storage}</p>
                    <p> Memory : ${phone.mainFeatures.memory}</p>
                    <p> Display : ${phone.mainFeatures.displaySize}</p>
                    <p> ChipSet : ${phone.mainFeatures.chipSet}</p>
                    <h5> Sensor Details : </h5>
                    <p>${phone.mainFeatures.sensors}</p>
                    <h5>Other Features:</h5>
                    <p> WLAN : ${phone?.others?.WLAN ?? "No information available"}</p>
                    <p> BLUETOOTH : ${phone?.others?.Bluetooth ?? "No information available"}</p>
                    <p> GPS : ${phone?.others?.GPS ?? "No information available"}</p>
                    <p> NFC : ${phone?.others?.NFC ?? "No information available"}</p>
                    <p> RADIO : ${phone?.others?.Radio ?? "No information available"}</p>
                    <p> USB : ${phone?.others?.USB ?? "No information available"}</p>
                </div>
            </div>
                    `


    phoneDetail.appendChild(div);
}