const addHabitBtn = document.querySelector(".add-habit-btn");
const habitInput = document.querySelector(".habit-input");
const habitsList = document.querySelector(".habits-list");

let habitsArray = [];

addHabitBtn.addEventListener("click" , () => {
const value = habitInput.value;



console.log(value);
habitInput.value = ""
})