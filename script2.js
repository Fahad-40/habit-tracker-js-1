const addHabitBtn = document.querySelector(".add-habit-btn");
const habitInput = document.querySelector(".habit-input");
const habitsList = document.querySelector("#habits-list");
const markAsDoneBtn = document.querySelector(".mark-as-done-btn");
// const historyBtn = document.querySelector(".history-btn");
// const historyBox = document.querySelector(".history-box");

const deleteBtn = document.querySelector(".delete-btn");
const todayDate = new Date().toISOString().split("T")[0];
let habitsArray = JSON.parse(localStorage.getItem("HabitsData")) || [];


function saveToLocalStorage() {
    localStorage.setItem("HabitsData", JSON.stringify(habitsArray))
}

function getTodayDate() {
    return new Date().toISOString().split("T")[0]
}

addHabitBtn.addEventListener("click", () => {
    const habitInputvalue = habitInput.value;

    habitsArray.push({
        id: Date.now(),
        name: habitInputvalue,
        history: []
    })
    saveToLocalStorage();
    habitInput.value = "";
    render()

});


function render() {

    let historyHTML = "";

    habitsList.innerHTML = " ";

    habitsArray.forEach(habit => {

        for (let i = 6; i >= 0; i--) {

            const d = new Date();
            d.setDate(d.getDate() - i);
            let dateStr = d.toISOString().split("T")[0];
            let wasDone = habit.history.some(entry => entry.date === dateStr);
            historyHTML = `<span>${dateStr} : ${wasDone ? "Done!" : "Mark as Done"} </span>`
        }

        let isDoneToday = habit.history.some(entry => entry.date === getTodayDate());

        habitsList.innerHTML += `
          
              <div class="habit-list-item">
              <p>${habit.name}</p>
      <button class="mark-as-done-btn" data-id="${habit.id}">${isDoneToday ? "Done" : "Mark As Done"}</button>
              <button class="delete-btn" data-id="${habit.id}">Delete</button>
              <button class="history-btn" data-id="${habit.id}">History</button>
              <div class="history-box hidden" data-id="${habit.id}">${historyHTML}</div>
              </div>
  
      `;

    });

}
render()
//   <button class="mark-as-done-btn" data-id="${habit.id}">${isDoneToday ? "Done" : "Mark as Done"}</button>

habitsList.addEventListener("click" , (e) => {

if (e.target.closest(".mark-as-done-btn")) {
    
}


})