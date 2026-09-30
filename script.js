const addHabitBtn = document.querySelector(".add-habit-btn");
const habitInput = document.querySelector(".habit-input");
const habitsList = document.querySelector("#habits-list");
const markAsDoneBtn = document.querySelector(".mark-as-done-btn");
  const todayDate = new Date().toISOString().split("T")[1];
let habitsArray = [];

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
        const isDoneToday = habit.history.some(entry => entry.date === todayDate)

        habitsList.innerHTML += `
        <div class="habit-list-item">
            <p>${habit.name}</p>
            <button class="mark-as-done-btn" data-id="${habit.id}">${isDoneToday ? "Done" : "Mark as Done"}</button>
        </div>

    `;
    }
    )
}



habitsList.addEventListener("click", (e) => {
    const doneBtn = e.target.closest(".mark-as-done-btn");
    if (doneBtn) {

        const buttonId = Number(doneBtn.dataset.id);
        console.log(buttonId)
        const clickedItem = habitsArray.find(habit => habit.id === buttonId)
        
      
        clickedItem.history.push({ date: todayDate, status: "done" })
        console.log(clickedItem)
        renderItem();
        // clickedItem.button.textContent = "Done"
    }

})

