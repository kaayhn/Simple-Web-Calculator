

    let lastType = undefined
    let currentNum = ""
    let storedNum = undefined
    let currentType = undefined
    let currentOperator = undefined

    const main = document.querySelector("#calc")
    const screen = document.querySelector("#screen")
    screen.textContent = 0
    const numbers = [1,2,3,4,5,6,7,8,9,0]
    const ops = ["+", "-", "×", "÷"]


    function add(one, two) {
      return one + two
    }
    function mult(one, two) {
      return one * two
    }
    function div(one, two) {
      return one / two
    }
    function sub(one, two) {
      return one - two
    }
    
    //switch to appropriate operation function
    function operation(op, one, two) {
      switch (op) {
        case "+":
          return add(one, two)

        case "-":
          return sub(one, two)
          
        
        case "×":
          return mult(one, two)
          
        
        case "÷":
          return div(one, two)
      }
    }



    //main logic
    main.addEventListener("click", (e) => {

      const value = e.target.textContent

      // determine type of button just pressed
      if (numbers.includes(Number(value))) {currentType = "number"}
      else if (ops.includes(value)) { currentType = "operator" }
      else if (value === "=") { currentType = "equals" }
      else if (value === "AC") { currentType = "AC" }
      else if (value === "DEL") { 
        if(currentNum.length == 1) {
          currentNum = ""
          screen.textContent = "0"
          return
        }
        currentNum = currentNum.slice(0, -1)
        screen.textContent = currentNum
        return
       }
      else { return }


      if (currentType == "number") {
        if (lastType == "number") {
          currentNum += value
        }
        else {
          currentNum = value
        }
        screen.textContent = currentNum
      }



      else if (currentType == "operator") {
        if (lastType == "operator") { 
            currentOperator = value 
            lastType = currentType
            return
        }
        if (currentNum == "") { return }

        if (storedNum != undefined) {
          storedNum = operation(currentOperator, storedNum, Number(currentNum))
        } else {
          storedNum = Number(currentNum)
        }
        screen.textContent = storedNum 
        currentOperator = value
        currentNum = ""
      }


  
      else if (currentType == "equals") {
        if (storedNum == undefined || currentOperator == undefined || currentNum == "")  { return }

        const result = operation(currentOperator, storedNum, Number(currentNum))

        screen.textContent = result
        currentNum = String(result)
        storedNum = undefined
        currentOperator = undefined
      }



      else if (currentType === "AC") {
        currentNum = ""
        storedNum = undefined
        currentOperator = undefined
        screen.textContent = 0
      }



      lastType = currentType
    })
