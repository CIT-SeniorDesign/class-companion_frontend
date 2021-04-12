// Generate the different semester and year combinations
generateSemesterAndYear()

function generateSemesterAndYear() {
  // Get current year
  var currentYear = new Date().getFullYear()

  // Subtract current year with 2004
  var oldestYear = 2004
  var maxNumOfYears = currentYear - oldestYear

  // Generate semester and year combination
  var i
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
}

// Clear semester and department inputs, and class listings
clearInputs()

function clearInputs() {
  // Select the reset-btn id
  var resetButton = document.querySelector("#reset-btn")

  // Clear semester and department inputs, and class listings
  resetButton.onclick = () => {
    document.querySelector("#semester-select").value = ""
    document.querySelector("#department-select").value = ""
    document.querySelector("#class_listings").innerHTML = '';
  }
}

// Query Metalab API when search button is pressed with given inputs
var search_btn = document.querySelector("#search-btn")
var searchButtonCounter = 0

search_btn.onclick = () => {

  // Increase the search button click counter
  searchButtonCounter++

  // If search button counter is greater than 1, then clear any existing class listings
  if (searchButtonCounter > 1) {
    document.querySelector("#class_listings").innerHTML = '';
  }

  // Construct url to ping MetaLab api, given semester and department inputs
  var semester = document.querySelector("#semester-select").value
  semester = semester.replace(" ", "-")
  var department = document.querySelector("#department-select").value

  var url = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semester + '/courses/' + department

  // Ping MetaLab api
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // console.log(data)

      // If there are no classes available then display message
      if (data.courses.length == 0) {
        var class_listing = document.createElement("label")
        class_listing.innerHTML = "No classes found. Select a different semester or department.";
        class_listing.classList.add("font-normal")
        class_listing.classList.add("font-roboto")
        class_listing.classList.add("text-lg")
        document.querySelector("#class_listings").appendChild(class_listing)
      }

      // Loop through the courses and store the proper variables
      for (i = 0; i < data.courses.length; i++) {
        var catalog_number = data.courses[i].catalog_number;
        var course_id = data.courses[i].course_id;
        var description = data.courses[i].description;
        var section_number = data.courses[i].section_number;
        var subject = data.courses[i].subject;
        var term = data.courses[i].term;
        var title = data.courses[i].title;
        var units = data.courses[i].units;
        var unit_string = "unit"
        if (units > 1) {
          unit_string = "units"
        }

        var classUrl = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semester + '/classes/' + subject + '-' + catalog_number
        classUrl = `"${classUrl}"`
        // console.log(classUrl)

        // Create concatenation string for the class listing
        var class_concat = `${subject} ${catalog_number} - ${title} (${units} ${unit_string})`
        // console.log(class_concat)

        // Create flex box element and append it to #class_listings id
        var flex = document.createElement("div")
        flex.classList.add("flex")
        document.querySelector("#class_listings").appendChild(flex)

        // Create play button element and append it to #class_listings id
        var play_button = document.createElement("input")
        play_button.src = "assets/play 1.svg"
        play_button.type = "image"
        play_button.id = `playbutton-class-content${i}`
        // play_button.id = `play-button${i}`
        // play_button.setAttribute('onclick', `generateCourseTable(this.id, ${section_number}, ${classUrl})`)
        document.querySelector("#class_listings").appendChild(play_button)

        // Create label element and append it to #class_listings id
        var class_listing = document.createElement("label")
        // class_listing.htmlFor = `playbutton-${i}`
        class_listing.innerHTML = class_concat;
        class_listing.classList.add("pl-2")
        class_listing.classList.add("cursor-pointer")
        class_listing.classList.add("font-normal")
        class_listing.classList.add("font-roboto")
        class_listing.classList.add("text-lg")
        class_listing.classList.add("leading-7")
        class_listing.id = `class-content${i}`
        class_listing.setAttribute('onclick', `generateCourseTable(this.id, ${section_number}, ${classUrl})`)
        document.querySelector("#class_listings").appendChild(class_listing)

      }
    });
}


