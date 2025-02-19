async function fetchTokenPrices() {
    const url = "https://api.coingecko.com/api/v3/simple/price?ids=robinhood,ai16z&vs_currencies=usd";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched prices:", data);

        document.getElementById("prices").innerHTML = `
            <div class="token-card">
                <img src="https://img-v1.raydium.io/icon/h5NciPdMZ5QCB5BYETJMYBMpVx9ZuitR6HcVjyBhood.png">
                <div class="token-info">
                    <p class="token-name">Robinhood (HOOD)</p>
                    <p class="token-price">$${data.robinhood.usd}</p>
                </div>
            </div>
            <div class="token-card">
                <img src="https://wsrv.nl/?fit=cover&w=128&h=128&url=https://ipfs.io/ipfs/QmcNTVAoyJ7zDbPnN9jwiMoB8uCoJBUP9RGmmiGGHv44yX">
                <div class="token-info">
                    <p class="token-name">ai16z</p>
                    <p class="token-price">$${data.ai16z.usd}</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("prices").innerHTML = `<p style="color: red;">Error fetching prices.</p>`;
    }
}

// Fetch prices immediately & refresh every 5 seconds
fetchTokenPrices();
setInterval(fetchTokenPrices, 5000);

