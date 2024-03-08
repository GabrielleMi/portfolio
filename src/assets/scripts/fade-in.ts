document.addEventListener("DOMContentLoaded", () => {
    const threshold = 0.5;
    const animatedElements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver((entries, options) => {
        entries.forEach((entry) => {
            if(entry.intersectionRatio >= threshold) {
                entry.target.classList.add('slide-in');
                options.unobserve(entry.target);
            }
        });
    }, { threshold });

    animatedElements.forEach((element) => {
        observer.observe(element);
    });
});