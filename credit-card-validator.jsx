'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { luhnCheck } from './utils/luhnCheck'
import { CreditCard, CheckCircle, XCircle } from 'lucide-react'

export default function CreditCardValidator() {
  const [cardNumber, setCardNumber] = useState('')
  const [isValid, setIsValid] = useState(null)

  useEffect(() => {
    console.log('Card number:', cardNumber);
    console.log('Is valid:', isValid);
  }, [cardNumber, isValid]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return value
    }
  }

  const handleChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setCardNumber(formatted)
    setIsValid(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Submitting:', cardNumber);
    const stripped = cardNumber.replace(/\s/g, '')
    try {
      const result = luhnCheck(stripped)
      setIsValid(result)
      console.log('Validation result:', result);
    } catch (error) {
      console.error('Validation error:', error);
      setIsValid(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
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
          <Button type="submit" className="w-full">Validate</Button>
        </form>
        {isValid !== null && (
          <p className={`mt-4 text-center ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Valid credit card number' : 'Invalid credit card number'}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

