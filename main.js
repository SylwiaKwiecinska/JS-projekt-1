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

let isIncomeTitleValueSet = false;
let isIncomeValueSet = false;

incomeTitle.addEventListener('input', function () {
    if (incomeTitle.value) {
        isIncomeTitleValueSet = true;
    } else {
        isIncomeTitleValueSet = false;
    }
    addIncome.disabled = !isIncomeTitleValueSet || !isIncomeValueSet ? true : false;
});

incomeValue.addEventListener('input', function () {
    if (incomeValue.value) {
        isIncomeValueSet = true;
    } else {
        isIncomeValueSet = false;
    }
    addIncome.disabled = !isIncomeTitleValueSet || !isIncomeValueSet ? true : false;
});


let isExpenseTitleValueSet = false;
let isExpenseValueSet = false;

expenseTitle.addEventListener('input', function () {
    if (expenseTitle.value) {
        isExpenseTitleValueSet = true;
    } else {
        isExpenseTitleValueSet = false;
    }
    addExpense.disabled = !isExpenseTitleValueSet || !isExpenseValueSet ? true : false;
});

expenseValue.addEventListener('input', function () {
    if (expenseValue.value) {
        isExpenseValueSet = true;
    } else {
        isExpenseValueSet = false;
    }
    addExpense.disabled = !isExpenseTitleValueSet || !isExpenseValueSet ? true : false;
}); 

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
    if (Number(incomeValue.value)<0) {
        alert('Minus values are not allowed');
    }else{
        incomes.push(incomeEle);
        createIncomeListItem(incomeEle.title, incomeEle.value, incomeEle.id);
        calculateIncomes();
    }
};    

const calculateIncomes = () => {
    totalIncomes = incomes.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.value
    }, 0);
    totalAmount = totalIncomes - totalExpenses;
    textCenter.innerText = displayText();
    incomesValue.innerText = totalIncomes;
   
};

addIncome.addEventListener("click", (event) => {
    event.preventDefault();
    incomesAddElem();
    incomeValue.value = "";
    incomeTitle.value = "";
    incomesValue.innerText = totalIncomes;

    isIncomeTitleValueSet = false;
    isIncomeValueSet = false;
    addIncome.disabled = !isIncomeTitleValueSet || !isIncomeValueSet ? true : false;
});

const expensesAddElem = () => {
    const expenseEle = {
        title: expenseTitle.value,
        value: Number(expenseValue.value),
        id: (Math.random() * 100000).toFixed(0),
    };
    if (Number(expenseValue.value)<0) {
        alert('Minus values are not allowed');
    }else{
        expenses.push(expenseEle);
        createExpenseListItem(expenseEle.title, expenseEle.value, expenseEle.id);
        calculateExpenses();
    }
};

const calculateExpenses = () => {
    totalExpenses = expenses.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.value
    }, 0);
    totalAmount = totalIncomes - totalExpenses;
    textCenter.innerText = displayText();
    expensesValue.innerText = totalExpenses;
};

addExpense.addEventListener("click", (event) => {
    event.preventDefault();
    expensesAddElem();
    expenseValue.value = "";
    expenseTitle.value = "";
    expensesValue.innerText = totalExpenses;

    isExpenseTitleValueSet = false;
    isExpenseValueSet = false;
    addExpense.disabled = !isExpenseTitleValueSet || !isExpenseValueSet ? true : false;
    
});

const createIncomeListItem = (incomeTitle, incomeValue, incomeId) => {

    const incomeListItem = document.createElement("div");
    incomeListItem.style.setProperty("width", "96%");
    incomeListItem.style.paddingBottom = "5px";
    incomeListItem.classList = "flex flex--space-between";
    incomeListItem.style.setProperty("align-items", "center");
    
    const incomeListValue = document.createElement("p");
    incomeListValue.innerText = `${incomeTitle}:`;
    incomeListItem.appendChild(incomeListValue);
    incomesList.appendChild(incomeListItem);

    const formDiv = document.createElement("div");
    formDiv.style.setProperty("display", "flex");
    formDiv.classList.add("formDiv");
    incomeListItem.appendChild(formDiv);  
    
    const formValue = document.createElement("div");
    formValue.classList.add("formValue");
    formValue.innerText = incomeValue;
    
    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.style.marginLeft = "10px";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);
    
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    incomeListItem.appendChild(btnDiv);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnEdit.innerText = "Edit";
    btnEdit.id = incomeId;
    btnEdit.style.marginRight = "10px";
    btnDiv.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    btnDelete.innerText = "Delete";
    btnDelete.id = incomeId;
    btnDiv.appendChild(btnDelete);

    btnDelete.addEventListener("click", (eventDelete) => {

        const indexToRemove = incomes.findIndex((item) => 
        item.id === eventDelete.target.id);
        incomes.splice(indexToRemove, 1);
        incomesList.removeChild(incomeListItem);
        calculateIncomes();
    });
         
    btnEdit.addEventListener("click", () => {

        btnEdit.hidden = true;
        btnDelete.hidden = true;
        incomeListValue.hidden = true;

        const inputIncomeTitle = document.createElement("input");
        inputIncomeTitle.style.setProperty("width", "50%");
        inputIncomeTitle.style.marginRight = "10px";
        inputIncomeTitle.value = incomes.filter(income => income.id === incomeId)[0].title;
        inputIncomeTitle.classList.add("inputIncomeTitle");
        inputIncomeTitle.type = "text";
        formDiv.appendChild(inputIncomeTitle);
        
        const inputValue = document.createElement("input");
        inputValue.style.setProperty("width", "50%");
        inputValue.value = incomes.filter(income => income.id === incomeId)[0].value;
        inputValue.classList.add("inputValue");
        inputValue.type = "number";
        formDiv.appendChild(inputValue);
        
        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.id = incomeId;
        saveBtn.style.marginLeft = "10px";
        formDiv.appendChild(saveBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.id = incomeId;
        cancelBtn.style.marginLeft = "10px";
        formDiv.appendChild(cancelBtn);
        
        PLN.hidden = true;
        formValue.hidden = true;      
        
        saveBtn.addEventListener("click", () => {
        
            if (Number(inputValue.value)<0) {
                alert('Minus values are not allowed');
            }else{
                saveBtn.hidden = true;
                cancelBtn.hidden = true;
            
                const saveIncomeInputValue = incomeId;
                    incomes.map((item) => {
                    if(saveIncomeInputValue === item.id) {
                        item.value = Number(inputValue.value);
                        item.title = inputIncomeTitle.value;
                    }
                    return item;
                });

            calculateIncomes();
            
            btnEdit.hidden = false;
            btnDelete.hidden = false;
            incomeListValue.hidden = false;
            PLN.hidden = false;
            inputValue.hidden = true;
            inputIncomeTitle.hidden = true;
            formValue.hidden = false; 
            formValue.innerText = inputValue.value;
            incomeListValue.innerText = inputIncomeTitle.value;
            }       
        });

        cancelBtn.addEventListener("click", () => {
            inputValue.hidden = true;
            saveBtn.hidden = true;
            cancelBtn.hidden = true;
            formValue.hidden = false; 
            PLN.hidden = false;
            btnEdit.hidden = false;
            btnDelete.hidden = false; 
            inputIncomeTitle.hidden = true;
            incomeListValue.hidden = false;

        });
    });
};

