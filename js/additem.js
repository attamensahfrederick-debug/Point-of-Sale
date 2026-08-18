// Add item form with profit calculation
document.addEventListener('DOMContentLoaded', () => {
    const costInput = document.getElementById('costPrice');
    const sellingInput = document.getElementById('sellingPrice');
    const profitDisplay = document.getElementById('profitValue');

    // Calculate profit margin when prices change
    function calculateProfit() {
        const costPrice = parseFloat(costInput.value) || 0;
        const sellingPrice = parseFloat(sellingInput.value) || 0;
        const profitMargin = sellingPrice - costPrice;
        
        if (profitDisplay) {
            profitDisplay.textContent = profitMargin.toFixed(2);
        }
    }

    // Listen for price changes
    if (costInput) costInput.addEventListener('input', calculateProfit);
    if (sellingInput) sellingInput.addEventListener('input', calculateProfit);
});
