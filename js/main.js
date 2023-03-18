"use strict"

let searchContainer=document.getElementById('searchContainer')
let searchbyname=document.getElementById('searchbyname')
let searchbyFL=document.getElementById('searchbyFL')
// let mealacol=document.getElementById('mealacol')
let navicon=document.querySelector('open-close-icon')

var data=[]


function displaysearch(){
    searchContainer.classList.remove('d-none')
}



searchbyname.addEventListener('blur',function(){
    let leter=searchbyname.value
  
    searchbyNMAEapi(leter)

    
})
searchbyFL.addEventListener('blur',function(){
    let leter=searchbyFL.value
    console.log(leter);
    searchbyFLapi(leter)
    
   
})


async function searchbyFLapi(leter){
   let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${leter}`)
    let laternamedata= await latername.json()
     data=laternamedata.meals
    console.log(data)
    display()
    
  }

  async function searchbyNMAEapi(leter){
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${leter}`)
     let laternamedata= await latername.json()
      data=laternamedata.meals
     console.log(data)
     display()
     
   }




function display() {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3 id='mealacol'>
        <div  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
             <img class="w-100" onclick='getimgdetels(${data[i].idMeal})' src="${data[i].strMealThumb}" alt="" srcset="">
             <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                       <h3>${data[i].strMeal}</h3>
             </div>

           

        </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
    
}

function displaydetels(data){

    var cartona='';
        cartona+=`
        <div class="col-md-4">
                <img class="w-100 rounded-3" src="${data.strMealThumb}" alt="">
                    <h2>${data.strMeal}</h2>
            </div>


            <div class="col-md-8">
            <h2>Instructions</h2>
            <p>${data.strInstructions}</p>
            <h3><span class="fw-bolder">Area : </span>${data.strArea}</h3>
            <h3><span class="fw-bolder">Category : </span>${data.strCategory}</h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                <li class="alert alert-info m-2 p-1">${data.strMeasure1,data.strIngredient1}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure2,data.strIngredient2}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure3,data.strIngredient3}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure4,data.strIngredient4}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure5,data.strIngredient5}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure6,data.strIngredient6}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure7,data.strIngredient7}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure8,data.strIngredient8}</li>
                <li class="alert alert-info m-2 p-1">${data.strMeasure9,data.strIngredient9}</li>
                
                

            </ul>

            <h3></h3>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                
                 <li class="alert alert-danger m-2 p-1">${data.strTags}</li>
            </ul>

            <a target="_blank" href="${data.strSource}" class="btn btn-success">Source</a>
            <a target="_blank" href="${data.strYoutube}" class="btn btn-danger">Youtube</a>
        </div>

        `
    
    document.getElementById('rowData').innerHTML=cartona
}


async function getimgdetels(mealid){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
    data=await  latername.json()
    
     console.log(data.meals[0])
     displaydetels(data.meals[0])
     
}


//category


function displayCat(data) {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                <div onclick="getCatMeals('${data[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        <p>${data[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
        
    }
    document.getElementById('rowData').innerHTML=cartona
    
}
async function getCatDetels(){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    data=await  latername.json()
    
     console.log(data.categories)
     displayCat(data.categories)
     
}
// catmeals

function displayCatmeal(data) {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                <div onclick="getimgdetels('${data[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100"  src="${data[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strCategory}</h3>
                        
                    </div>
                </div>
        </div>
        `
        
    }
    document.getElementById('rowData').innerHTML=cartona
    
}






async function getCatMeals(Catmeals){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Catmeals}`)
    data=await  latername.json()
    
     console.log(data.meals.slice(0, 20))
     displayCatmeal(data.meals)
     
}

//area




async function getarea(data){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    data=await  latername.json()
    
     console.log(data.meals)
     displayarea(data.meals)
     
}



function displayarea(data) {
    var clear=''
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += 
        `
        <div class="col-md-3">
                <div onclick="getareameals('${data[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${data[i].strArea}</h3>
                </div>
        </div>
        `
        
    }
    
    document.getElementById('rowData').innerHTML=cartona
    
}

// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
//



//area meals

async function getareameals(area){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data=await  latername.json()
    
     console.log(data.meals)
     displayareameal(data.meals)
     
}

