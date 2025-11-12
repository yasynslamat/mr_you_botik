
function performSearch() {
    const query = document.getElementById('searchInput').value;
    if (query) {
        // اینجا می‌تونی منطق جستجو رو اضافه کنی (مثل فیلتر محصولات یا redirect به صفحه نتایج)
        alert('جستجو برای: ' + query); // مثال ساده – جایگزین کن با کد واقعی
        // مثلاً: window.location.href = '/search?q=' + encodeURIComponent(query);
    }
}
//بخش اسلایدر محصولات
// اسکرول با فلش
function scrollSlider(sliderId, amount) {
    const slider = document.getElementById(sliderId);
    if (slider) slider.scrollLeft -= amount;
}

// اسکرول با موس (کشیدن)
document.addEventListener('mousedown', e => {
    const slider = e.target.closest('.slider');
    if (!slider) return;
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;
    let isDown = true;

    const move = ev => {
        if (!isDown) return;
        ev.preventDefault();
        const x = ev.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    };
    const up = () => { 
        isDown = false; 
        document.removeEventListener('mousemove', move); 
        document.removeEventListener('mouseup', up); 
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
});
// نمایش ناموجود در اسلایدرها
function loadSections() {
    const container = document.getElementById('sections-container');
    container.innerHTML = '';
    categories.forEach(cat => {
        const products = JSON.parse(localStorage.getItem(`adidas_${cat.id}`)) || [];
        if (products.length === 0) return;

        let html = `
            <section class="section" id="${cat.id}">
                <h2 class="section-title">${cat.title} آدیداس</h2>
                <div class="horizontal-slider">
                    <div class="scroll-arrow scroll-right" onclick="scrollSlider('${cat.id}-slider', -300)">←</div>
                    <div class="scroll-arrow scroll-left" onclick="scrollSlider('${cat.id}-slider', 300)">→</div>
                    <div class="slider" id="${cat.id}-slider">`;

        products.forEach(p => {
            const stockText = p.outOfStock ? '<span style="color:#e74c3c;">(ناموجود)</span>' : '';
            html += `
                <div class="product-card ${p.outOfStock ? 'out-of-stock' : ''}">
                    <img src="${p.img}" class="product-img" alt="${p.title}">
                    <div class="product-info">
                        <h3 class="product-title">${p.title} ${stockText}</h3>
                        <p class="product-price">${p.price} تومان</p>
                        <button class="add-to-cart" ${p.outOfStock ? 'disabled' : ''} onclick="addToCart('${p.title}')">اضافه به سبد</button>
                    </div>
                </div>`;
        });

        html += '</div></div></section>';
        container.innerHTML += html;
    });
}

// CSS اضافی برای ناموجود (به <style> اضافه کن)
