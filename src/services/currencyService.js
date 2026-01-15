const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

let cachedRates = null;
let lastFetch = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Fetch exchange rates
export const getExchangeRates = async () => {
  try {
    // Return cached rates if still valid
    if (cachedRates && lastFetch && (Date.now() - lastFetch < CACHE_DURATION)) {
      return { rates: cachedRates, error: null };
    }

    const response = await fetch(API_URL);
    const data = await response.json();
    
    if (data.rates) {
      cachedRates = data.rates;
      lastFetch = Date.now();
      return { rates: data.rates, error: null };
    }
    
    return { rates: null, error: 'Failed to fetch rates' };
  } catch (error) {
    return { rates: null, error: error.message };
  }
};

// Convert amount from one currency to another
export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
  try {
    if (fromCurrency === toCurrency) {
      return { convertedAmount: amount, rate: 1, error: null };
    }

    const { rates, error } = await getExchangeRates();
    
    if (error) {
      return { convertedAmount: null, rate: null, error };
    }

    // Convert to USD first, then to target currency
    const amountInUSD = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
    const convertedAmount = toCurrency === 'USD' ? amountInUSD : amountInUSD * rates[toCurrency];
    const rate = rates[toCurrency] / rates[fromCurrency];

    return { 
      convertedAmount: parseFloat(convertedAmount.toFixed(2)), 
      rate: parseFloat(rate.toFixed(4)),
      error: null 
    };
  } catch (error) {
    return { convertedAmount: null, rate: null, error: error.message };
  }
};

// Get rate between two currencies
export const getConversionRate = async (fromCurrency, toCurrency) => {
  try {
    if (fromCurrency === toCurrency) {
      return { rate: 1, error: null };
    }

    const { rates, error } = await getExchangeRates();
    
    if (error) {
      return { rate: null, error };
    }

    const rate = rates[toCurrency] / rates[fromCurrency];
    return { rate: parseFloat(rate.toFixed(4)), error: null };
  } catch (error) {
    return { rate: null, error: error.message };
  }
};