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

// Clear inputs when reset button is pressed
var reset_btn = document.querySelector("#reset-btn")
reset_btn.onclick = () => {
  document.querySelector("#semester-select").value = ""
  document.querySelector("#department-select").value = ""
}

// Query Metalab API when search button is pressed with given inputs
var search_btn = document.querySelector("#search-btn")
search_btn.onclick = () => {
  var semester = document.querySelector("#semester-select").value
  semester = semester.replace(" ", "-")
  var department = document.querySelector("#department-select").value

  var url = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semester + '/courses/' + department

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      for (i = 0; i < data.courses.length; i++) {
        var catalog_number = data.courses[i].catalog_number;
        var course_id = data.courses[i].course_id;
        var description = data.courses[i].description;
        var section_number = data.courses[i].section_number;
        var subject = data.courses[i].subject;
        var term = data.courses[i].term;
        var title = data.courses[i].title;
        var units = data.courses[i].units;
        var unit_string = "Unit"
        if (units > 1) {
          unit_string = "Units"
        }

        var class_concat = `${subject} ${catalog_number} - ${title} (${units} ${unit_string})`
        console.log(class_concat)
      }
    });
}