function generateCourseTable(parentElement, section_number, classUrl) {
  console.log(parentElement)
  // console.log(this)
  // console.log(section_number)
  // console.log(classUrl)

  // Rotate the arrow down
  var playButtonSelector = document.querySelector(`#playbutton-${parentElement}`)
  playButtonSelector.classList.add("transform", "rotate-90" )

  // Fetch classes for selected semester and department
  fetch(classUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      // Create table element
      var courseTable = document.createElement("table")
      courseTable.classList.add("border", "border-solid", "rounded-sm", "mt-3", "mb-6", "text-base")
      courseTable.id = `classtable${parentElement}`
      document.querySelector(`#${parentElement}`).appendChild(courseTable)

      // Create table header row element
      var courseRow = document.createElement("tr")
      courseRow.classList.add("text-left", "divide-x-1", "bg-black", "bg-opacity-5", "border-b-1")
      courseRow.id = `tablerow${parentElement}`
      document.querySelector(`#classtable${parentElement}`).appendChild(courseRow)

      // Create table header elements
      var courseHeader0 = document.createElement("th", "")
      courseHeader0.innerHTML = ""
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader0)

      var courseHeader1 = document.createElement("th")
      courseHeader1.innerHTML = "Session"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader1)

      var courseHeader2 = document.createElement("th")
      courseHeader2.innerHTML = "Section"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader2)

      var courseHeader3 = document.createElement("th")
      courseHeader3.innerHTML = "Class #"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader3)

      var courseHeader4 = document.createElement("th")
      courseHeader4.innerHTML = "Status"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader4)

      var courseHeader5 = document.createElement("th")
      courseHeader5.innerHTML = "Open Seats"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader5)

      var courseHeader6 = document.createElement("th")
      courseHeader6.innerHTML = "Type"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader6)

      var courseHeader7 = document.createElement("th")
      courseHeader7.innerHTML = "Location"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader7)

      var courseHeader8 = document.createElement("th")
      courseHeader8.innerHTML = "Days"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader8)

      var courseHeader9 = document.createElement("th")
      courseHeader9.innerHTML = "Time"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader9)

      var courseHeader10 = document.createElement("th")
      courseHeader10.innerHTML = "Instructor"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader10)

      // Loop through classes
      for (i = 0; i < data.classes.length; i++) {
        var catalog_number = JSON.stringify(data.classes[i].catalog_number)
        var class_number = data.classes[i].class_number
        var class_type = data.classes[i].class_type
        var course_id = data.classes[i].course_id
        var description = data.classes[i].description
        var enrollment_cap = data.classes[i].enrollment_cap
        var enrollment_count = data.classes[i].enrollment_count
        var instructors = data.classes[i].instructors
        var status
        var open_seats = enrollment_cap - enrollment_count

        var instructorFirstName
        var instructorLastName

        if (instructors.length == 0) {
          instructors = "No data."
        }
        else {
          instructors = data.classes[i].instructors[0].instructor
          instructors = instructors.replace('.', ' ').replace('@csun.edu', '')
          const words = instructors.split(" ");

          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }

          words.reverse()
          instructors = words.join(", ")
        }
        // instructors = instructors[0].instructor
        // console.log(instructorName)

        // If enrollment capacity is greater than the amount of people enrolled, then print Open
        if (enrollment_cap > enrollment_count) {
          status = "Open"
        }
        else {
          status = "Closed"
        }

        var end_time
        var location
        var meeting_number
        var start_time
        var meeting_time

        var meetings = data.classes[i].meetings
        if (meetings.length == 0) {
          days = "No data."
          end_time = "No data."
          location = "No data."
          meeting_number = "No data."
          start_time = "No data."
          meeting_time = "No data."
        }
        else {
          days = data.classes[i].meetings[0].days
          end_time = data.classes[i].meetings[0].end_time
          location = data.classes[i].meetings[0].location
          meeting_number = data.classes[i].meetings[0].meeting_number
          start_time = data.classes[i].meetings[0].start_time

          var startTimeHour = start_time.replace('h', '').slice(0, 2) + ':'
          var startTimeMinute = start_time.replace('h', '').slice(2, 4)

          const startTime12hr = new Date('1970-01-01T' + startTimeHour + startTimeMinute + 'Z')
            .toLocaleTimeString({},
              { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );

          var endTimeHour = end_time.replace('h', '').slice(0, 2) + ':'
          var endTimeMinute = end_time.replace('h', '').slice(2, 4)

          const endTime12hr = new Date('1970-01-01T' + endTimeHour + endTimeMinute + 'Z')
            .toLocaleTimeString({},
              { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
            );

          meeting_time = `${startTime12hr} - ${endTime12hr}`
        }

        var section_number = data.classes[i].section_number
        var subject = data.classes[i].subject
        var term = data.classes[i].term
        var title = data.classes[i].title
        var units = data.classes[i].units
        var waitlist_cap = data.classes[i].waitlist_cap
        var waitlist_count = data.classes[i].catalog_number

        // Create table data row
        var tableDataRow = document.createElement("tr")
        tableDataRow.classList.add("divide-x-1", "border-b-1")
        tableDataRow.id = `dataRow${parentElement}${i}`
        document.querySelector(`#classtable${parentElement}`).appendChild(tableDataRow)

        // Create table data elements
        var tableElements = []
        var tableDataContent = ["-", "1", section_number, class_number, status, open_seats, class_type, location, days, `${meeting_time}`, instructors]

        for (var num = 0; num < 11; num++) {
          tableElements[num] = document.createElement("td")
          // if (num == 10) {
          //   // If no instructors found, then print No data
          //   if (instructors.length == 0) {
          //     tableElements[num].innerHTML = "No data."
          //   }
          //   else {
          //     instructors = data.classes[i].instructors[0].instructor
          //     var directoryUrl = 'https://api.metalab.csun.edu/directory/api/members/email/' + instructors

          //     fetch(directoryUrl)
          //       .then(response => response.json())
          //       .then(data => {
          //         console.log(data)
          //         instructorLastName = data.people.last_name
          //         instructorFirstName = data.people.first_name
          //         instructorName = `${instructorLastName}, ${instructorFirstName}`
          //         console.log(instructorName)

          //       }
          //       );
          //     tableElements[num].innerHTML = instructorName
          //   }
          // } 
          // else {
          tableElements[num].innerHTML = tableDataContent[num]
          // }
          document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])
        }
      }
    }
    );
}