const createExpenseListItem = (expenseTitle, expenseValue, expenseId) => {

    const expenseListItem = document.createElement("div");
    expenseListItem.style.setProperty("width", "96%");
    expenseListItem.style.paddingBottom = "5px";
    expenseListItem.classList = "flex flex--space-between";
    expenseListItem.style.setProperty("align-items", "center");

    const expenseListValue = document.createElement("p");
    expenseListValue.innerText = `${expenseTitle}:`;
    expenseListItem.appendChild(expenseListValue);
    expensesList.appendChild(expenseListItem);

    const formDiv = document.createElement("div");
    formDiv.style.setProperty("display", "flex");
    formDiv.classList.add("formDiv");
    expenseListItem.appendChild(formDiv); 

    const formValue = document.createElement("div");
    formValue.classList.add("formValue");
    formValue.innerText = expenseValue;

    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.style.marginLeft = "10px";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    expenseListItem.appendChild(btnDiv);

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    btnEdit.innerText = "Edit";
    btnEdit.id = expenseId;
    btnEdit.style.marginRight = "10px";
    btnDiv.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDelete");
    btnDelete.innerText = "Delete";
    btnDelete.id = expenseId;
    btnDiv.appendChild(btnDelete);

    btnDelete.addEventListener("click", (eventDelete) => {

        const indexToRemove = expenses.findIndex((item) => 
        item.id ===eventDelete.target.id);
        expenses.splice(indexToRemove, 1);
        expensesList.removeChild(expenseListItem);
        calculateExpenses();
               
    });
         
    btnEdit.addEventListener("click", () => {

        btnEdit.hidden = true;
        btnDelete.hidden = true;
        expenseListValue.hidden = true;

        const inputExpenseTitle = document.createElement("input");
        inputExpenseTitle.style.setProperty("width", "50%");
        inputExpenseTitle.style.marginRight = "10px";
        inputExpenseTitle.value = expenses.filter(expense => expense.id === expenseId)[0].title;
        formDiv.appendChild(inputExpenseTitle);
       
        const inputValue = document.createElement("input");
        inputValue.style.setProperty("width", "50%");
        inputValue.value = expenses.filter(expense => expense.id === expenseId)[0].value;
        inputValue.classList.add("inputValue");
        inputValue.style.setProperty("type", "number");
        formDiv.appendChild(inputValue);

        const saveBtn = document.createElement("button");
        saveBtn.innerText = "Save";
        saveBtn.id = expenseId;
        saveBtn.style.marginLeft = "10px";
        formDiv.appendChild(saveBtn);

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "Cancel";
        cancelBtn.id = expenseId;
        cancelBtn.style.marginLeft = "10px";
        formDiv.appendChild(cancelBtn);

        PLN.hidden = true;
        formValue.hidden = true;  

        saveBtn.addEventListener("click", () => {

            if (Number(inputValue.value)<0) {
                alert('Minus values are not allowed');
            }else{
                saveBtn.hidden = true;
                cancelBtn.hidden = true;
            
                const saveExpenseInputValue = expenseId;
                    expenses.map((item) => {
                    if(saveExpenseInputValue === item.id) {
                        item.value = Number(inputValue.value);
                        item.title = inputExpenseTitle.value;
                }
                return item;
            });
    
            calculateExpenses();

            
            btnEdit.hidden = false;
            btnDelete.hidden = false;
            expenseListValue.hidden = false;
            PLN.hidden = false;
            inputValue.hidden = true;
            inputExpenseTitle.hidden = true;
            formValue.hidden = false; 
            formValue.innerText = inputValue.value;
            expenseListValue.innerText = inputExpenseTitle.value;
            }
        });
        
        cancelBtn.addEventListener("click", () => {
            inputValue.hidden = true;
            saveBtn.hidden = true;
            cancelBtn.hidden = true;
            formValue.hidden = false; 
            PLN.hidden = false;
            btnEdit.hidden = false;
            btnDelete.hidden = false; 
            inputExpenseTitle.hidden = true;
            expenseListValue.hidden = false;      
        });      
    });
};