// Write your JavaScript code here!
window.addEventListener("load", function() {
   let pilotName = document.querySelector("input[name=pilotName]");
   let copilotName = document.querySelector("input[name=copilotName]");
   let fuelLevel = document.querySelector("input[name=fuelLevel]");
   let cargoMass = document.querySelector("input[name=cargoMass]");
   let launchStatus = document.getElementById("launchStatus");
   let faultyItems = document.getElementById("faultyItems");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let fuelAndCargo = [fuelLevel, cargoMass]
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         alert("All fields are required!");
      } else if (!isNaN(pilotName.value) || !isNaN(copilotName.value) || isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
         alert("Make sure to enter valid information for each field!");
      } else if (fuelLevel.value < 10000 || cargoMass.value > 10000) {
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = "red";
         pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;
         for (let i = 0; i < fuelAndCargo.length; i++) {
            if (fuelLevel.value < 10000) {
               fuelStatus.innerHTML = `Fuel level too low for launch`;
            }
            if (cargoMass.value > 10000) {
               cargoStatus.innerHTML = `Cargo mass too high for launch`;
            }
            faultyItems.style.visibility = "visible";
         }
      } else {
         launchStatus.innerHTML = `Shuttle is ready for launch`;
         launchStatus.style.color = "green"; 
      }
   });
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         let missionTarget = document.getElementById("missionTarget");
         let randomSelection = Math.floor(Math.random() * json.length);
         let mission = json[randomSelection];
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${mission.name}</li>
               <li>Diameter: ${mission.diameter}</li>
               <li>Star: ${mission.star}</li>
               <li>Distance from Earth: ${mission.distance}</li>
               <li>Number of Moons: ${mission.moons}</li>
            </ol>
            <img src="${mission.image}">
         `;
      });
   });
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
