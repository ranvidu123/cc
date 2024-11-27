import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CreditCard, CheckCircle, XCircle } from 'lucide-react'

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setIsValid(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/validate', { cardNumber });
      setIsValid(response.data.isValid);
    } catch (error) {
      console.error('Validation error:', error);
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Credit Card Validator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={cardNumber}
                onChange={handleChange}
                placeholder="Enter credit card number"
                className="pl-10 pr-10"
                maxLength={19}
              />
              {isValid !== null && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValid ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <XCircle className="text-red-500" />
                  )}
                </div>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Validating...' : 'Validate'}
            </Button>
          </form>
          {isValid !== null && (
            <p className={`mt-4 text-center ${isValid ? 'text-green-500' : 'text-red-500'}`}>
              {isValid ? 'Valid credit card number' : 'Invalid credit card number'}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

