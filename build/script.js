"use strict";
class BankApp {
    constructor() {
        this.users = [];
        this.moneyBalance = 10000;
        this.buttonDepo = document.getElementById('depobtn');
        this.buttonTakeMoney = document.getElementById('takemoney');
        this.balanceElement = document.getElementById('balance');
        this.clientElement = document.getElementById('client');
        this.userElement = document.getElementById('namaclient');
        this.depositElement = document.getElementById('deposit');
        this.amountBankElement = document.getElementById('getbank');
        this.bankElement = document.getElementById('bank');
        this.userClientElement = document.getElementById('userclient');
        this.initialize();
    }
    initialize() {
        var _a, _b;
        (_a = this.buttonDepo) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.runCode.bind(this));
        (_b = this.buttonTakeMoney) === null || _b === void 0 ? void 0 : _b.addEventListener("click", this.takeMoney.bind(this));
    }
    getData() {
        const data = document.querySelector("#data-parrent");
        const mapping = this.users
            .map((res) => {
            return `
            <ul id="datalist">
              <h1 id="userdatas" style="list-style: none;">USER DATA</h1>
              <br>
              <li><h1>Balance: <span id="balance">${this.moneyBalance}</span></h1></li>
              <li><h1>Client: <span id="client">${res.client}</span></h1></li>
              <li><h1>Bank: <span id="bank">${res.deposit}</span></h1></li>
            </ul>
          `;
        })
            .join("");
        if (data instanceof HTMLElement) {
            data.innerHTML = mapping;
        }
    }
    removeUser() {
        var _a;
        const userName = (_a = this.userElement) === null || _a === void 0 ? void 0 : _a.value;
        const userIndex = this.users.findIndex((user) => user.client === userName);
        if (userIndex !== -1) {
            const removedUser = this.users.splice(userIndex, 1)[0];
            alert(`${removedUser.client} has been removed`);
        }
        else {
            alert("User not found");
        }
        this.getData();
    }
    addBank() {
        var _a, _b, _c;
        const userName = (_a = this.userElement) === null || _a === void 0 ? void 0 : _a.value;
        const depositAmount = parseInt(((_b = this.depositElement) === null || _b === void 0 ? void 0 : _b.value) || "0");
        let bankValue = parseInt(((_c = this.bankElement) === null || _c === void 0 ? void 0 : _c.textContent) || "0");
        const existingUser = this.users.find((user) => user.client === userName);
        if (existingUser) {
            existingUser.deposit += depositAmount;
        }
        else {
            bankValue += depositAmount;
            this.users.push({
                client: userName,
                balance: this.moneyBalance,
                deposit: bankValue,
            });
        }
        this.moneyBalance -= depositAmount;
        if (this.clientElement) {
            this.clientElement.textContent = userName;
        }
        if (this.balanceElement) {
            this.balanceElement.textContent = this.moneyBalance.toString();
        }
        alert(`Added ${depositAmount} to the bank. Your bank balance is now ${bankValue}`);
        this.getData();
    }
    bank2() {
        var _a, _b, _c;
        const userName = (_a = this.userElement) === null || _a === void 0 ? void 0 : _a.value;
        const depositAmount = parseInt(((_b = this.depositElement) === null || _b === void 0 ? void 0 : _b.value) || "0");
        let bankValue = parseInt(((_c = this.bankElement) === null || _c === void 0 ? void 0 : _c.textContent) || "0");
        const existingUser = this.users.find((user) => user.client === userName);
        if (existingUser) {
            existingUser.deposit += depositAmount;
        }
        else {
            bankValue += depositAmount;
            this.users.push({
                client: userName,
                balance: this.moneyBalance,
                deposit: bankValue,
            });
        }
        this.moneyBalance -= depositAmount;
        if (this.clientElement) {
            this.clientElement.textContent = userName;
        }
        if (this.balanceElement) {
            this.balanceElement.textContent = this.moneyBalance.toString();
        }
        alert(`Added ${depositAmount} to the bank. Your bank balance is now ${bankValue}`);
        this.getData();
    }
    runCode() {
        var _a, _b;
        const userName = (_a = this.userElement) === null || _a === void 0 ? void 0 : _a.value;
        const depositAmount = parseInt(((_b = this.depositElement) === null || _b === void 0 ? void 0 : _b.value) || "0");
        const foundUser = this.users.find((user) => user.client === userName);
        if (userName && userName.length < 5) {
            alert("You need more than 5 characters");
        }
        else if (userName === "/addmoney") {
            const input = prompt("Input amount:");
            if (input !== null) {
                const amounts = parseInt(input);
                this.moneyBalance += amounts;
                if (this.balanceElement) {
                    this.balanceElement.textContent = this.moneyBalance.toString();
                }
            }
            else {
                alert("Invalid input");
            }
        }
        else {
            if (this.moneyBalance < 1000) {
                alert("You can't deposit. You need more than $1000");
            }
            else if (depositAmount > this.moneyBalance) {
                alert("You can't deposit more than your available balance");
            }
            else if (!depositAmount) {
                alert("You need to add an amount");
            }
            else {
                if (foundUser) {
                    // alert("User already exists");
                    this.bank2();
                }
                else {
                    this.addBank();
                }
            }
        }
    }
    takeMoney() {
        var _a, _b, _c, _d;
        let bankValue = parseInt(((_a = this.bankElement) === null || _a === void 0 ? void 0 : _a.textContent) || "0");
        const amount = parseInt(((_b = this.amountBankElement) === null || _b === void 0 ? void 0 : _b.value) || "0");
        const balance = parseInt(((_c = this.balanceElement) === null || _c === void 0 ? void 0 : _c.textContent) || "0");
        const foundUser = this.users.find((user) => { var _a; return user.client === (((_a = this.userClientElement) === null || _a === void 0 ? void 0 : _a.value) || ""); });
        if (((_d = this.userClientElement) === null || _d === void 0 ? void 0 : _d.value) && this.userClientElement.value.length < 5) {
            alert("You need more than 5 characters");
        }
        else if (!foundUser) {
            alert("User not found");
        }
        else if (bankValue === 0) {
            alert("You don't have any money in the bank!");
        }
        else if (amount > bankValue) {
            alert("You can't withdraw more than your available balance");
        }
        else if (!amount) {
            alert("You need to add an amount");
        }
        else {
            this.moneyBalance += amount;
            bankValue -= amount;
            if (this.balanceElement) {
                this.balanceElement.textContent = this.moneyBalance.toString();
            }
            if (this.bankElement) {
                this.bankElement.textContent = bankValue.toString();
            }
            alert(`Added ${amount} to your balance. Your bank balance is now ${bankValue}`);
            this.removeUser();
        }
    }
}
const bankApp = new BankApp();
if (bankApp.balanceElement) {
    bankApp.balanceElement.textContent = bankApp.moneyBalance.toString();
}
//# sourceMappingURL=script.js.map