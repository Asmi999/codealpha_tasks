let data = JSON.parse(localStorage.getItem("fitnessData")) || [];

// Add new entry
function addData() {
    let steps = parseInt(document.getElementById("steps").value) || 0;
    let workout = document.getElementById("workout").value;
    let calories = parseInt(document.getElementById("calories").value) || 0;

    let today = new Date().toLocaleDateString();

    data.push({ date: today, steps, workout, calories });

    localStorage.setItem("fitnessData", JSON.stringify(data));

    updateUI();
}

// Update UI
function updateUI() {
    let today = new Date().toLocaleDateString();

    let todayData = data.filter(d => d.date === today);

    let totalSteps = todayData.reduce((sum, d) => sum + d.steps, 0);
    let totalCalories = todayData.reduce((sum, d) => sum + d.calories, 0);

    document.getElementById("totalSteps").innerText = totalSteps;
    document.getElementById("totalCalories").innerText = totalCalories;

    // Progress bars
    document.getElementById("stepsBar").style.width =
        Math.min((totalSteps / 10000) * 100, 100) + "%";

    document.getElementById("caloriesBar").style.width =
        Math.min((totalCalories / 500) * 100, 100) + "%";

    updateWeekly();
}

// Weekly Summary
function updateWeekly() {
    let list = document.getElementById("weeklyList");
    list.innerHTML = "";

    let last7Days = {};

    data.forEach(d => {
        if (!last7Days[d.date]) {
            last7Days[d.date] = { steps: 0, calories: 0 };
        }
        last7Days[d.date].steps += d.steps;
        last7Days[d.date].calories += d.calories;
    });

    let entries = Object.entries(last7Days).slice(-7);

    entries.forEach(([date, val]) => {
        let li = document.createElement("li");
        li.innerText = `${date} - Steps: ${val.steps}, Calories: ${val.calories}`;
        list.appendChild(li);
    });
}

// Load data
updateUI();