document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');


            [name, email, subject, message].forEach(field => {
                field.classList.remove('is-invalid');
            });


            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                email.classList.add('is-invalid');
                isValid = false;
            }


            [name, subject, message].forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    }


    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modalImg = document.getElementById('modalImage');
    if (galleryItems && modalImg) {
        galleryItems.forEach(img => {
            img.addEventListener('click', function() {
                modalImg.src = this.src;
                $('#imageModal').modal('show');
            });
        });
    }


    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});
