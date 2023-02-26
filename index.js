const getData=(value)=>{
    url=`https://openapi.programming-hero.com/api/phones?search=${value}`
    fetch(url)
    .then(response => response.json())
    .then(data => displayData(data))
    // .catch(error=>{
    //     document.getElementById("container").innerHTML=`
    //     <h1 class="text-3xl text-center text-red-600" >No Data Found</h1>
    //     `
    // })
    
}

const displayData=(data)=>{
    document.getElementById("container").innerHTML="";
     console.log(data);
     if(data.status == true){
        data.data.map(singleData =>{
            const {phone_name,image,brand}=singleData;
            document.getElementById("container").classList.add("grid");
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
     else{
        document.getElementById("container").classList.remove("grid");
        document.getElementById("container").innerHTML=`
             <h1 class="text-3xl text-center text-red-600" >No Data Found</h1>
             `
     }
   
}

document.getElementById("search-btn").addEventListener("click",function(){
    const value=document.getElementById("input-text").value;
    getData(value);
    document.getElementById("input-text").value="";
})