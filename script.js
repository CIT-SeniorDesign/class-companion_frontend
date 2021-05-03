var checkboxCounter = 0

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
    document.querySelector("#class_listings").innerHTML = ''
    document.querySelector("#selectedClasses").innerHTML = ''
    document.querySelector("#class_listings_title").style.display = "none"
    checkboxCounter = 0
  }
}

// Query Metalab API when search button is pressed with given inputs
var search_btn = document.querySelector("#search-btn")
var searchButtonCounter = 0
var classTitleCounter = 0

// Search for classes
search_btn.onclick = () => {

  // Increase the search button click counter
  searchButtonCounter++
  document.querySelector("#class_listings_title").style.display = "inline"

  // If search button counter is greater than 1, then clear any existing class listings
  if (searchButtonCounter > 1) {
    document.querySelector("#class_listings").innerHTML = '';
    // document.querySelector("#selectedClasses").innerHTML = '';
    // b = 0
  }

  // Construct url to ping MetaLab api, given semester and department inputs
  var semesterValue = document.querySelector("#semester-select").value
  semesterValue = semesterValue.replace(" ", "-")
  var departmentValue = document.querySelector("#department-select").value

  var url = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semesterValue + '/courses/' + departmentValue

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

        var classUrl = 'https://api.metalab.csun.edu/curriculum/api/2.0/terms/' + semesterValue + '/classes/' + subject + '-' + catalog_number
        classUrl = `"${classUrl}"`

        // Create parent div element
        var parentDiv = document.createElement("div")
        parentDiv.id = `parentDiv-${i}`
        parentDiv.classList.add("pb-2")
        document.querySelector("#class_listings").appendChild(parentDiv)

        // Create flex box element and append it to #class_listings id
        var flex = document.createElement("div")
        flex.classList.add("flex", "items-center", "block")
        flex.id = `flexbox-${i}`
        document.querySelector(`#parentDiv-${i}`).appendChild(flex)

        // Create play button element and append it to #class_listings id
        var play_button = document.createElement("input")
        play_button.src = "assets/play 1.svg"
        play_button.type = "image"
        play_button.id = `playbutton-class-content${i}`
        play_button.setAttribute('onclick', `generateCourseTable(this.nextElementSibling.id, this.nextElementSibling, ${classUrl})`)
        document.querySelector(`#flexbox-${i}`).appendChild(play_button)

        // Create label element and append it to #class_listings id
        var class_listing = document.createElement("label")
        var class_title = `${subject} ${catalog_number} - ${title} (${units} ${unit_string})`
        class_listing.innerHTML = class_title;
        class_listing.classList.add("pl-2")
        class_listing.classList.add("cursor-pointer")
        class_listing.classList.add("font-normal")
        class_listing.classList.add("font-roboto")
        class_listing.classList.add("text-lg")
        class_listing.classList.add("leading-7")
        class_listing.classList.add("font-medium")
        class_listing.id = `class-content${i}`
        class_listing.setAttribute('onclick', `generateCourseTable(this.id, this, ${classUrl})`)
        document.querySelector(`#flexbox-${i}`).appendChild(class_listing)

      }
    });
}

function collapseTable(parentElement, thisTest) {
  // Rotate the arrow down when clicked
  var playButtonSelector = document.querySelector(`#playbutton-${parentElement}`)

  var tableElement = thisTest.parentElement.nextElementSibling
  if (tableElement.style.display === "table") {
    playButtonSelector.classList.remove("transform", "rotate-90")
    tableElement.style.display = "none";
  } else {
    playButtonSelector.classList.add("transform", "rotate-90")
    tableElement.style.display = "table";
  }

}

