const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

function luhnCheck(cardNumber) {
  if (typeof cardNumber !== 'string' || cardNumber.length === 0) {
    console.error('Invalid input: cardNumber must be a non-empty string');
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isNaN(digit)) {
      console.error('Invalid character in card number:', cardNumber.charAt(i));
      return false;
    }

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return (sum % 10) === 0;
}

app.post('/validate', (req, res) => {
  const { cardNumber } = req.body;
  const stripped = cardNumber.replace(/\s/g, '');
  const isValid = luhnCheck(stripped);
  res.json({ isValid });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

