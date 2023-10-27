"use strict"

window.onload = function(){
    const reservationBtn = document.getElementById("reservationBtn");
    reservationBtn.onclick = function(event){
        event.preventDefault(); 
        estimateCost();
    }

    const modalBtn = document.getElementById("modal");
    modalBtn.onclick = function(event){
        event.preventDefault();
        confirmationNum()
    }

}

// confirmation info to display 
let confirmationMonth;
let confirmationYear;
let confirmationStay;
let confirmationAdults;
let confirmationKids;



function estimateCost(){
    const roomTypes = {
        "queen": {
        type: "queen",
        capacity: 5,
        "offSeason": 150,
        "inSeason": 250,
        },
        "king": {
        type: "king",
        capacity: 2,
        offSeason: 150,
        "inSeason": 250,
        },
        "twoBedroom": {
        type: "twoBedroom",
        capacity: 6,
        "offSeason": 210,
        "inSeason": 350,
        },
    };

    const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"];


    // find the bedside option chosen by user 
    const radioBtns = document.querySelectorAll('input[name="bedside"]');
    let bedsideOption  = Array.from(radioBtns).find((radio)=>{
        return  radio.checked; 
    })
    bedsideOption = bedsideOption.value
    // console.log(typeof bedsideOption, roomTypes[bedsideOption].capacity)
    

    // calculate total amount of guests
    const numAdults = Number(document.getElementById("numAdults").value);
    const numKids = Number( document.getElementById("numKids").value);
    const totalGuests = numAdults + numKids;
    confirmationAdults = numAdults;
    confirmationKids = numKids;



    // send message if total amount of guest is higher than capacity of bedroom
    if(roomTypes[bedsideOption].capacity < totalGuests){
        const messageDiv = document.getElementById("messageDiv");
        messageDiv.innerText = "The room you selected will not hold your party"

        // remove cost Indo 
        const costInfo = document.getElementById("costInfo");
        costInfo.style.display = "none";
        
        // remove modal button
        const modalButton = document.getElementById("modal");
        modalButton.style.display = "none";

    } else{
        const messageDiv = document.getElementById("messageDiv");
        messageDiv.innerText = "";
        const costInfo = document.getElementById("costInfo");
        costInfo.style.display = "block";
        
        // find month of checking
        const checkIn =  document.getElementById("checkIn");
        const dateString = checkIn.value;
        const date = new Date(dateString);
        confirmationMonth = date.getMonth() + 1;
        confirmationYear = date.getFullYear();
        const findMonth = months[date.getMonth()];
        // console.log( findMonth);

        // find out if month is considered in Season or out of Season
        const inSeasonDate = ["June", "July", "August"];
        let season;
        if(inSeasonDate.includes(findMonth)){
            season = "inSeason"
        } else{
            season = "offSeason"
        }
        // console.log(season)

        // find number of Days user staying
        const numDays = Number(document.getElementById("numDays").value);
        confirmationStay = numDays

        // original cost 
        const originalCost = numDays * roomTypes[bedsideOption][season]
        

        // find discounts
        let discountAmount;
        let discountDisplay = 0
        const radioBtns = document.querySelectorAll('input[name="discount"]');
        let discountOption  = Array.from(radioBtns).find((radio)=>{
            return  radio.checked; 
        })
        discountOption = discountOption.value
        if(discountOption == "aaa"){
            discountAmount = 0.1
            discountDisplay = originalCost * discountAmount
        }else if(discountOption === "military"){
            discountAmount = 0.2
            discountDisplay = originalCost * discountAmount
        }

        // discounted room Cost
        const discountedRoomCost = originalCost - discountDisplay

        //  taxes
        const taxes = discountedRoomCost * 0.12


        //final cost 
        const finalCost = taxes + discountedRoomCost

        // display modal button
        const modalButton = document.getElementById("modal");
        modalButton.style.display = "block";

        // console.log(finalCost)
        document.getElementById("originalRoomCost").innerText = "$" + originalCost.toFixed(2);
        document.getElementById("discountDisplay").innerText = "$" + discountDisplay.toFixed(2);
        document.getElementById("discountedRoomCost").innerText = "$" + discountedRoomCost.toFixed(2)
        document.getElementById("taxes").innerText = "$" + taxes.toFixed(2)
        document.getElementById("finalCost").innerText = "$" + finalCost.toFixed(2);

    }
}


function confirmationNum(){
    const name = document.getElementById("name").value;
    const confirmationName = name.slice(0, 3).toUpperCase();

    const confirmationDetails = confirmationName + "-" + confirmationMonth + confirmationYear + "-" + confirmationStay + ":" + confirmationAdults + ":" + confirmationKids
    // console.log(confirmationDetails)
    document.getElementById("confirmationInfo").innerText = confirmationDetails

}