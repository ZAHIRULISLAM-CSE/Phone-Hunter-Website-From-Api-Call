const getData = (value,dataLimit) => {
    console.log(dataLimit,value);
  url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayData(data,dataLimit));
};

const displayData = (data,dataLimit) => {
  console.log(data);

  if (data.data.length > 10) {
    document.getElementById("see-more-btn").classList.remove("hidden");
  }
  document.getElementById("container").innerHTML = "";
  if (data.status == true && dataLimit==true ) {
    data.data.slice(0, 10).map((singleData) => {
      viewData(singleData);
    });
  }
  
  else {
    document.getElementById("container").classList.remove("grid");
    document.getElementById("container").innerHTML = `
             <h1 class="text-3xl text-center text-red-600" >No Data Found</h1>
             `;
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("see-more-btn").classList.add("hidden");
  }

   if(data.status == true && dataLimit==false){
    document.getElementById("container").innerHTML ="";
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("see-more-btn").classList.add("hidden");
    data.data.map((singleData) => {
        viewData(singleData);
    })
};
}
document.getElementById("search-btn").addEventListener("click", function () {
    searching(true);
})


function searching(dataLimit){
    document.getElementById("loader").classList.remove("hidden");
    const value = document.getElementById("input-text").value;
    getData(value,dataLimit);
}

const modalDetais = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayModal(data));
};

const displayModal = (data) => {
  console.log(data.data);
  const name = data.data.name;
  const display = data.data.mainFeatures.displaySize;
  const image = data.data.image;
  const storage = data.data.mainFeatures.storage;
  // console.log(name,display,image,storage);
  document.getElementById("phone-name").innerHTML = name;
  document.getElementById("modal-image").src = image;
  document.getElementById("display").innerHTML = display;
  document.getElementById("storage").innerHTML = storage;
};
document.getElementById("see-more-btn").addEventListener("click", function () {
    searching(false);
    document.getElementById("input-text").value = "";
});

function viewData(singleData) {
  const { phone_name, image, brand, slug } = singleData;
  document.getElementById("container").classList.add("grid");
  const parent = document.getElementById("container");
  const div = document.createElement("div");
  div.innerHTML = `
            <div class="card w-full bg-base-100 shadow-2xl">
            <figure><img src="${image}" alt="Shoes" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone_name}</h2>
            <p>${brand}</p>
            <div class="card-actions justify-center">
        <label onclick="modalDetais('${slug}')" for="my-modal" class=" btn btn-primary">Buy Now</label>
        </div>
        </div>
        </div>

            `;
  document.getElementById("loader").classList.add("hidden");
  parent.appendChild(div);
}

// Enter Key action

let input = document.getElementById("input-text");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    searching(true);
  }
});
