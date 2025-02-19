import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TOKENS = [
  { id: "robinhood", name: "Robinhood", logo: "https://img-v1.raydium.io/icon/h5NciPdMZ5QCB5BYETJMYBMpVx9ZuitR6HcVjyBhood.png" },
  { id: "ai16z", name: "AI16z", logo: "https://wsrv.nl/?fit=cover&w=128&h=128&url=https://ipfs.io/ipfs/QmcNTVAoyJ7zDbPnN9jwiMoB8uCoJBUP9RGmmiGGHv44yX" },
];

export default function PriceTracker() {
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      const responses = await Promise.all(
        TOKENS.map(token => fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${token.id}&vs_currencies=usd`))
      );
      const data = await Promise.all(responses.map(res => res.json()));
      
      setPrevPrices(prices);
      setPrices(Object.fromEntries(TOKENS.map((token, i) => [token.id, data[i][token.id]?.usd])));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, [prices]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">Solana Bluechip Price Tracker</h1>
      <div className="w-full max-w-md space-y-4">
        {TOKENS.map(token => {
          const currentPrice = prices[token.id];
          const prevPrice = prevPrices[token.id];
          const isUp = currentPrice > prevPrice;
          const isDown = currentPrice < prevPrice;

          return (
            <div key={token.id} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg shadow-md border border-transparent bg-gradient-to-r from-gray-800 to-gray-900 border-opacity-50">
              <div className="flex items-center space-x-2">
                <img src={token.logo} alt={token.name} className="w-8 h-8 rounded-full" />
                <span className="text-gray-400 text-xs">{token.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-lg font-semibold">
                <span className={isUp ? "text-green-400" : isDown ? "text-red-400" : "text-white"}>${currentPrice?.toFixed(2)}</span>
                {isUp && <ArrowUpRight className="text-green-400 w-4 h-4" />}
                {isDown && <ArrowDownRight className="text-red-400 w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
