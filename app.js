const loadPhoneData = async(searchText, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data, dataLimit);
}
// loadPhoneData();

const displayData = (data, dataLimit) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerText = "";
    const showAll = document.getElementById("show-all");
    if (dataLimit && data.length > 10) {
        data = data.slice(0, 10);
        showAll.classList.remove("d-none");
    } else {
        showAll.classList.add("d-none");
    }
    const noFound = document.getElementById("no-found");
    if (data.length === 0) {
        noFound.classList.remove("d-none");
    }else{
        noFound.classList.add("d-none");
    }
    data.forEach(datum => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col");
        colDiv.innerHTML = `
        
        <div class="card h-100 p-2">
            <img src="${datum.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${datum.phone_name}</h5>
              <p class="card-text">
                ${datum.slug}
              </p>
              <button onclick="phoneDetails('${datum.slug}')" id="phone-details" class="btn btn-secondary">Phone Details</button>
            </div>
            
          </div>
        `;
        cardContainer.appendChild(colDiv);
    })
// console.log(data);
// stop loader
loadSpinner(false);
}
const processData = dataLimit => {
    // start loader
    loadSpinner(true);
    const searchInput = document.getElementById("search-text");
    const searchText = searchInput.value;
    loadPhoneData(searchText, dataLimit);
}
document.getElementById("search-btn").addEventListener("click", ()=>{
    processData(10);
})
document.getElementById("search-text").addEventListener("keypress", (e)=>{
// console.log(e.key);
if (e.key === "Enter") {
    processData(10);
    
}
})

const loadSpinner = isLoading =>{
    const loader = document.getElementById("loader");
    if (isLoading) {
        loader.classList.remove("d-none");
    } else {
        loader.classList.add("d-none");
    }
}
document.getElementById("btn-show-all").addEventListener("click", ()=>{
    processData();
})

const phoneDetails = async id =>{
const url = `https://openapi.programming-hero.com/api/phone/${id}`;
const res = await fetch(url);
const data = await res.json();
console.log(data.data);
}
