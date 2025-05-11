document.addEventListener("DOMContentLoaded", function() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        
        question.addEventListener("click", () => {
            // Toggle answer visibility with smooth transition
            answer.style.display = answer.style.display === "block" ? "none" : "block";
            
            // Add/remove active class for styling
            item.classList.toggle("active");
            
            // Close other FAQ items when opening a new one
            if (answer.style.display === "block") {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector(".faq-answer").style.display = "none";
                        otherItem.classList.remove("active");
                    }
                });
            }
        });
    });
});
