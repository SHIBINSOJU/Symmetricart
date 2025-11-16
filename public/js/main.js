document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.like-btn');
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const response = await fetch(`/products/like/${id}`, { method: 'POST' });
            const data = await response.json();
            e.target.textContent = `Like (${data.likes})`;
        });
    });

    wishlistButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const response = await fetch(`/products/wishlist/${id}`, { method: 'POST' });
            const data = await response.json();
            // You can update the button text or style based on the response
            console.log(data);
        });
    });
});
