const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');

// High-performance render function
function render(filter = "") {
  const filtered = products.filter(p => 
    p.title.toLowerCase().includes(filter.toLowerCase()) || 
    p.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Using a single string join is much faster for 100+ items
  const html = filtered.map(p => `
    <div class="card">
      <div class="img-wrapper">
        <span class="badge">🔥 Trending</span>
        <img src="${p.image}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="info">
        <h3>${p.title}</h3>
        <p>${p.category}</p>
        <div class="bottom">
          <span class="price">${p.price}</span>
          <a href="${p.link}" target="_blank" class="buy-btn">Buy Now</a>
        </div>
      </div>
    </div>
  `).join('');

  grid.innerHTML = html;
}

// Debounce Search: Only filters after user stops typing for 100ms
let typingTimer;
searchInput.addEventListener('input', (e) => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => render(e.target.value), 100);
});

// Initial render
render();
