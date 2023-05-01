const loadPhoneData = async(searchText) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data);
}
// loadPhoneData();

const displayData = (data) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerText = "";
    data = data.slice(0, 9);
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
            </div>
            <div class="card-footer">
              <small class="text-muted">Buy Now</small>
            </div>
          </div>
        `;
        cardContainer.appendChild(colDiv);
    })
console.log(data);
}

document.getElementById("search-btn").addEventListener("click", ()=>{
    const searchInput = document.getElementById("search-text");
    const searchText = searchInput.value;
    loadPhoneData(searchText);
})