const addHabitBtn = document.querySelector(".add-habit-btn");
const habitInput = document.querySelector(".habit-input");
const habitsList = document.querySelector("#habits-list");
const markAsDoneBtn = document.querySelector(".mark-as-done-btn");
const historyBtn = document.querySelector(".history-btn");
const historyBox = document.querySelector(".history-box");
const todayDate = new Date().toISOString().split("T")[0];
const habitsArray = [];

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


        const isDoneToday = habit.history.some(entry => entry.date === todayDate)

        habitsList.innerHTML += `
        
       
        <div class="habit-list-item1">
            <div class="habit-list-item">
            <p>${habit.name}</p>
            <button class="mark-as-done-btn" data-id="${habit.id}">${isDoneToday ? "Done" : "Mark as Done"}</button>
            <button class="history-btn" data-id="${habit.id}">History</button>
            </div>
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
        console.log(buttonId)
        const clickedItem = habitsArray.find(habit => habit.id === buttonId)

        clickedItem.history.push({ date: todayDate, status: "done" })
        console.log(clickedItem)
        renderItem();
    }

    else if (e.target.closest(".history-btn")) {
const historyBtn = e.target.closest(".history-btn");
// const clickedBtn = 
        // historyBox.classList.toggle("flex")

const parentElement = historyBtn.parentElement;

const historyBox = parentElement.querySelector(".history-box")
historyBox.classList.toggle("hidden");
    }

})

