class BankApp {
    constructor() {
      this.users = [
        {
          client: "coba",
          deposit: 100
        }
      ]
      this.moneyBalance = 10000
      this.buttonDepo = document.getElementById("depobtn")
      this.buttonTakeMoney = document.getElementById("takemoney")
      this.balanceElement = document.getElementById("balance")
      this.clientElement = document.getElementById("client")
      this.userElement = document.getElementById("namaclient")
      this.depositElement = document.getElementById("deposit")
      this.amountBankElement = document.getElementById("getbank")
      this.bankElement = document.getElementById("bank")
      this.userClientElement = document.getElementById("userclient")
  
      this.initialize()
    }
  
    initialize() {
      this.buttonDepo.addEventListener("click", this.run.bind(this))
      this.buttonTakeMoney.addEventListener("click", this.takeMoney.bind(this))
    }
  
    addBank() {
      const userName = this.userElement.value
      const depositAmount = parseInt(this.depositElement.value)
      let bankValue = parseInt(this.bankElement.textContent)
  
      bankValue += depositAmount
      this.moneyBalance -= depositAmount
      this.clientElement.textContent = userName
      this.balanceElement.textContent = this.moneyBalance.toString()
      this.bankElement.textContent = bankValue.toString()
      alert(
        `Added ${depositAmount} to the bank. Your bank balance is now ${bankValue}`
      )
      this.users.push({
        client: userName,
        deposit: bankValue
      })
    }
  
    run() {
      const userName = this.userElement.value
      const depositAmount = parseInt(this.depositElement.value)
      let bankValue = parseInt(this.bankElement.textContent)
      const foundUser = this.users.find(user => user.client === userName)
  
      if (userName.length < 5) {
        alert("You need more than 5 characters")
      } else if (userName === "/addmoney") {
        const input = prompt("Input amount:")
        if (input !== null) {
          const amounts = parseInt(input)
          this.moneyBalance += amounts
          this.balanceElement.textContent = this.moneyBalance.toString()
        } else {
          alert("Invalid input")
        }
      } else {
        if (this.moneyBalance === 0) {
          alert("You can't deposit. You need more than $1000")
        } else if (depositAmount > this.moneyBalance) {
          alert("You can't deposit more than your available balance")
        } else if (!depositAmount) {
          alert("You need to add an amount")
        } else {
          if (foundUser) {
            this.addBank()
          }
        }
      }
    }
  
    takeMoney() {
      let bankValue = parseInt(this.bankElement.textContent)
      const amount = parseInt(this.amountBankElement.value)
      const balance = parseInt(this.balanceElement.textContent)
      const foundUser = this.users.find(
        user => user.client === this.userClientElement.value
      )
  
      if (this.userClientElement.value.length < 5) {
        alert("You need more than 5 characters")
      } else if (!foundUser) {
        alert("User not found")
      } else if (bankValue === 0) {
        alert("You don't have any money in the bank!")
      } else if (amount > bankValue) {
        alert("You can't withdraw more than your available balance")
      } else if (!amount) {
        alert("You need to add an amount")
      } else {
        this.moneyBalance += amount
        bankValue -= amount
        this.balanceElement.textContent = this.moneyBalance.toString()
        this.bankElement.textContent = bankValue.toString()
        alert(
          `Added ${amount} to your balance. Your bank balance is now ${bankValue}`
        )
      }
    }
  }
  
  const bankApp = new BankApp()
  