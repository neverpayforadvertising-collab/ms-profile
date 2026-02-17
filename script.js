document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = "Sending...";
        btn.disabled = true;

        const templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_ewu7lqk', 'template_iua9nh3', templateParams)
            .then(function () {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(function () {
                alert('Failed to send message.');
            })
            .finally(function () {
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
});
