document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Load events from API
    loadEvents();
    
    // Load members from API
    loadMembers();
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Send to API
            fetch('/api/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                // Create a message element
                const messageElement = document.createElement('div');
                messageElement.style.position = 'fixed';
                messageElement.style.top = '20px';
                messageElement.style.right = '20px';
                messageElement.style.padding = '15px 25px';
                messageElement.style.borderRadius = '5px';
                messageElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                messageElement.style.zIndex = '1000';
                messageElement.style.color = 'white';
                
                if (data.message.includes('successful')) {
                    messageElement.style.backgroundColor = '#2ecc71';
                    emailInput.value = '';
                } else {
                    messageElement.style.backgroundColor = '#e74c3c';
                }
                
                messageElement.textContent = data.message;
                document.body.appendChild(messageElement);
                
                // Remove the message after 5 seconds
                setTimeout(() => {
                    messageElement.style.opacity = '0';
                    messageElement.style.transition = 'opacity 0.5s';
                    setTimeout(() => {
                        document.body.removeChild(messageElement);
                    }, 500);
                }, 5000);
            })
            .catch(error => {
                console.error('Error:', error);
                // Show error message
                const messageElement = document.createElement('div');
                messageElement.style.position = 'fixed';
                messageElement.style.top = '20px';
                messageElement.style.right = '20px';
                messageElement.style.backgroundColor = '#e74c3c';
                messageElement.style.color = 'white';
                messageElement.style.padding = '15px 25px';
                messageElement.style.borderRadius = '5px';
                messageElement.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                messageElement.style.zIndex = '1000';
                messageElement.textContent = 'An error occurred. Please try again.';
                
                document.body.appendChild(messageElement);
                
                setTimeout(() => {
                    messageElement.style.opacity = '0';
                    messageElement.style.transition = 'opacity 0.5s';
                    setTimeout(() => {
                        document.body.removeChild(messageElement);
                    }, 500);
                }, 5000);
            });
        });
    }
    
    // Add active class to navigation based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
});

// Function to load events from API
function loadEvents() {
    fetch('/api/events')
        .then(response => response.json())
        .then(events => {
            const eventsGrid = document.querySelector('.events-grid');
            eventsGrid.innerHTML = ''; // Clear existing content
            
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                
                // Format date
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
                
                eventCard.innerHTML = `
                    <div class="event-image" style="background-image: url('${event.image_url}');"></div>
                    <div class="event-content">
                        <h3>${event.title}</h3>
                        <p class="event-date">${formattedDate} | ${event.location}</p>
                        <p>${event.description}</p>
                        <div class="event-actions">
                            <a href="#" class="btn">Register Now</a>
                            <a href="#" class="btn btn-outline">View Details</a>
                        </div>
                    </div>
                `;
                
                eventsGrid.appendChild(eventCard);
            });
        })
        .catch(error => console.error('Error loading events:', error));
}

// Function to load members from API
function loadMembers() {
    fetch('/api/members')
        .then(response => response.json())
        .then(members => {
            const membersGrid = document.querySelector('.members-grid');
            membersGrid.innerHTML = ''; // Clear existing content
            
            members.forEach(member => {
                const memberCard = document.createElement('div');
                memberCard.className = 'member-card';
                
                memberCard.innerHTML = `
                    <div class="member-image" style="background-image: url('${member.image_url}');" alt="${member.name}"></div>
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <p>${member.position}</p>
                        <div class="member-social">
                            <a href="${member.facebook_url}"><i class="fab fa-facebook"></i></a>
                            <a href="${member.linkedin_url}"><i class="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                `;
                
                membersGrid.appendChild(memberCard);
            });
        })
        .catch(error => console.error('Error loading members:', error));
}