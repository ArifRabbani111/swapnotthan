document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const eventForm = document.getElementById('event-form');
    const memberForm = document.getElementById('member-form');
    const eventsList = document.getElementById('events-list');
    const membersList = document.getElementById('members-list');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
        showAdminDashboard();
        loadEvents();
        loadMembers();
    }
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('adminToken', data.token);
                showAdminDashboard();
                loadEvents();
                loadMembers();
            } else {
                showMessage(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        });
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminToken');
        showLoginForm();
    });
    
    // Event form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const eventId = document.getElementById('event-id').value;
        const eventData = {
            title: document.getElementById('event-title').value,
            date: document.getElementById('event-date').value,
            location: document.getElementById('event-location').value,
            description: document.getElementById('event-description').value,
            image_url: document.getElementById('event-image').value
        };
        
        const url = eventId ? `/admin/events/${eventId}` : '/admin/events';
        const method = eventId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('adminToken')
            },
            body: JSON.stringify(eventData)
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, 'success');
            eventForm.reset();
            document.getElementById('event-id').value = '';
            loadEvents();
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        });
    });
    
    // Member form submission
    memberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const memberId = document.getElementById('member-id').value;
        const memberData = {
            name: document.getElementById('member-name').value,
            position: document.getElementById('member-position').value,
            image_url: document.getElementById('member-image').value,
            facebook_url: document.getElementById('member-facebook').value,
            linkedin_url: document.getElementById('member-linkedin').value
        };
        
        const url = memberId ? `/admin/members/${memberId}` : '/admin/members';
        const method = memberId ? 'PUT' : 'POST';
        
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('adminToken')
            },
            body: JSON.stringify(memberData)
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, 'success');
            memberForm.reset();
            document.getElementById('member-id').value = '';
            loadMembers();
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred. Please try again.', 'error');
        });
    });
    
    // Load events
    function loadEvents() {
        fetch('/admin/events', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(events => {
            eventsList.innerHTML = '';
            
            events.forEach(event => {
                const eventItem = document.createElement('div');
                eventItem.className = 'list-item';
                
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString();
                
                eventItem.innerHTML = `
                    <div>
                        <h4>${event.title}</h4>
                        <p>${formattedDate} | ${event.location}</p>
                    </div>
                    <div class="list-item-buttons">
                        <button class="btn-edit" data-id="${event.id}">Edit</button>
                        <button class="btn-delete" data-id="${event.id}">Delete</button>
                    </div>
                `;
                
                eventsList.appendChild(eventItem);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-id');
                    editEvent(eventId);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-id');
                    deleteEvent(eventId);
                });
            });
        })
        .catch(error => {
            console.error('Error loading events:', error);
        });
    }
    
    // Load members
    function loadMembers() {
        fetch('/admin/members', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(members => {
            membersList.innerHTML = '';
            
            members.forEach(member => {
                const memberItem = document.createElement('div');
                memberItem.className = 'list-item';
                
                memberItem.innerHTML = `
                    <div>
                        <h4>${member.name}</h4>
                        <p>${member.position}</p>
                    </div>
                    <div class="list-item-buttons">
                        <button class="btn-edit" data-id="${member.id}">Edit</button>
                        <button class="btn-delete" data-id="${member.id}">Delete</button>
                    </div>
                `;
                
                membersList.appendChild(memberItem);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    const memberId = this.getAttribute('data-id');
                    editMember(memberId);
                });
            });
            
            document.querySelectorAll('.btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const memberId = this.getAttribute('data-id');
                    deleteMember(memberId);
                });
            });
        })
        .catch(error => {
            console.error('Error loading members:', error);
        });
    }
    
    // Edit event
    function editEvent(eventId) {
        fetch(`/admin/events/${eventId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(event => {
            document.getElementById('event-id').value = event.id;
            document.getElementById('event-title').value = event.title;
            document.getElementById('event-date').value = event.date;
            document.getElementById('event-location').value = event.location;
            document.getElementById('event-description').value = event.description;
            document.getElementById('event-image').value = event.image_url;
            
            // Scroll to form
            eventForm.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading event:', error);
        });
    }
    
    // Edit member
    function editMember(memberId) {
        fetch(`/admin/members/${memberId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(member => {
            document.getElementById('member-id').value = member.id;
            document.getElementById('member-name').value = member.name;
            document.getElementById('member-position').value = member.position;
            document.getElementById('member-image').value = member.image_url;
            document.getElementById('member-facebook').value = member.facebook_url || '';
            document.getElementById('member-linkedin').value = member.linkedin_url || '';
            
            // Scroll to form
            memberForm.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading member:', error);
        });
    }
    
    // Delete event
    function deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            fetch(`/admin/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('adminToken')
                }
            })
            .then(response => response.json())
            .then(data => {
                showMessage(data.message, 'success');
                loadEvents();
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                showMessage('An error occurred. Please try again.', 'error');
            });
        }
    }
    
    // Delete member
    function deleteMember(memberId) {
        if (confirm('Are you sure you want to delete this member?')) {
            fetch(`/admin/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('adminToken')
                }
            })
            .then(response => response.json())
            .then(data => {
                showMessage(data.message, 'success');
                loadMembers();
            })
            .catch(error => {
                console.error('Error deleting member:', error);
                showMessage('An error occurred. Please try again.', 'error');
            });
        }
    }
    
    // Show admin dashboard
    function showAdminDashboard() {
        loginForm.style.display = 'none';
        adminDashboard.style.display = 'block';
    }
    
    // Show login form
    function showLoginForm() {
        loginForm.style.display = 'block';
        adminDashboard.style.display = 'none';
    }
    
    // Show message
    function showMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        document.querySelector('.container').prepend(messageElement);
        
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
});