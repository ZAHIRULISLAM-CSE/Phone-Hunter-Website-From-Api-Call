const getData=()=>{
    url=`https://openapi.programming-hero.com/api/phones?search=iphone`
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data));
}
getData();

const displayData=(data)=>{
     console.log(data.data);
    data.data.map(singleData =>{
        const {phone_name,image,brand}=singleData;
        const parent=document.getElementById("container");
        const div=document.createElement("div");
        div.innerHTML=`
        <div class="card w-96 bg-base-100 shadow-2xl">
        <figure><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
         <h2 class="card-title">${phone_name}</h2>
         <p>${brand}</p>
        <div class="card-actions justify-center">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>


        `
        parent.appendChild(div);
    })
   
}

document.getElementById("search-btn").addEventListener("click",function(){
    const value=document.getElementById("input-text").value;
    console.log(value);
})