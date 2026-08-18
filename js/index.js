// Dashboard card interactions
document.addEventListener('DOMContentLoaded', () => {
    const cardButtons = document.querySelectorAll('.card-button');
    
    cardButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const link = button.getAttribute('href');
            
            // Prevent default action for placeholder links
            if (link === '#') {
                event.preventDefault();
                console.warn('This feature is not yet available:', button.textContent.trim());
            }
        });
    });
});
