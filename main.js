const textCenter = document.querySelector("#text-center");
//incomes
const incomeTitle = document.querySelector("#incomeTitle");
const incomeValue = document.querySelector("#incomeValue");
const incomesList = document.querySelector("#incomesList");
const incomesValue = document.querySelector("#incomesValue");
const addIncome = document.querySelector("#addIncome");
//expenses
const expenseTitle = document.querySelector("#expenseTitle");
const expenseValue = document.querySelector("#expenseValue");
const expensesList = document.querySelector("#expensesList");
const expensesValue = document.querySelector("#expensesValue");
const addExpense = document.querySelector("#addExpense");


const incomes =[];
const expenses = [];

let totalIncomes = 0;
let totalExpenses = 0;
let totalAmount;

const displayText = () => {

    if (totalAmount === 0) {
        return `Your balance is zero`;
    } else if (totalAmount>0) {
        return `You can still spend ${totalAmount} PLN`;
    } else {
        return  `The balance is negative. You're in the red ${totalAmount} PLN`;
    }
   
};

const incomesAddElem = () => {
    const incomeEle = {
        title: incomeTitle.value,
        value: Number(incomeValue.value),
        id: (Math.random() * 100000).toFixed(0),
    };
    incomes.push(incomeEle);
    createIncomeListItem(incomeEle.title, incomeEle.value, incomeEle.id);
    calculateIncomes();
    totalAmount = totalIncomes - totalExpenses;
    textCenter.innerText = displayText();
};

const calculateIncomes = () => {
    totalIncomes = incomes.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.value
    }, 0);
};

addIncome.addEventListener("click", (event) => {
    event.preventDefault();
    incomesAddElem();
    incomeValue.value = "";
    incomeTitle.value = "";
    incomesValue.innerText = totalIncomes;
});

const expensesAddElem = () => {
    const expenseEle = {
        title: expenseTitle.value,
        value: Number(expenseValue.value),
        id: (Math.random() * 100000).toFixed(0),
    };
    expenses.push(expenseEle);
    console.log(expenseEle);
    createExpenseListItem(expenseEle.title, expenseEle.value, expenseEle.id);
    calculateExpenses();
    totalAmount = totalIncomes - totalExpenses;
    textCenter.innerText = displayText();
};

const calculateExpenses = () => {
    totalExpenses = expenses.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.value
    }, 0);
};

addExpense.addEventListener("click", (event) => {
    event.preventDefault();
    expensesAddElem();
    expenseValue.value = "";
    expenseTitle.value = "";
    expensesValue.innerText = totalExpenses;
});

const createIncomeListItem = (incomeTitle, incomeValue, incomeId) => {
    const incomeListItem = document.createElement("div");
    incomeListItem.style.paddingBottom = "5px";
    incomeListItem.classList = "flex flex--space-between budget__list__item";
    incomeListItem.style.setProperty("display", "flex");
    incomeListItem.style.setProperty("align-items", "center");
    const incomeListValue = document.createElement("p");
    
    incomeListValue.innerText = `${incomeTitle}:`;
    incomeListItem.appendChild(incomeListValue);

    incomesList.appendChild(incomeListItem);
    console.log(totalIncomes);

    const formDiv = document.createElement("div");
    formDiv.style.setProperty("display", "flex");
    formDiv.style.setProperty("flex-direction", "row");
    formDiv.classList.add("formDiv");
    incomeListItem.appendChild(formDiv);  
    
    const formValue = document.createElement("form");
    formValue.classList.add("formValue");
    formValue.innerText = `${incomeValue}`;
    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.style.marginLeft = "10px";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);
    
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    incomeListItem.appendChild(btnDiv);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("budget__list__item__button--edit");
    btnEdit.innerText = "Edit";
    btnEdit.id = incomeId;
    btnEdit.style.marginRight = "10px";
    btnDiv.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("budget__list__item__button--delete");
    btnDelete.innerText = "Delete";
    btnDelete.id = incomeId;
    btnDiv.appendChild(btnDelete);
    console.log(incomes);

    btnDelete.addEventListener("click", (eventDelete) => {
        const indexToRemove = incomes.findIndex((item) => 
        item.id === eventDelete.target.id);
        incomes.splice(indexToRemove, 1);
        incomesList.removeChild(incomeListItem);
        calculateIncomes();
        totalAmount = totalIncomes - totalExpenses;
        textCenter.innerText = displayText();
        incomesValue.innerText = totalIncomes;
        console.log(incomes);
    });
         
    btnEdit.addEventListener("click", () => {
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.id = incomeId;
        saveBtn.style.marginLeft = "10px";
        formDiv.appendChild(saveBtn);
        formValue.contentEditable = true;
        formValue.style.setProperty("background-color", "white");
        formValue.style.setProperty("display", "flex");
        formValue.style.setProperty("align-items", "center");
        formValue.style.padding = "10px";
        formDiv.style.setProperty("display", "flex");
        formDiv.style.setProperty("align-items", "center");

        saveBtn.addEventListener("click", () => {
            formValue.contentEditable = false;
            saveBtn.hidden = true;
            cancelBtn.hidden = true;
            
            formValue.style.setProperty("background-color", "");
            const seatching_id = incomeId;
            const valueToChange = incomes.map((item) => {
                if(seatching_id === item.id) {
                    item.value = `${valueToChange.value}`;
                }
                return item;
            });
            console.log(valueToChange);
           
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        formDiv.appendChild(cancelBtn);
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
        formValue.innerText = `${incomeValue}`;
        formValue.style.setProperty("background-color", "");
        saveBtn.hidden = true;
        cancelBtn.hidden = true;
        });
        
    });


  
};

