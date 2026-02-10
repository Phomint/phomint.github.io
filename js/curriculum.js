export function initCurriculum() {
    const expandButtons = document.querySelectorAll('.expand-button');

    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const listId = button.getAttribute('data-target');
            const list = document.getElementById(listId);

            if (!list) return;

            const hiddenItems = list.querySelectorAll('.hidden-item');
            const isExpanded = button.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                // Collapse
                hiddenItems.forEach(item => {
                    item.style.display = 'none';
                    // Optional: fade out animation could go here
                });
                button.textContent = 'Ver mais';
                button.setAttribute('data-expanded', 'false');
            } else {
                // Expand
                hiddenItems.forEach(item => {
                    item.style.display = 'block';
                    // Optional: fade in animation
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                });
                button.textContent = 'Ver menos';
                button.setAttribute('data-expanded', 'true');
            }
        });
    });
}
