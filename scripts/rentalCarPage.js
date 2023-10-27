"use strict"

window.onload = function(){
    const estimateBtn = document.getElementById("estimateBtn");
    estimateBtn.onclick = function(event) {
        event.preventDefault(); 
        estimateTotalAmount();
    };
}

function estimateTotalAmount(){
    let carRental = 0;
    let options = 0;
    let underAgeCost = 0;
    let totalDue = 0;

    // const pickupDate = document.getElementById("pickupDate").value;
    // console.log("pickup" + pickupDate)

    //Number of Days 
    const numDays = Number(document.getElementById("numberOfDays").value);
    console.log(numDays)

    // Car Rental fee
    carRental = 29.99 * numDays

    // Options 
    const tollTag = document.getElementById("electronic").checked;
    const gps = document.getElementById("gps").checked;
    const roadsideAssistance = document.getElementById("roadsideAssistance").checked;

    if(tollTag){
        options += numDays * 3.95
    }
    if(gps){
        options += numDays * 2.95
    }
    if(roadsideAssistance){
        options += numDays * 2.95
    }


    // Under Age fee
    const underAge = document.getElementById("yes").checked;
    // const overAge = document.getElementById("no").checked;

    if(underAge){
        underAgeCost = carRental * 0.3
    }
    
    // Total Amount Due
    totalDue = underAgeCost + options + carRental 

    document.getElementById("carRental").innerText = "$" + carRental.toFixed(2);
    document.getElementById("options").innerText = "$" + options.toFixed(2);
    document.getElementById("underAge").innerText = "$" + underAgeCost.toFixed(2)
    document.getElementById("totalDue").innerText = "$" + totalDue.toFixed(2);
}