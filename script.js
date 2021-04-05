// Get current year
var currentYear = new Date().getFullYear()

// Subtract current year with 2004
var oldestYear = 2004
var maxNumOfYears = currentYear - oldestYear

// Generate semester and year combination
for (i = 0; i <= maxNumOfYears; i++) {
  // Generate list of years
  var year = currentYear - i
  var fallYear = "Fall " + year
  var summerYear = "Summer " + year
  var springYear = "Spring " + year
  
  // Create an option element for Fall and Year combination
  var fallOption = document.createElement("option")
  fallOption.innerHTML = fallYear;
  document.querySelector("#semester-select").appendChild(fallOption)

  // Create an option element for Summer and Year combination
  var summerOption = document.createElement("option")
  summerOption.innerHTML = summerYear;
  document.querySelector("#semester-select").appendChild(summerOption)

  // Create an option element for Spring and Year combination
  var springOption = document.createElement("option")
  springOption.innerHTML = springYear;
  document.querySelector("#semester-select").appendChild(springOption)
}