function displayareameal(data) {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                <div onclick="getimgdetels('${data[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100"  src="${data[i].strMealThumb}"  alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                        
                    </div>
                </div>
        </div>
        `
        
    }
    document.getElementById('rowData').innerHTML=cartona
    
}


//Ingredients


async function getIngredients(){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data=await  latername.json()
    
     console.log(data.meals)
     displayIngredients(data.meals.slice(0, 20))
     
}



function displayIngredients(data) {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += 
        `
        <div class="col-md-3">
                <div onclick="getIngredientsmeals('${data[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }
    document.getElementById('rowData').innerHTML=cartona
    
}


//Ingredients meals


async function getIngredientsmeals(area){
    
    rowData.innerHTML = ""
    let latername = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${area}`)
    data=await  latername.json()
    
     console.log(data.meals)
     Ingredientsmeals(data.meals)
     
}
function Ingredientsmeals(data) {
    var cartona='';
    for(var i=0;i<data.length;i++){
        cartona += `
        <div class="col-md-3">
                <div onclick="getimgdetels('${data[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100"  src="${data[i].strMealThumb}"  alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${data[i].strMeal}</h3>
                        
                    </div>
                </div>
        </div>
        `
        
    }
    document.getElementById('rowData').innerHTML=cartona
    
}

// register form
let nameInput=document.getElementById('nameInput')
let nameAlert=document.getElementById('nameAlert')
let emailInput=document.getElementById('emailInput')
let emailAlert=document.getElementById('emailAlert')
let phoneInput=document.getElementById('phoneInput')
let phoneAlert=document.getElementById('phoneAlert')
let ageInput=document.getElementById('ageInput')
let ageAlert=document.getElementById('ageAlert')
let passwordInput=document.getElementById('passwordInput')
let passwordAlert=document.getElementById('passwordAlert')
let repasswordInput=document.getElementById('repasswordInput')
let repasswordAlert=document.getElementById('repasswordAlert')
let submitBtn=document.getElementById('submitBtn')
let registercol=document.getElementById('registercol')

// function register(){
//     rowData.innerHTML = ""
//     var cartona=''
//     cartona +=` <div class="row g-4">
//     <div class="col-md-6">
//         <input id="nameInput" onkeyup='nameInputFUN()' type="text" class="form-control " placeholder="Enter Your Name">
//         <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Special characters and numbers not allowed
//         </div>
//     </div>
//     <div class="col-md-6">
//         <input id="emailInput" onkeyup="emailInputFUN()" type="email" class="form-control " placeholder="Enter Your Email">
//         <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Email not valid *exemple@yyy.zzz
//         </div>
//     </div>
//     <div class="col-md-6">
//         <input id="phoneInput" onkeyup="phoneInputFUN()" type="text" class="form-control " placeholder="Enter Your Phone">
//         <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Enter valid Phone Number
//         </div>
//     </div>
//     <div class="col-md-6">
//         <input id="ageInput" onkeyup="ageInputFUN()" type="number" class="form-control " placeholder="Enter Your Age">
//         <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Enter valid age
//         </div>
//     </div>
//     <div class="col-md-6">
//         <input id="passwordInput" onkeyup="passwordInputFUN()" type="password" class="form-control " placeholder="Enter Your Password">
//         <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Enter valid password *Minimum eight characters, at least one letter and one number:*
//         </div>
//     </div>
//     <div class="col-md-6">
//         <input id="repasswordInput" onkeyup="repasswordInputFUN()" type="password" class="form-control " placeholder="Repassword">
//         <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
//             Enter valid repassword 
//         </div>
//         <button id="submitBtn"   class="btn btn-outline-danger px-2 mt-3">Submit</button>
//     </div>
// </div>`
// document.getElementById('rowData').innerHTML=cartona
// }

function register(){
    
    registercol.classList.remove('d-none')
}

submitBtn.onclick=function(){
    if(nameInputFUN()&&emailInputFUN()&&phoneInputFUN()&&ageInputFUN()&&passwordInputFUN()&&repasswordInputFUN()){
        alert("done")
    }
    else{
        alert('error')
    }
   
    
}


function nameInputFUN(){
    nameVAL()
      if(nameInput.value !=''){
        nameAlert.classList.replace('d-flex','d-none')
        
          return true;
      }
      else{
        nameAlert.classList.replace('d-none','d-flex')
        submitBtn.setAttribute('disabled',true)
   
          return false
      }
    
}


function emailInputFUN(){
    emailVAL()
          if(emailInput.value !=''){
            emailAlert.classList.replace('d-flex','d-none')
              return true;
          }
          else{
            emailAlert.classList.replace('d-none','d-flex')
            submitBtn.setAttribute('disabled',true)
       
              return false
          }
    }
function phoneInputFUN(){
        phoneVAL()
              if(phoneInput.value !=''){
                phoneAlert.classList.replace('d-flex','d-none')
                  return true;
              }
              else{
                phoneAlert.classList.replace('d-none','d-flex')
                submitBtn.setAttribute('disabled',true)
           
                  return false
              }
        }
        
    
 function ageInputFUN(){
            ageVAL()
            if(ageInput.value !=''){
              ageAlert.classList.replace('d-flex','d-none')
                return true;
            }
            else{
              ageAlert.classList.replace('d-none','d-flex')
              submitBtn.setAttribute('disabled',true)
         
                return false
            }
      }
 function passwordInputFUN(){
            passwordVAL()
            if(passwordInput.value !=''){
                passwordAlert.classList.replace('d-flex','d-none')
                return true;
            }
            else{
                passwordAlert.classList.replace('d-none','d-flex')
              submitBtn.setAttribute('disabled',true)
         
                return false
            }
      }
      
function repasswordInputFUN(){
            repasswordVAL()
            if(repasswordInput.value !=''){
                repasswordAlert.classList.replace('d-flex','d-none')
                return true;
            }
            else{
                repasswordAlert.classList.replace('d-none','d-flex')
              submitBtn.setAttribute('disabled',true)
         
                return false
            }
      }
      

function nameVAL(){
    let regex=/^[a-zA-Z ]+$/
    if(regex.test(nameInput.value)==true){
        nameInput.classList.remove('is-invalid')
        nameInput.classList.add('is-valid')
        return true

    }
    else{
        nameInput.classList.add('is-invalid')
        nameInput.classList.remove('is-valid')
        false
    }

}
function emailVAL(){
    let regex=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(regex.test(emailInput.value)==true){
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')
        return true

    }
    else{
        emailInput.classList.add('is-invalid')
        emailInput.classList.remove('is-valid')
        false
    }

}
function phoneVAL(){
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if(regex.test(phoneInput.value)==true){
        phoneInput.classList.remove('is-invalid')
        phoneInput.classList.add('is-valid')
        return true

    }
    else{
        phoneInput.classList.add('is-invalid')
        phoneInput.classList.remove('is-valid')
        false
    }

}
function ageVAL(){
    let regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if(regex.test(ageInput.value)==true){
        ageInput.classList.remove('is-invalid')
        ageInput.classList.add('is-valid')
        return true

    }
    else{
        ageInput.classList.add('is-invalid')
        ageInput.classList.remove('is-valid')
        false
    }

}
function passwordVAL(){
    
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if(regex.test(passwordInput.value)==true){
        passwordInput.classList.remove('is-invalid')
        passwordInput.classList.add('is-valid')
        return true

    }
    else{
        passwordInput.classList.add('is-invalid')
        passwordInput.classList.remove('is-valid')
        false
    }

}
function repasswordVAL(){
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if(regex.test(repasswordInput.value)==true){
        repasswordInput.classList.remove('is-invalid')
        repasswordInput.classList.add('is-valid')
        return true

    }
    else{
        repasswordInput.classList.add('is-invalid')
        repasswordInput.classList.remove('is-valid')
        false
    }

}

let navleft=document.getElementById('navleft')
let navlogo=document.getElementById('navlogo')

navlogo.addEventListener('click',function(){
    if(opennav()==true){
        opennav()
    }

   else {
    closeSideNav()
    }

 

})
function closeSideNav(){

navleft.style.left='-256.562px'
navlogo.classList.remove('fa-x')
navlogo.classList.add('fa-align-justify')


}
function opennav(){
    navleft.style.left='0px'
    navlogo.classList.add('fa-x')
navlogo.classList.remove('fa-align-justify')
return true
}
