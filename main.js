//get total
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

//console.log(title, price, taxes, ads, discount, total, count, category, submit);
//getTotal
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }else{
        total.innerHTML = '';
        total.style.background = '#111';
    }
    scroll({
        top : 0,
        behavior: 'smooth',
    })

}
//create product
let dataPro;

if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}



submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }

    if(mood === 'create'){
        if(newPro.count>1){
            for(let i=0; i<newPro.count; i++){
                dataPro.push(newPro);
            }  }
            else{
                dataPro.push(newPro);
            }
   
        }else{
            dataPro[tmp] = newPro;

            mood='create';
            submit.innerHTML='Create';
            count.style.display = 'block';
        }
    //save local storage
    localStorage.setItem('product', JSON.stringify(dataPro));
    //console.log(newPro);
    clearData();
    showData();
   
}
showData();

//clear inputs

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}
//Read
function showData()
{
let table  = '';
let btnDelete;

getTotal();

for(let i = 0; i < dataPro.length;i++){
    table += 
    '<tr>' +
       '<td>' + i + '</td>'+
       '<td>'+ dataPro[i].title +'</td>'+
       '<td>'+ dataPro[i].price +'</td>'+
       '<td>'+ dataPro[i].taxes +'</td>'+
       '<td>'+ dataPro[i].ads +'</td>'+
       '<td>'+ dataPro[i].discount +'</td>'+
       '<td>'+ dataPro[i].total +'</td>'+
       '<td>'+ dataPro[i].category +'</td>'+
       '<td><button onclick=updateData('+i+') id=' + 'update'+'>Update</button></td>'+
       '<td><button onclick=deleteData('+i+')  id=delete>Delete</button></td>'
    '</tr>'
    
    
    //console.log(table);
   
}
document.getElementById('tbody').innerHTML = table;

if(dataPro.length>0){
    btnDelete = document.getElementById('deleteAll').innerHTML = 
    '<button onclick=deleteAll() id=' + 'deleteAll'+'>Delete All ('+ dataPro.length +')</button>';
}else{
    btnDelete= document.getElementById('deleteAll').innerHTML ='';
}
}


//Count


//delete

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData()

}
//delete all
function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}
//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category;

    submit.innerHTML = 'update';

    mood='update';
    tmp = i;

}
//search

let searchMood = 'title';

function getsearchMood(id){
    let search = document.getElementById('search');

    
if(id == 'searchTitle'){

    searchMood = 'title';
    search.placeholder = 'Search By Title';
}else{
    searchMood = 'category';
    search.placeholder = 'Search By Category';
}
search.focus();
search.value = '';
//showData();

}

function searchData(value){
    let table ='';
console.log(value);

if(searchMood =='title'){
for(i=0; i<dataPro.length; i++){
    if(dataPro[i].title.includes(value.toLowerCase())){
//console.log(i);
table += 
'<tr>' +
'<td>' + i + '</td>'+
'<td>'+ dataPro[i].title +'</td>'+
'<td>'+ dataPro[i].price +'</td>'+
'<td>'+ dataPro[i].taxes +'</td>'+
'<td>'+ dataPro[i].ads +'</td>'+
'<td>'+ dataPro[i].discount +'</td>'+
'<td>'+ dataPro[i].total +'</td>'+
'<td>'+ dataPro[i].category +'</td>'+
'<td><button onclick=updateData('+i+') id=' + 'update'+'>Update</button></td>'+
'<td><button onclick=deleteData('+i+')  id=delete>Delete</button></td>'
'</tr>'

    }
}


}else{
    for(i=0; i<dataPro.length; i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
    //console.log(i);

    table += 
    '<tr>' +
    '<td>' + i + '</td>'+
    '<td>'+ dataPro[i].title +'</td>'+
    '<td>'+ dataPro[i].price +'</td>'+
    '<td>'+ dataPro[i].taxes +'</td>'+
    '<td>'+ dataPro[i].ads +'</td>'+
    '<td>'+ dataPro[i].discount +'</td>'+
    '<td>'+ dataPro[i].total +'</td>'+
    '<td>'+ dataPro[i].category +'</td>'+
    '<td><button onclick=updateData('+i+') id=' + 'update'+'>Update</button></td>'+
    '<td><button onclick=deleteData('+i+')  id=delete>Delete</button></td>'
    '</tr>'
    
        }
    }
}

document.getElementById('tbody').innerHTML = table;
}
//clean data