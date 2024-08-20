class Calculator {
    constructor() {
      this.result = 0;
    }
  
    add(number) {
      this.result += number;
    }
  
    subtract(number) {
      this.result -= number;
    }
  
    multiply(number) {
      this.result *= number;
    }
  
    divide(number) {
      if (number === 0) {
        throw new Error('Cannot divide by zero');
      }
      this.result /= number;
    }
  
    clear() {
      this.result = 0;
    }
  
    getResult() {
      return this.result;
    }
  
    calculate(expression) {
      const sanitizedExpression = this._sanitizeExpression(expression);
      if (!this._isValidExpression(sanitizedExpression)) {
        throw new Error('Invalid characters in the expression');
      }
  
      try {
        this.result = this._evaluateExpression(sanitizedExpression);
      } catch (e) {
        throw new Error(`Error in evaluation: ${e.message}`);
      }
      return this.result;
    }
  
    _sanitizeExpression(expression) {
      return expression.replace(/\s+/g, '');
    }
  
    _isValidExpression(expression) {
      // Check if the expression contains only valid characters
      return /^[0-9+\-*/().]*$/.test(expression);
    }
  
    _evaluateExpression(expression) {
      // Convert infix expression to postfix (Reverse Polish Notation)
      const tokens = this._tokenize(expression);
      const rpn = this._infixToPostfix(tokens);
      // Evaluate the postfix expression
      return this._evaluateRPN(rpn);
    }
  
    _tokenize(expression) {
      return expression.match(/\d+|[-+*/()]/g);
    }
  
    _infixToPostfix(tokens) {
      const precedence = {'+': 1, '-': 1, '*': 2, '/': 2};
      const output = [];
      const operators = [];
  
      tokens.forEach(token => {
        if (/\d/.test(token)) {
          output.push(Number(token));
        } else if (['+', '-', '*', '/'].includes(token)) {
          while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
            output.push(operators.pop());
          }
          operators.push(token);
        } else if (token === '(') {
          operators.push(token);
        } else if (token === ')') {
          while (operators.length && operators[operators.length - 1] !== '(') {
            output.push(operators.pop());
          }
          operators.pop(); // Remove the '(' from the stack
        }
      });
  
      while (operators.length) {
        output.push(operators.pop());
      }
  
      return output;
    }
  
    _evaluateRPN(rpn) {
      const stack = [];
  
      rpn.forEach(token => {
        if (typeof token === 'number') {
          stack.push(token);
        } else {
          const b = stack.pop();
          const a = stack.pop();
          switch (token) {
            case '+':
              stack.push(a + b);
              break;
            case '-':
              stack.push(a - b);
              break;
            case '*':
              stack.push(a * b);
              break;
            case '/':
              stack.push(a / b);
              break;
          }
        }
      });
  
      return stack[0];
    }
  }
  
  const calc = new Calculator();
  calc.add(10);
  calc.multiply(2);
  console.log(calc.getResult()); /
  calc.clear();
  calc.calculate('10 + 2 * ( 6 - ( 4 + 1 ) / 2 ) + 7');
  console.log(calc.getResult()); // Should print 20
  