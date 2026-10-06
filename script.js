const addHabitBtn = document.querySelector(".add-habit-btn");
const habitInput = document.querySelector(".habit-input");
const habitsList = document.querySelector("#habits-list");
const markAsDoneBtn = document.querySelector(".mark-as-done-btn");
// const historyBtn = document.querySelector(".history-btn");
// const historyBox = document.querySelector(".history-box");
const streakHead = document.querySelector(".streak-head");
const deleteBtn = document.querySelector(".delete-btn");
const todayDate = new Date().toISOString().split("T")[0];
let habitsArray = JSON.parse(localStorage.getItem("HabitsData")) || [];

renderItem();

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}

function saveToLocalStorage() {
    localStorage.setItem("HabitsData", JSON.stringify(habitsArray));
}

addHabitBtn.addEventListener("click", () => {
    const inputValue = habitInput.value;
    if (!inputValue) {
        return;
    }

    const newHabit = {
        id: Date.now(),
        name: inputValue,
        history: []
    }
    habitsArray.push(newHabit);
    saveToLocalStorage()

    console.log(habitsArray)
    // console.log(value);
    habitInput.value = ""
    renderItem();
})


function renderItem() {
    habitsList.innerHTML = "";

    habitsArray.forEach(habit => {

        let historyHTML = "";
        for (let i = 6; i >= 0; i--) {

            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            const wasDone = habit.history.some(entry => entry.date === dateStr);

            historyHTML += `<span>${dateStr}: ${wasDone ? "done" : "not Done"}</span>`
        }

        const isDoneToday = habit.history.some(entry => entry.date === getTodayDate())

        habitsList.innerHTML += `
        
            <div class="habit-list-item">
            <p>${habit.name}</p>
            <button class="mark-as-done-btn" data-id="${habit.id}">${isDoneToday ? "Done" : "Mark as Done"}</button>
            <button class="history-btn" data-id="${habit.id}">History</button>
            <button class="delete-btn" data-id="${habit.id}">Delete</button>
            <div class="history-box hidden" data-id="${habit.id}">${historyHTML}</div>
            </div>

    `;
    }
    )
}

habitsList.addEventListener("click", (e) => {
    if (e.target.closest(".mark-as-done-btn")) {

        const doneBtn = e.target.closest(".mark-as-done-btn");
        const buttonId = Number(doneBtn.dataset.id);
       
        const clickedItem = habitsArray.find(habit => habit.id === buttonId)
        let alreadyDoneToday = clickedItem.history.some(entry => entry.date === getTodayDate());

        if (alreadyDoneToday) {
            clickedItem.history =  clickedItem.history.filter(habit => habit.date !== getTodayDate())

        } else {

            clickedItem.history.push({ date: getTodayDate(), status: "done" })

        }

        saveToLocalStorage();
      
        renderItem();
    }

    else if (e.target.closest(".history-btn")) {
        const historyBtn = e.target.closest(".history-btn");
        const parentElement = historyBtn.parentElement;
        const historyBox = parentElement.querySelector(".history-box")
        historyBox.classList.toggle("hidden");
    }

    else if (e.target.closest(".delete-btn")) {
        const deleteBtn = e.target.closest(".delete-btn");
        const deleteBtnId = Number(deleteBtn.dataset.id);
        console.log("delete")
        habitsArray = habitsArray.filter(habit => habit.id !== deleteBtnId);
        saveToLocalStorage();
        renderItem();

    }

})


