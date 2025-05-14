// scripts.js
document.querySelectorAll('.marquee-row').forEach(row => {
    row.addEventListener('mouseover', () => {
        row.style.animationPlayState = 'paused';
    });
    row.addEventListener('mouseout', () => {
        row.style.animationPlayState = 'running';
    });
});
let open = false;

function menuOpen() {
    open = !open;
    document.getElementById('nav-links').style.display = open ? 'block' : 'none';
    document.getElementById('menu-icon').style.display = open ? 'none' : 'block';
    document.getElementById('close-icon').style.display = open ? 'block' : 'none';

    if (open) {
        document.querySelector('.navbar-links').style.display = 'block';
        document.querySelector('.navbar-cta').style.display = 'block';
    } else {
        document.querySelector('.navbar-links').style.display = 'none';
        document.querySelector('.navbar-cta').style.display = 'none';
    }
}

// Form validation
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('.vfd-error-message').forEach(function (elem) {
        elem.style.display = 'none';
    });

    // Validate name
    const name = document.getElementById('name').value;
    if (!name.trim()) {
        document.getElementById('nameError').textContent = "Name is required.";
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Validate email
    const email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('emailError').textContent = "Please enter a valid email.";
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validate phone
    const phone = document.getElementById('phone').value;
    if (!phone.match(/^\d{10}$/)) {
        document.getElementById('phoneError').textContent = "Phone number must be 10 digits.";
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    // Validate radio button
    const options = document.querySelector('input[name="option"]:checked');
    if (!options) {
        document.getElementById('optionError').textContent = "Please select an option.";
        document.getElementById('optionError').style.display = 'block';
        isValid = false;
    }

    // Validate message
    const message = document.getElementById('message').value;
    if (!message.trim()) {
        document.getElementById('messageError').textContent = "Message cannot be empty.";
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    }

    // If valid, send the email
    if (isValid) {
        SendMail(); // Call the function to send email
        document.getElementById('formSuccessMessage').textContent = "Your message has been sent successfully!";
        document.getElementById('formSuccessMessage').style.display = 'block';
    }
});

//emailingService
function SendMail() {
    var params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.querySelector('input[name="option"]:checked').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_wq8kr6e", "template_runiszv", params).then(function(res) {
        console.log("Success!", res.status); // Log success status
        alert("Your message has been sent successfully!"); // Alert success message
    }).catch(function(error) {
        console.error("Failed to send email:", error); // Log error
        alert("Failed to send email: " + error); // Alert error
    });
    window.onbeforeunload = function() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.reset(); // Reset the form inputs
        }
    };
}


