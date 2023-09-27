const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");

let expenses = [];

expenseForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount
    };

    expenses.push(expense);

    displayExpenses();
    calculateTotalExpenses();

    // Clear input fields
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
});

function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${expense.name} - ₹${expense.amount.toFixed(2)}</span>
            <button class="delete-button" data-index="₹{index}">Delete</button>
        `;
        expenseList.appendChild(listItem);

        // Attach delete event listener to each delete button
        const deleteButton = listItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", deleteExpense);
    });
}

function calculateTotalExpenses() {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    totalExpenses.textContent = total.toFixed(2);
}

function deleteExpense(event) {
    const index = event.target.getAttribute("data-index");
    expenses.splice(index, 1);
    displayExpenses();
    calculateTotalExpenses();
}

// Initial display
displayExpenses();
calculateTotalExpenses();