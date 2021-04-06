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
  document.querySelector("#class_listings").innerHTML = '';
}

var searchButtonCounter = 0

// Query Metalab API when search button is pressed with given inputs
var search_btn = document.querySelector("#search-btn")
search_btn.onclick = () => {

  // Increase the search button click counter
  searchButtonCounter++

  // If search button counter is greater than 1, then clear any existing class listings
  if (searchButtonCounter > 1) {
    document.querySelector("#class_listings").innerHTML = '';
  }

  // Construct url to ping, given semester and department inputs
  var semester = document.querySelector("#semester-select").value
  semester = semester.replace(" ", "-")
  var department = document.querySelector("#department-select").value

  var url = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semester + '/courses/' + department

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)



      // If there are no classes available then display message
      if (data.courses.length == 0) {
        var class_listing = document.createElement("label")
        class_listing.innerHTML = "No classes found. Select a different semester or department.";
        class_listing.classList.add("font-normal")
        class_listing.classList.add("font-roboto")
        class_listing.classList.add("text-lg")
        document.querySelector("#class_listings").appendChild(class_listing)
      }

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


        // Create concatenation string for the class listing
        var class_concat = `${subject} ${catalog_number} - ${title} (${units} ${unit_string})`
        console.log(class_concat)

        // Create flex box element and append it to #class_listings id
        var flex = document.createElement("div")
        flex.classList.add("flex")
        document.querySelector("#class_listings").appendChild(flex)

        // Create play button element and append it to #class_listings id
        var play_button = document.createElement("input")
        play_button.src = "assets/play 1.svg"
        play_button.type = "image"
        document.querySelector("#class_listings").appendChild(play_button)

        // Create label element and append it to #class_listings id
        var class_listing = document.createElement("label")
        class_listing.innerHTML = class_concat;
        class_listing.classList.add("pl-2")
        class_listing.classList.add("cursor-pointer")
        class_listing.classList.add("font-normal")
        class_listing.classList.add("font-roboto")
        class_listing.classList.add("text-lg")
        class_listing.classList.add("leading-7")
        document.querySelector("#class_listings").appendChild(class_listing)
      }
    });
}