const createExpenseListItem = (expenseTitle, expenseValue, expenseId) => {
    const expenseListItem = document.createElement("div");
    expenseListItem.style.paddingBottom = "5px";
    expenseListItem.classList = "flex flex--space-between budget__list__item";
    expenseListItem.style.setProperty("display", "flex");
    expenseListItem.style.setProperty("align-items", "center");
    const expenseListValue = document.createElement("p");
    
    expenseListValue.innerText = `${expenseTitle}:`;
    expenseListItem.appendChild(expenseListValue);

    expensesList.appendChild(expenseListItem);
    console.log(totalExpenses);

    const formDiv = document.createElement("div");
    formDiv.style.setProperty("display", "flex");
    formDiv.style.setProperty("flex-direction", "row");
    formDiv.classList.add("formDiv");
    expenseListItem.appendChild(formDiv); 

    const formValue = document.createElement("form");
    formValue.classList.add("formValue");
    formValue.innerText = `${expenseValue}`;
    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.style.marginLeft = "10px";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    expenseListItem.appendChild(btnDiv);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("budget__list__item__button--edit");
    btnEdit.innerText = "Edit";
    btnEdit.id = expenseId;
    btnEdit.style.marginRight = "10px";
    btnDiv.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("budget__list__item__button--delete");
    btnDelete.innerText = "Delete";
    btnDelete.id = expenseId;
    btnDiv.appendChild(btnDelete);
    console.log(expenses);

    btnDelete.addEventListener("click", (eventDelete) => {
        const indexToRemove = expenses.findIndex((item) => 
        item.id ===eventDelete.target.id);
        expenses.splice(indexToRemove, 1);
        expensesList.removeChild(expenseListItem);
        calculateExpenses();
        totalAmount = totalIncomes - totalExpenses;
        textCenter.innerText = displayText();
        expensesValue.innerText = totalExpenses;
        console.log(expenses);        
    });
         
    btnEdit.addEventListener("click", () => {
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.id = expenseId;
        saveBtn.style.marginLeft = "10px";
        formDiv.appendChild(saveBtn);
        formValue.contentEditable = true;
        formValue.style.setProperty("background-color", "white");
        formValue.style.setProperty("display", "flex");
        formValue.style.setProperty("align-items", "center");
        formValue.style.padding = "10px";
        formDiv.style.setProperty("display", "flex");
        formDiv.style.setProperty("align-items", "center");

        saveBtn.addEventListener("click", () => {
            formValue.contentEditable = false;
            saveBtn.hidden = true;
            cancelBtn.hidden = true;
            
            formValue.style.setProperty("background-color", "");
            const seatching_id = expenseId;
            const valueToChange = expenses.map((item) => {
                if(seatching_id === item.id) {
                    item.value = `${valueToChange.value}`;
                }
                return item;
            });
            console.log(valueToChange);
           
        });

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        formDiv.appendChild(cancelBtn);
        cancelBtn.style.marginLeft = "10px";
        cancelBtn.addEventListener("click", () => {
        formValue.innerText = `${expenseValue}`;
        formValue.style.setProperty("background-color", "");
        saveBtn.hidden = true;
        cancelBtn.hidden = true;
        });
        
    });



};