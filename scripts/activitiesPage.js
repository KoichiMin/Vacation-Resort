"use strict"

window.onload = function(){
    const selectedChange = document.getElementById("activityTypesSelect")
    selectedChange.onchange = showActivities;

}




function showActivities() {
    const selectedCategory = document.getElementById("activityTypesSelect").value;


    document.getElementById("artsCraftsActivities").style.display = "none";
    document.getElementById("adventureActivities").style.display = "none";
    document.getElementById("museumsCultureActivities").style.display = "none";


    document.getElementById(selectedCategory + "Activities").style.display = "block";
}