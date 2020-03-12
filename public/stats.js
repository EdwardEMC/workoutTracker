// get all workout data from back-end

fetch("/api/workouts/range")
  .then(response => {
    return response.json();
  })
  .then(data => {
    populateChart(data);
  });


API.getWorkoutsInRange()

  function generatePalette() {
    const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
  }
function populateChart(data) {
  let durations = duration(data);
  let durationsSD = durationSD(data);
  let pounds = calculateTotalWeight(data);
  let poundsSD = calculateTotalWeightSD(data);
  let workouts = workoutNames(data);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: printDays(), //make data points link up with correct day
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durationsSD,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: printDays(), //make data points link up with correct day
      datasets: [
        {
          label: "Pounds",
          data: poundsSD,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercise Duration",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercise Duration"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Weight Lifted",
          backgroundColor: colors,
          data: pounds
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Weight Lifted"
      }
    }
  });
}

function duration(data) {
  let durations = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      durations.push(exercise.duration);
    });
  });

  return durations;
}


function calculateTotalWeight(data) {
  let total = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      total.push(exercise.weight);
    });
  });

  return total;
}

//=======================================================================
// Functions to combine exercises to same day (if on same day) instead of having a new day for each workout and dynamically generate the last week of workouts
// Created separate functions due to pie/doughnut charts causing errors when manipulating given functions above
function durationSD(data) {
  let durations = []; //if no workout is done set to 0
  let xaxis = [];
  data.forEach(workout => {
    let duration = 0; //added to make the exercises cumulative for each day instead of making a new data point for each exercise
    workout.exercises.forEach(exercise => {
      duration += exercise.duration;
    });

    let day = workout.day //getting the day and saving it for the x axis location
    let d = new Date(day.split("T"));
    let xlocal = d.getDay();

    xaxis.push({x:xlocal, y:duration});
  });

  let today = new Date().getDay();
  let i = today;
  for(let z=0; z<7; z++) {
    if(i == -1) {
      i = 6;
    }
    let includes = false;
    xaxis.forEach(element => {
      if(element.x === i) {
        durations.unshift(element.y);
        includes = true;
      }
    })
    if(includes === false) {
      durations.unshift(0);
    }
    i -= 1;
  }
  return durations;
}

function calculateTotalWeightSD(data) {
  let total = [];
  let xaxis = [];
  data.forEach(workout => {
    let weights = 0; //added to make the exercises cumulative for each day instead of making a new data point for each exercise
    workout.exercises.forEach(exercise => {
      if(exercise.weight) {
        weights += exercise.weight;
      }
    });
    let day = workout.day //getting the day and saving it for the x axis location
    let d = new Date(day.split("T"));
    let xlocal = d.getDay();

    xaxis.push({x:xlocal, y:weights});
  });
  
  let today = new Date().getDay();
  let i = today;
  for(let z=0; z<7; z++) {
    if(i == -1) {
      i = 6;
    }
    let includes = false;
    xaxis.forEach(element => {
      if(element.x === i) {
        total.unshift(element.y);
        includes = true;
      }
    })
    if(includes === false) {
      total.unshift(0);
    }
    i -= 1;
  }

  return total;
}
//=======================================================================

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  return workouts;
}

function printDays() {
  let day = new Date();
  let current = day.getDay(); //gives a number 0 - 6 | Sun - Sat
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let labels = [];
  let i = current;
  for(let x=0; x<7; x++) {
    if(i == -1) {
      i = 6;
      labels.unshift(days[i]);
    }
    else {
      labels.unshift(days[i]);
    }
    i -= 1;
  }
  return labels;
}