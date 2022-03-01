const searchResult = document.getElementById("search-result")

const searchPhone = () => {
    const searchField = document.getElementById("search-field")
    const inputError = document.getElementById("error");
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText === "Huawei" || searchText === "iphone" || searchText === "appale" || searchText === "samsung" || searchText === "oppo") {
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
    phones.forEach(phone => {
        console.log(phone)
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
                <button class="btn btn-primary">See Details</button>
            </div>
        </div>
                `
        searchResult.appendChild(div);
    })
}