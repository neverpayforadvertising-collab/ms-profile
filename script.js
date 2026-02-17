// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // =========================
    // Mobile menu toggle
    // =========================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // =========================
    // Smooth scrolling for nav links
    // =========================
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu after click
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // =========================
    // Scroll effects
    // =========================
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Highlight active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Navbar shadow on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        }
    });

    // =========================
    // EmailJS contact form
    // =========================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = "Sending...";
            btn.disabled = true;

            const formData = {
                name: document.getElementById('name').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (res.ok) {
                    alert('Message sent successfully!');
                    contactForm.reset();
                } else {
                    alert('Failed to send message.');
                }
            } catch (err) {
                alert('Error sending message.');
            } finally {
                btn.textContent = originalText;
                btn.disabled = false;
            }
        });
    }


    // async function handleSubmit(e) {
    //     e.preventDefault();

    //     const formData = {
    //         name: e.target.name.value,
    //         subject: e.target.subject.value,
    //         message: e.target.message.value,
    //     };

    //     await fetch('/api/contact', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     });

    //     alert('Message sent!');
    // }

});
