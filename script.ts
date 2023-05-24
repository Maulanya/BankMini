class BankApp {
    public users: any[];
    public moneyBalance: number;
    public buttonDepo: HTMLElement | null;
    public buttonTakeMoney: HTMLElement | null;
    public balanceElement: HTMLElement | null;
    private clientElement: HTMLElement;
    private userElement: HTMLInputElement;
    private depositElement: HTMLInputElement;
    private amountBankElement: HTMLInputElement;
    private bankElement: HTMLElement;
    private userClientElement: HTMLInputElement;
  
    constructor() {
      this.users = [];
      this.moneyBalance = 10000;
    this.buttonDepo = document.getElementById('depobtn') as HTMLElement;
    this.buttonTakeMoney = document.getElementById('takemoney') as HTMLElement;
    this.balanceElement = document.getElementById('balance') as HTMLElement;
    this.clientElement = document.getElementById('client') as HTMLElement;
    this.userElement = document.getElementById('namaclient') as HTMLInputElement;
    this.depositElement = document.getElementById('deposit') as HTMLInputElement;
    this.amountBankElement = document.getElementById('getbank') as HTMLInputElement;
    this.bankElement = document.getElementById('bank') as HTMLElement;
    this.userClientElement = document.getElementById('userclient') as HTMLInputElement;
  
      this.initialize();
    }
  
    initialize() {
      this.buttonDepo?.addEventListener("click", this.runCode.bind(this));
      this.buttonTakeMoney?.addEventListener("click", this.takeMoney.bind(this));
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
      const userName = this.userElement?.value;
      const userIndex = this.users.findIndex((user) => user.client === userName);
  
      if (userIndex !== -1) {
        const removedUser = this.users.splice(userIndex, 1)[0];
        alert(`${removedUser.client} has been removed`);
      } else {
        alert("User not found");
      }
      this.getData();
    }
  
    addBank() {
      const userName = this.userElement?.value;
      const depositAmount = parseInt(this.depositElement?.value || "0");
      let bankValue = parseInt(this.bankElement?.textContent || "0");
  
      const existingUser = this.users.find((user) => user.client === userName);
      if (existingUser) {
        existingUser.deposit += depositAmount;
      } else {
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
      const userName = this.userElement?.value;
      const depositAmount = parseInt(this.depositElement?.value || "0");
      let bankValue = parseInt(this.bankElement?.textContent || "0");
  
      const existingUser = this.users.find((user) => user.client === userName);
      if (existingUser) {
        existingUser.deposit += depositAmount;
      } else {
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
      const userName = this.userElement?.value;
      const depositAmount = parseInt(this.depositElement?.value || "0");
      const foundUser = this.users.find((user) => user.client === userName);
  
      if (userName && userName.length < 5) {
        alert("You need more than 5 characters");
      } else if (userName === "/addmoney") {
        const input = prompt("Input amount:");
        if (input !== null) {
          const amounts = parseInt(input);
          this.moneyBalance += amounts;
          if (this.balanceElement) {
            this.balanceElement.textContent = this.moneyBalance.toString();
          }
        } else {
          alert("Invalid input");
        }
      } else {
        if (this.moneyBalance < 1000) {
          alert("You can't deposit. You need more than $1000");
        } else if (depositAmount > this.moneyBalance) {
          alert("You can't deposit more than your available balance");
        } else if (!depositAmount) {
          alert("You need to add an amount");
        } else {
          if (foundUser) {
            // alert("User already exists");
            this.bank2();
          } else {
            this.addBank();
          }
        }
      }
    }
  
    takeMoney() {
      let bankValue = parseInt(this.bankElement?.textContent || "0");
      const amount = parseInt(this.amountBankElement?.value || "0");
      const balance = parseInt(this.balanceElement?.textContent || "0");
      const foundUser = this.users.find((user) => user.client === (this.userClientElement?.value || ""));
  
      if (this.userClientElement?.value && this.userClientElement.value.length < 5) {
        alert("You need more than 5 characters");
      } else if (!foundUser) {
        alert("User not found");
      } else if (bankValue === 0) {
        alert("You don't have any money in the bank!");
      } else if (amount > bankValue) {
        alert("You can't withdraw more than your available balance");
      } else if (!amount) {
        alert("You need to add an amount");
      } else {
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
  