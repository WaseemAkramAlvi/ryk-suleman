document.addEventListener('DOMContentLoaded', () => {
    console.log('RYK City Housing Scheme - AI Powered Interface Loaded');

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // Navbar Scroll Effect
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '15px 0';
            nav.style.background = 'rgba(15, 21, 28, 0.95)';
        } else {
            nav.style.padding = '20px 0';
            nav.style.background = 'rgba(15, 21, 28, 0.8)';
        }
    });

    // Installment Calculator Logic
    const plotSelect = document.getElementById('plot-select');
    const downPaymentSlider = document.getElementById('down-payment-slider');
    const downPaymentVal = document.getElementById('down-payment-val');
    const monthlyResult = document.getElementById('monthly-result');
    const totalPriceDisplay = document.getElementById('total-price-display');

    function calculateInstallment() {
        const total = parseInt(plotSelect.value);
        if (isNaN(total) || total === 0) return;

        const percent = parseInt(downPaymentSlider.value);
        downPaymentVal.textContent = percent + '%';

        const downPaymentAmount = total * (percent / 100);
        const remainingAmount = total - downPaymentAmount;
        const months = 48; // 4 Years
        const monthly = remainingAmount / months;

        monthlyResult.textContent = 'PKR ' + Math.floor(monthly).toLocaleString();
        totalPriceDisplay.textContent = 'PKR ' + total.toLocaleString();
    }

    if (plotSelect && downPaymentSlider) {
        plotSelect.addEventListener('change', calculateInstallment);
        downPaymentSlider.addEventListener('input', calculateInstallment);
    }

    // Expose helper to window for HTML buttons
    window.fillCalculator = function (label, price) {
        const select = document.getElementById('plot-select');
        select.value = price;

        // Trigger generic change
        calculateInstallment();


        // Scroll to calculator
        document.querySelector('.calculator-box').scrollIntoView({ behavior: 'smooth' });
    };

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Apply fade-in to major sections and cards
    document.querySelectorAll('section, .glass-card, .btn').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});


