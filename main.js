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
    isIncomeTitleValueSet = !!incomeTitle.value;
    addIncome.disabled = !isIncomeTitleValueSet || !isIncomeValueSet;
});

incomeValue.addEventListener('input', function () {
    isIncomeValueSet = !!incomeValue.value;
    addIncome.disabled = !isIncomeTitleValueSet || !isIncomeValueSet;
});


let isExpenseTitleValueSet = false;
let isExpenseValueSet = false;

expenseTitle.addEventListener('input', function () {
    isExpenseTitleValueSet = !!expenseTitle.value;
    addExpense.disabled = !isExpenseTitleValueSet || !isExpenseValueSet;
});

expenseValue.addEventListener('input', function () {
    isExpenseValueSet =!! expenseValue.value;
    addExpense.disabled = !isExpenseTitleValueSet || !isExpenseValueSet;
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

const createSaveButton = (id) => {
    const saveBtn = document.createElement("button");
    saveBtn.innerText = "Save";
    saveBtn.id = id;
    saveBtn.classList = "cancellable";
    return saveBtn;
};

const createEditButton = (id) => {
    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.id = id;
    btnEdit.classList = "cancellable";
    return btnEdit;
};

const createDeleteButton = (id) => {
    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.id = id;
    btnDelete.classList = "cancellable";
    return btnDelete;
};

const CreateCancelButton = (id) => {
    const cancelBtn = document.createElement("button");
    cancelBtn.innerText = "Cancel";
    cancelBtn.id = id;
    cancelBtn.classList = "cancellable";
    return cancelBtn;
};

const hideButtons = (element) => {
    element.querySelectorAll('.cancellable').forEach(child => {
        child.hidden = !child.hidden;} );
};

const createIncomeListItem = (incomeTitle, incomeValue, incomeId) => {

    const incomeListItem = document.createElement("div");  
    incomeListItem.classList = "flex flex--space-between listItem";
       
    const incomeListValue = document.createElement("p");
    incomeListValue.innerText = `${incomeTitle}:`;
    incomeListItem.appendChild(incomeListValue);
    incomesList.appendChild(incomeListItem);

    const formDiv = document.createElement("div");
    formDiv.classList = "formDiv";
    incomeListItem.appendChild(formDiv);  
    
    const formValue = document.createElement("div");
    formValue.classList ="formValue cancellable";
    formValue.innerText = incomeValue;
    
    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.classList = "cancellable";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);
    
    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    incomeListItem.appendChild(btnDiv);

    const btnEdit = createEditButton(incomeId);
    btnDiv.appendChild(btnEdit);

    const btnDelete = createDeleteButton(incomeId);
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
        inputIncomeTitle.value = incomes.filter(income => income.id === incomeId)[0].title;
        inputIncomeTitle.classList = "inputTitle";
        inputIncomeTitle.type = "text";
        formDiv.appendChild(inputIncomeTitle);
        
        const inputValue = document.createElement("input");
        inputValue.value = incomes.filter(income => income.id === incomeId)[0].value;
        inputValue.classList = "inputValue cancellable";
        inputValue.type = "number";
        formDiv.appendChild(inputValue);
        
        const saveBtn = createSaveButton(incomeId);
        formDiv.appendChild(saveBtn);

        const cancelBtn = CreateCancelButton(incomeId);
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
            PLN.hidden = false;
            inputValue.hidden = true;
            formValue.hidden = false; 
            
            inputIncomeTitle.hidden = true;
            incomeListValue.hidden = false;
            formValue.innerText = inputValue.value;
            incomeListValue.innerText = inputIncomeTitle.value;
            }       
        });

        cancelBtn.addEventListener("click", () => {
            hideButtons(incomeListItem);
            inputIncomeTitle.hidden = true;
            incomeListValue.hidden = false;

        });
    });
};

const createExpenseListItem = (expenseTitle, expenseValue, expenseId) => {

    const expenseListItem = document.createElement("div");
    expenseListItem.classList = "flex flex--space-between listItem";
    
    const expenseListValue = document.createElement("p");
    expenseListValue.innerText = `${expenseTitle}:`;
    expenseListItem.appendChild(expenseListValue);
    expensesList.appendChild(expenseListItem);

    const formDiv = document.createElement("div");
    formDiv.classList = "formDiv";
    expenseListItem.appendChild(formDiv); 

    const formValue = document.createElement("div");
    formValue.classList ="formValue cancellable";
    formValue.innerText = expenseValue;

    const PLN = document.createElement("span");
    PLN.innerText = "PLN";
    PLN.classList = "cancellable";
    formDiv.appendChild(formValue);
    formDiv.appendChild(PLN);

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    expenseListItem.appendChild(btnDiv);

    const btnEdit = createEditButton(expenseId);
    btnDiv.appendChild(btnEdit);

    const btnDelete = createDeleteButton(expenseId);
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
        inputExpenseTitle.value = expenses.filter(expense => expense.id === expenseId)[0].title;
        inputExpenseTitle.classList = "inputTitle";
        inputExpenseTitle.type = "text";
        formDiv.appendChild(inputExpenseTitle);
       
        const inputValue = document.createElement("input");
        inputValue.value = expenses.filter(expense => expense.id === expenseId)[0].value;
        inputValue.classList = "inputValue cancellable";
        inputValue.type = "number";
        formDiv.appendChild(inputValue);

        const saveBtn = createSaveButton(expenseId);
        formDiv.appendChild(saveBtn);

        const cancelBtn = CreateCancelButton(expenseId);
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
            PLN.hidden = false;
            inputValue.hidden = true;
            formValue.hidden = false;

            inputExpenseTitle.hidden = true; 
            expenseListValue.hidden = false;
            formValue.innerText = inputValue.value;
            expenseListValue.innerText = inputExpenseTitle.value;
            }
        });
        
        cancelBtn.addEventListener("click", () => {
            hideButtons(expenseListItem);
            inputExpenseTitle.hidden = true;
            expenseListValue.hidden = false;      
        });      
    });
};

