let apiUrl = "https://dummyjson.com/users";
let userCardsContainer = document.getElementById('user-card1');
let userCardsContainer1 = document.getElementById('user-card2');
let userCardsContainer2 = document.getElementById('user-card3');
let userCardsContainer3 = document.getElementById('user-card4');


function generateUserCard(user) {
    let card = document.createElement('tr');
    card.innerHTML = `
    <tr  style="border: 2px;  black">
    <td style=" text-align: center; border: 1px solid black;"> <img width="50px" height="60px" src="${user.image}" alt=""/> </th>
    <td style=" text-align: center; border: 1px solid black;">${user.firstName + " " + user.lastName}</th>
    <td style=" text-align: center; border: 1px solid black;"> ${user.university}</th>
    <td style=" text-align: center; border: 1px solid black;"> ${user.email}</th>
    <td style=" text-align: center; border: 1px solid black;"> ${user.phone}</th>
  </tr>
    `;
    return card;
}

function dataAppendToCard(data)
{
    data = data.users;
    
    for(let i=0;i<5;i++)
    {
        let user=data[i];
        let card = generateUserCard(user);
        userCardsContainer.appendChild(card);
    }

}




// Fetch data using Worker
let fetchWorker;
function fetchDataWithWorker() {
    if (fetchWorker) {
        fetchWorker.terminate();
    }

    fetchWorker = new Worker("fetchWorker.js");
    // Send message to the worker with the API URL
    fetchWorker.postMessage(apiUrl);

    // Listen for messages from worker.js
    fetchWorker.onmessage = function (event) {
        const data = event.data;
        dataAppendToCard(data);
    };
};


// Fetch data using callback
function dataAppendToCard1(data)
{
    data = data.users;
    
    for(let i=0;i<5;i++)
    {
        let user=data[i];
        let card = generateUserCard(user);
        userCardsContainer1.appendChild(card);
    }
    
}


function fetchDataCallback(callback) {
    fetch(apiUrl)
        .then(res=>res.json())
        .then(data=>callback(data))
        .catch(error=>{
            console.log("Error fetch data in callback method ",error)
        })
}

function fetchDataWithCallback() {
    fetchDataCallback(dataAppendToCard1); 
}


// Fetch data using Promise 
function dataAppendToCard2(data)
{
    data = data.users;
    
    for(let i=0;i<5;i++)
    {
        let user=data[i];
        let card = generateUserCard(user);
        userCardsContainer2.appendChild(card);
    }
    
}


function fetchDataPromise(){
    return new Promise((resolve,reject)=>{
        fetch(apiUrl)
            .then(res=>{
                if(!res.ok){
                    throw new Error("Error resoponse in promise");
                }
                return res.json();
            })
            .then(data=>{
                resolve(data);
            })
            .catch(error=>{
                reject(error);
            });
    });
};

function fetchDataWithPromise(){

    fetchDataPromise()
        .then(data=>{
            dataAppendToCard2(data);
        })
        .catch(error=>{
            console.error('Error fetching data Promise: ', error);
        })

}


// Fetch data using Async-await

function dataAppendToCard3(data)
{
    data = data.users;
    
    for(let i=0;i<5;i++)
    {
        let user=data[i];
        let card = generateUserCard(user);
        userCardsContainer3.appendChild(card);
    }
    
}

async function fetchDataWithAsyncAwait(){
    try {
        const res=await fetch(apiUrl);
        const data=await res.json();
        dataAppendToCard3(data);
        
    } catch (error) {
        console.log("🚀 ~ fetchDataWithAsyncAwait ~ error:", error)
    }
}


fetchDataWithWorker();
fetchDataWithCallback();
fetchDataWithPromise();

 fetchDataWithAsyncAwait();


