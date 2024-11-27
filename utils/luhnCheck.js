export function luhnCheck(cardNumber) {
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

