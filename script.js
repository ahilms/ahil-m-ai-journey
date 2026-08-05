// ===================================================================
// Setup: respect reduced motion preference
// ===================================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

// ===================================================================
// Custom cursor
// ===================================================================
if (!isTouch && !prefersReducedMotion) {
    document.body.classList.add('cursor-ready');
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.transform = `translate(${ringX - 16}px, ${ringY - 16}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .skill-card, .project-card, .gallery-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
    });
}

// ===================================================================
// Scroll progress bar
// ===================================================================
const progressFill = document.getElementById('progressFill');
function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressFill.style.width = pct + '%';
}
window.addEventListener('scroll', updateProgress);
updateProgress();

// ===================================================================
// Active nav link on scroll + smooth scroll
// ===================================================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // close mobile nav after click
        document.getElementById('primaryNav').classList.remove('active');
        document.getElementById('navToggle').classList.remove('active');
    });
});

// ===================================================================
// Mobile nav toggle
// ===================================================================
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
navToggle.addEventListener('click', () => {
    const isOpen = primaryNav.classList.toggle('active');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// ===================================================================
// Scroll reveal via IntersectionObserver
// ===================================================================
const revealEls = document.querySelectorAll('.reveal');
if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
} else {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealEls.forEach(el => revealObserver.observe(el));
}

// ===================================================================
// Magnetic buttons
// ===================================================================
if (!isTouch && !prefersReducedMotion) {
    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ===================================================================
// Kinetic name letters react to cursor proximity
// ===================================================================
if (!isTouch && !prefersReducedMotion) {
    const letters = document.querySelectorAll('.letter');
    window.addEventListener('mousemove', (e) => {
        letters.forEach(letter => {
            const rect = letter.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
            if (dist < 120) {
                const lift = (120 - dist) / 120;
                letter.style.transform = `translateY(${-lift * 14}px)`;
            } else {
                letter.style.transform = 'translateY(0)';
            }
        });
    });
}

// ===================================================================
// Terminal typing sequence
// ===================================================================
const terminalLines = [
    { type: 'cmd', text: 'who am I' },
    { type: 'out', text: 'Ahil M — AI Developer, Data & ML' },
    { type: 'cmd', text: 'cat focus.txt' },
    { type: 'out', text: 'focus on building innovative solutions' },
    { type: 'cmd', text: 'status --check' },
    { type: 'out', text: 'Available for freelance & full-time roles.' }
];

const terminalBody = document.getElementById('terminalBody');

function typeLine(line, container, callback) {
    const p = document.createElement('p');
    p.classList.add('line');
    if (line.type === 'cmd') {
        const prompt = document.createElement('span');
        prompt.classList.add('prompt');
        prompt.textContent = '$';
        p.appendChild(prompt);
    } else {
        p.classList.add('output');
    }
    const textSpan = document.createElement('span');
    p.appendChild(textSpan);
    container.appendChild(p);

    if (prefersReducedMotion) {
        textSpan.textContent = line.text;
        callback();
        return;
    }

    let i = 0;
    const speed = line.type === 'cmd' ? 70 : 30;
    function step() {
        if (i < line.text.length) {
            textSpan.textContent += line.text.charAt(i);
            i++;
            setTimeout(step, speed);
        } else {
            callback();
        }
    }
    step();
}

function runTerminal(index = 0) {
    if (index >= terminalLines.length) {
        const cursor = document.createElement('span');
        cursor.classList.add('blink');
        terminalBody.appendChild(cursor);
        return;
    }
    setTimeout(() => {
        typeLine(terminalLines[index], terminalBody, () => runTerminal(index + 1));
    }, index === 0 ? 400 : 450);
}

// kick off the terminal once it's in view
const terminalObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runTerminal();
            obs.disconnect();
        }
    });
}, { threshold: 1  });
terminalObserver.observe(document.getElementById('terminal'));

// ===================================================================
// Resume card tilt / focus interactions
// ===================================================================
const resumeFrame = document.querySelector('.resume-frame');
if (resumeFrame && !prefersReducedMotion) {
    resumeFrame.addEventListener('mousemove', (event) => {
        const rect = resumeFrame.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const px = (x / rect.width - 0.5) * 18;
        const py = (y / rect.height - 0.5) * -18;
        resumeFrame.style.setProperty('--tilt-x', `${py}deg`);
        resumeFrame.style.setProperty('--tilt-y', `${px}deg`);
    });
    resumeFrame.addEventListener('mouseleave', () => {
        resumeFrame.style.setProperty('--tilt-x', '0deg');
        resumeFrame.style.setProperty('--tilt-y', '0deg');
    });
}

// ===================================================================
// Contact form with FormSubmit integration
// ===================================================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

// Validate individual fields
function validateField(input) {
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(input.value.trim());
    }
    return input.value.trim().length > 0;
}

// Show validation error
function showValidationError(input) {
    input.style.borderColor = 'var(--rust)';
    input.style.boxShadow = '0 0 0 2px rgba(183, 75, 75, 0.1)';
}

// Clear validation error
function clearValidationError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
}

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => {
        if (validateField(input)) {
            clearValidationError(input);
        } else if (input.value.trim()) {
            showValidationError(input);
        }
    });
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            clearValidationError(input);
        }
    });
});

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValid = validateField(nameInput);
    const emailValid = validateField(emailInput);
    const messageValid = validateField(messageInput);
    
    if (!nameValid) showValidationError(nameInput);
    if (!emailValid) showValidationError(emailInput);
    if (!messageValid) showValidationError(messageInput);
    
    if (!nameValid || !emailValid || !messageValid) {
        formStatus.textContent = '> please fill all fields correctly.';
        formStatus.style.color = 'var(--rust)';
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    formStatus.textContent = '> sending your message...';
    formStatus.style.color = 'var(--mute)';
    
    try {
        const formData = new FormData(contactForm);
        
        // Submit to FormSubmit
        const response = await fetch('https://formsubmit.co/ajax/ahil3112005@gmail.com', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            // Success!
            formStatus.textContent = '✓ message sent! redirecting you now...';
            formStatus.style.color = 'var(--teal)';
            contactForm.reset();
            clearValidationError(nameInput);
            clearValidationError(emailInput);
            clearValidationError(messageInput);
            
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '#home';
                formStatus.textContent = '';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.textContent = '> error sending message. please try again.';
        formStatus.style.color = 'var(--rust)';
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