function generateCourseTable(parentElement, thisTest, classUrl) {
  // searchButtonCounter++
  // console.log(searchButtonCounter)
  classListingsElement = thisTest.parentElement.parentElement
  var classId = classListingsElement.id
  console.log(parentElement)

  var playButtonElement = thisTest.previousElementSibling

  // Rotate the arrow down when clicked
  var playButtonSelector = document.querySelector(`#playbutton-${parentElement}`)
  playButtonSelector.classList.add("transform", "rotate-90")

  // Remove onclick function once class is clicked
  thisTest.removeAttribute("onclick");
  playButtonElement.removeAttribute("onclick")


  // Fetch classes for selected semester and department
  fetch(classUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)

      // Create table element
      var courseTable = document.createElement("table")
      courseTable.classList.add("border", "border-solid", "rounded-sm", "mt-4", "mb-3", "text-base")
      courseTable.id = `classtable${parentElement}`
      courseTable.style.display = "table";
      document.querySelector(`#${classId}`).appendChild(courseTable)

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
      courseHeader1.classList.add("font-semibold")
      courseHeader1.innerHTML = "Session"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader1)

      var courseHeader2 = document.createElement("th")
      courseHeader2.classList.add("font-semibold")
      courseHeader2.innerHTML = "Section"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader2)

      var courseHeader3 = document.createElement("th")
      courseHeader3.classList.add("font-semibold")
      courseHeader3.innerHTML = "Class #"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader3)

      var courseHeader4 = document.createElement("th")
      courseHeader4.classList.add("font-semibold")
      courseHeader4.innerHTML = "Status"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader4)

      var courseHeader5 = document.createElement("th")
      courseHeader5.classList.add("font-semibold")
      courseHeader5.innerHTML = "Open Seats"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader5)

      var courseHeader6 = document.createElement("th")
      courseHeader6.classList.add("font-semibold")
      courseHeader6.innerHTML = "Type"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader6)

      var courseHeader7 = document.createElement("th")
      courseHeader7.classList.add("font-semibold")
      courseHeader7.innerHTML = "Location"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader7)

      var courseHeader8 = document.createElement("th")
      courseHeader8.classList.add("font-semibold")
      courseHeader8.innerHTML = "Days"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader8)

      var courseHeader9 = document.createElement("th")
      courseHeader9.classList.add("font-semibold")
      courseHeader9.innerHTML = "Time"
      document.querySelector(`#tablerow${parentElement}`).appendChild(courseHeader9)

      var courseHeader10 = document.createElement("th")
      courseHeader10.classList.add("font-semibold")
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
        var instructorRating

        var instructorFirstName
        var instructorLastName

        if (instructors.length == 0) {
          instructors = "No data."
        }
        else {
          instructors = data.classes[i].instructors[0].instructor
          instructors = instructors.replace('@csun.edu', '').replace('.', ' ').replace('@my.csun.edu', '').replace(/(\.[0-9][0-9][0-9])|(\.[0-9][0-9])|(\.[0-9])|(\@csun.edu)/, '')
          const words = instructors.split(" ");

          for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
          }

          // console.log(words)
          instructorFirstName = words[0]
          instructorLastName = words[1]

          words.reverse()
          instructors = words.join(", ")
          // instructors = instructors + ` <a href="test.html">Test</a>`



        }

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
        tableDataRow.classList.add("divide-x-1", "border-b-1", "group")
        tableDataRow.id = `dataRow${parentElement}${i}`
        document.querySelector(`#classtable${parentElement}`).appendChild(tableDataRow)

        // Create table data elements
        var tableElements = []
        var tableDataContent = [`<input type="checkbox" class="transform scale-125" id="${parentElement}_checkBox${i}">`, "1", section_number, class_number, status, open_seats, class_type, location, days, `${meeting_time}`, instructors]


        for (var num = 0; num < 11; num++) {
          tableElements[num] = document.createElement("td")
          tableElements[num].classList.add("group-hover:bg-yellow-100")

          if (num == 0) {
            tableElements[num].addEventListener("click", (event) => {
              var checkbox = event.target.firstChild
              checkbox.click()
            })
          }

          if (location == "ONLINE" || location == "No data.") {
            tableElements[num].innerHTML = tableDataContent[num]
            document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])
          }
          else {
            if (num == 7) {
              tableElements[num].id = `location_${parentElement}${i}`
              tableElements[num].innerHTML = tableDataContent[num]
              document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])

              var waldoApiUrl = `https://api.metalab.csun.edu/waldo/1.0/rooms?room=${location}`
              console.log(waldoApiUrl)

              var latitude
              var longitude
              var googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`

              const fetchWaldo = fetch(waldoApiUrl)
                .then(response => response.json())
                .then(data => {
                  latitude = data.rooms[0].latitude
                  longitude = data.rooms[0].longitude
                  googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                  return googleMapsURL
                });

              const printCoordinates = (tableElements, num, location, parentElement, i) => {
                fetchWaldo.then((a) => {
                  console.log(a);
                  if (num == 7) {
                    document.querySelector(`#location_${parentElement}${i}`).innerHTML = `<a href='${a}' class="underline" target="_blank">${location}</a>`
                  }
                });
              };
              printCoordinates(tableElements, num, location, parentElement, i);
            }
            else {
              tableElements[num].innerHTML = tableDataContent[num]
              document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])
            }
          }

          if (instructors == "No data.") {
            tableElements[num].innerHTML = tableDataContent[num]
            document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])
          }
          else {
            if (num == 10) {
              tableElements[num].id = `instructor_${parentElement}${i}`
              tableElements[num].innerHTML = tableDataContent[num]
              document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])

              var rmpURL = `https://tnd3uniac2.execute-api.us-east-1.amazonaws.com/dev/getprofessor?firstName=${instructorFirstName}&lastName=${instructorLastName}`
              console.log(rmpURL)
              const fetchWaldo = fetch(rmpURL)
                .then(response => response.json())
                .then(data => {
                  // latitude = data.rooms[0].latitude
                  // longitude = data.rooms[0].longitude
                  // googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
                  // return googleMapsURL

                  console.log(data)
                  var professorLink = data.profLink
                  var rating = data.rating
                  var reviewCount = data.reviewCount
                  var rmpData = [professorLink, rating, reviewCount]
                  return rmpData
                });

              const printCoordinates = (tableElements, num, location, parentElement, i) => {
                fetchWaldo.then((a) => {
                  console.log(a);
                  if (num == 10) {
                    if (a[0] == undefined || a[1] == undefined || a[2] == undefined) {
                      var spanElement = document.createElement("span")
                      spanElement.innerHTML = ` <span>(No data)</span>`
                      document.querySelector(`#instructor_${parentElement}${i}`).appendChild(spanElement)
                    }
                    else {
                    var spanElement = document.createElement("span")
                      spanElement.innerHTML = ` (<a href='${a[0]}' class="underline" target="_blank">${a[1]}</a>)`
                    document.querySelector(`#instructor_${parentElement}${i}`).appendChild(spanElement)
                    }
                  }
                });
              };
              printCoordinates(tableElements, num, location, parentElement, i);
            }
            else {
              tableElements[num].innerHTML = tableDataContent[num]
              document.querySelector(`#dataRow${parentElement}${i}`).appendChild(tableElements[num])
            }
          }
        }

        thisTest.setAttribute('onclick', `collapseTable(this.id, this)`)
        playButtonElement.setAttribute('onclick', `collapseTable(this.nextElementSibling.id, this.nextElementSibling)`)

        // Add event listener to all checkboxes
        var checkBoxSelector = document.querySelector(`#${parentElement}_checkBox${i}`)
        // Add class number to notification section when checkbox is clicked



        checkBoxSelector.addEventListener("click", (event) => {
          // Get the class number of the selected checkbox
          var classNumber = event.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML
          var classNumberString = classNumber.toString()
          var selectedClassesSelector = document.querySelector("#selectedClasses")
          var selectedClassesArray = []
          checkboxCounter++

          // Checkbox logic
          if (event.target.checked == true) {
            selectedClassesArray[checkboxCounter] = classNumber
            var spanElement = document.createElement("span")
            if (checkboxCounter == 1) {
              spanElement.innerHTML = `${selectedClassesArray[checkboxCounter]}`
            } else {
              spanElement.innerHTML = `, ${selectedClassesArray[checkboxCounter]}`
            }
            selectedClassesSelector.appendChild(spanElement)
            console.log(checkboxCounter)
          }
          else {
            checkboxCounter -= 2
            console.log(checkboxCounter)
            selectedClassesSelector.removeChild(Array.from(selectedClassesSelector.childNodes).find(v => v.innerHTML == `, ${classNumber}` || v.innerHTML == classNumber))
          }
        })

      }
    }


    );


}

