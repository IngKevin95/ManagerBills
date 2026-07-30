// Model
class TransactionManager {
    constructor() {
        this.transactions = JSON.parse(localStorage.getItem('managerbills_tx')) || [];
    }

    addTransaction(tx) {
        tx.id = Date.now().toString();
        this.transactions.push(tx);
        this.save();
        return tx;
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.save();
    }

    getTransactionsByMonth(year, month) {
        return this.transactions.filter(t => {
            const date = new Date(t.date);
            // Handling timezone issues by extracting year and month from string directly
            const [y, m] = t.date.split('-'); 
            return parseInt(y) === year && parseInt(m) === month;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    save() {
        localStorage.setItem('managerbills_tx', JSON.stringify(this.transactions));
    }
}

// Global State
const app = new TransactionManager();
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth() + 1; // 1-12

// Predefined Categories
const categories = {
    income: ['Salario', 'Freelance', 'Inversiones', 'Regalos', 'Otros'],
    expense: ['Comida', 'Transporte', 'Vivienda', 'Entretenimiento', 'Salud', 'Educación', 'Ropa', 'Otros']
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 2
    }).format(amount);
};

// Format Date
const formatMonthYear = (year, month) => {
    const date = new Date(year, month - 1);
    return new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date);
};

// DOM Elements
const el = {
    monthDisplay: document.getElementById('currentMonthDisplay'),
    prevMonthBtn: document.getElementById('prevMonth'),
    nextMonthBtn: document.getElementById('nextMonth'),
    totalBalance: document.getElementById('totalBalance'),
    totalIncome: document.getElementById('totalIncome'),
    totalExpense: document.getElementById('totalExpense'),
    txList: document.getElementById('transactionsList'),
    fabAdd: document.getElementById('fabAdd'),
    modal: document.getElementById('transactionModal'),
    closeModal: document.getElementById('closeModal'),
    form: document.getElementById('transactionForm'),
    typeRadios: document.querySelectorAll('input[name="type"]'),
    categorySelect: document.getElementById('category'),
    dateInput: document.getElementById('date')
};

// Initialize
function init() {
    updateMonthDisplay();
    populateCategories();
    renderDashboard();
    setupEventListeners();
    
    // Set default date in form
    el.dateInput.valueAsDate = new Date();
}

function setupEventListeners() {
    el.prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    el.nextMonthBtn.addEventListener('click', () => changeMonth(1));
    
    el.fabAdd.addEventListener('click', openModal);
    el.closeModal.addEventListener('click', closeModal);
    
    // Close modal on outside click
    el.modal.addEventListener('click', (e) => {
        if (e.target === el.modal) closeModal();
    });

    // Handle form submit
    el.form.addEventListener('submit', handleFormSubmit);

    // Update categories when type changes
    el.typeRadios.forEach(radio => {
        radio.addEventListener('change', populateCategories);
    });
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
    } else if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
    }
    updateMonthDisplay();
    renderDashboard();
}

function updateMonthDisplay() {
    let str = formatMonthYear(currentYear, currentMonth);
    el.monthDisplay.textContent = str.charAt(0).toUpperCase() + str.slice(1);
}

function populateCategories() {
    const type = document.querySelector('input[name="type"]:checked').value;
    const options = categories[type];
    
    el.categorySelect.innerHTML = options.map(cat => 
        `<option value="${cat}">${cat}</option>`
    ).join('');
}

function openModal() {
    el.modal.classList.add('active');
}

function closeModal() {
    el.modal.classList.remove('active');
    el.form.reset();
    el.dateInput.valueAsDate = new Date();
    document.querySelector('input[value="income"]').checked = true;
    populateCategories();
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const type = document.querySelector('input[name="type"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    app.addTransaction({ type, amount, date, category, description });
    
    closeModal();
    
    // Switch to the month of the new transaction if needed
    const [y, m] = date.split('-');
    if (parseInt(y) !== currentYear || parseInt(m) !== currentMonth) {
        currentYear = parseInt(y);
        currentMonth = parseInt(m);
        updateMonthDisplay();
    }
    
    renderDashboard();
}

function renderDashboard() {
    const txs = app.getTransactionsByMonth(currentYear, currentMonth);
    
    // Calculate totals
    let income = 0;
    let expense = 0;
    
    txs.forEach(t => {
        if (t.type === 'income') income += t.amount;
        else expense += t.amount;
    });
    
    const balance = income - expense;
    
    // Update DOM
    el.totalIncome.textContent = formatCurrency(income);
    el.totalExpense.textContent = formatCurrency(expense);
    el.totalBalance.textContent = formatCurrency(balance);
    
    // Render list
    if (txs.length === 0) {
        el.txList.innerHTML = '<div class="empty-state">No hay transacciones este mes.</div>';
    } else {
        el.txList.innerHTML = txs.map(t => {
            const isIncome = t.type === 'income';
            return `
                <div class="transaction-item ${isIncome ? 'income' : 'expense'}">
                    <div class="tx-info">
                        <span class="tx-desc">${t.description}</span>
                        <div class="tx-meta">
                            <span>${t.date}</span>
                            <span class="tx-category">${t.category}</span>
                        </div>
                    </div>
                    <div class="tx-amount-group">
                        <span class="tx-amount">${isIncome ? '+' : '-'}${formatCurrency(t.amount)}</span>
                        <button class="delete-btn" onclick="deleteTx('${t.id}')">&times;</button>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Global function for inline onclick
window.deleteTx = function(id) {
    if (confirm('¿Eliminar esta transacción?')) {
        app.deleteTransaction(id);
        renderDashboard();
    }
}

// Boot
document.addEventListener('DOMContentLoaded', init);
