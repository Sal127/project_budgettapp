let raschet = document.getElementById('start'),
    budgetValue = document.querySelector('.budget-value'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    expensesValue = document.querySelector('.expenses-value'), //Внесение обязательных расходов
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    incomeValue = document.querySelector('.income-value'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value'),
    expenItem = document.querySelectorAll('.expenses-item'), // Перечень обязательных расходов
    expensesBtn = document.getElementsByTagName('button')[0], //Кнопка Утвердить1 для обязательных расходов
    optionalExpensesBtn = document.getElementsByTagName('button')[1], //Кнопка Утвердить2
    countBtn = document.getElementsByTagName('button')[2], //Кнопка рассчитать
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),//Перечень необязательных расходов
    incomeItem = document.querySelector('.choose-income'), //статьи возможного дохода
    checkSavings = document.querySelector('#savings'), //чекбокс
    sumValue = document.querySelector('.choose-sum'), //сумма
    percentValue = document.querySelector('.choose-percent'), //процент
    yearValue = document.querySelector('.year-value'), //год
    monthValue = document.querySelector('.month-value'), //месяц
    dayValue = document.querySelector('.day-value'); //день
    
let money, time;    

raschet.addEventListener('click', function() {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budjet = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(); // Помещаем в правую часть в "Доход:", сумму округляем до целого toFixed
    yearValue.value = new Date(Date.parse(time)).getFullYear(); //если есть input то работаем с value
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;  //При вводе значения в input лучше всего использовать value а не textContent, месяц начинается с нуля поэтому прибавляем 1
    dayValue.value = new Date(Date.parse(time)).getDate(); 
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;
    console.log(expenItem);
    for (let i=0; i < expenItem.length; i++) {
        let a = expenItem[i].value,
            b = expenItem[++i].value;
            
        if ((typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
            console.log("done");   
            appData.expenses[a] = b;
            sum += +b;
         } else {
            i = i-1;
         }  
    } 
    expensesValue.textContent = sum;
}); 

optionalExpensesBtn.addEventListener('click', function () {
    for(let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

countBtn.addEventListener('click', function() {
    
    if (appData.budjet != undefined) {
        appData.moneyPerDay = (appData.budjet / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;
        if (appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
         } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
         } else {
             console.log("Произошла ошибка");
         };
    } else {
        levelValue.textContent = "Произошла ошибка";
    }
});

incomeItem.addEventListener('change', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true; 
    }
});

sumValue.addEventListener ('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
            
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;    

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener ('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
            
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;    

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budjet: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    icome: [],
    savings: false,
        
};


