/**
 * DOM Ready Detection
 * Ensures code runs after DOM is fully loaded
 */
function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Visibility Animation Handler
 * Manages fade-in animations for content sections
 */
function initAnimations() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const instructionSteps = document.querySelectorAll('.instruction-step');

    // Check if animations should run (skip for bots/crawlers)
    if (isBot()) {
        contentWrapper.classList.add('visible');
        instructionSteps.forEach(step => step.classList.add('visible'));
        return;
    }

    // Check viewport width (only animate on desktop)
    const shouldAnimate = window.innerWidth >= 980;

    if (!shouldAnimate) {
        contentWrapper.classList.add('visible');
        instructionSteps.forEach(step => step.classList.add('visible'));
        return;
    }

    // Fade in content wrapper after short delay
    setTimeout(() => {
        contentWrapper.classList.add('visible');
    }, 200);

    // Stagger instruction step animations
    instructionSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('visible');
        }, 400 + (index * 200));
    });

    // Store animation state in sessionStorage
    sessionStorage.setItem('welcomePageAnimated', 'true');
}

/**
 * Bot Detection
 * Prevents animations from running for crawlers
 */
function isBot() {
    const botPattern = /bot|crawler|spider|crawling|googlebot|bingbot|slurp|DuckDuckBot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot/i;
    return botPattern.test(navigator.userAgent);
}

/**
 * Responsive Handler
 * Adjusts behavior based on window resize
 */
function handleResize() {
    const contentWrapper = document.querySelector('.content-wrapper');
    const instructionSteps = document.querySelectorAll('.instruction-step');

    // If already animated once this session, skip
    if (sessionStorage.getItem('welcomePageAnimated') === 'true') {
        contentWrapper.classList.add('visible');
        instructionSteps.forEach(step => step.classList.add('visible'));
    }
}

/**
 * Initialize
 */
domReady(() => {
    initAnimations();

    // Add resize listener with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });
});
