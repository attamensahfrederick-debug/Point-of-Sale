// Inventory filter and search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const tableRows = Array.from(document.querySelectorAll('#inventoryTable tr'));
    const filterChips = Array.from(document.querySelectorAll('.chip'));

    // Apply filters based on search term and category
    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        tableRows.forEach(row => {
            const rowContent = row.innerText.toLowerCase();
            const matchesSearch = rowContent.includes(searchTerm);
            const matchesCategory = selectedCategory === 'All' || rowContent.includes(selectedCategory.toLowerCase());
            
            row.style.display = matchesSearch && matchesCategory ? '' : 'none';
        });
    }

    // Search and category filter listeners
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

    // Category chip selection
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const selectedValue = chip.textContent.trim();
            categoryFilter.value = selectedValue === 'All' ? 'All' : selectedValue;
            applyFilters();
        });
    });
});
