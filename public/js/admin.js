document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const loginForm = document.getElementById('login-form');
    const adminDashboard = document.getElementById('admin-dashboard');
    const eventForm = document.getElementById('event-form');
    const memberForm = document.getElementById('member-form');
    const eventsList = document.getElementById('events-table-body');
    const membersList = document.getElementById('members-table-body');
    const logoutBtn = document.getElementById('logout-btn');
    
    // Menu items
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.btn-action');
    const addButtons = document.querySelectorAll('.btn-add');
    const cancelButtons = document.querySelectorAll('.btn-cancel');
    
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
        showAdminDashboard();
        loadDashboardStats();
    }
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('admin-password').value;
        
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
                loadDashboardStats();
            } else {
                showNotification(data.message, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        });
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('adminToken');
        showLoginForm();
    });
    
    // Menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
        });
    });
    
    // Quick action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'add-event') {
                switchSection('events');
                showEventForm();
            } else if (action === 'add-member') {
                switchSection('members');
                showMemberForm();
            }
        });
    });
    
    // Add buttons
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            if (action === 'add-event') {
                showEventForm();
            } else if (action === 'add-member') {
                showMemberForm();
            }
        });
    });
    
    // Cancel buttons
    cancelButtons.forEach(button => {
        button.addEventListener('click', function() {
            const formId = this.getAttribute('data-cancel');
            hideForm(formId);
        });
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
        
        const url = eventId ? `/admin-api/events/${eventId}` : '/admin-api/events';
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
            showNotification(data.message, 'success');
            hideForm('event-form');
            loadEvents();
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
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
        
        const url = memberId ? `/admin-api/members/${memberId}` : '/admin-api/members';
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
            showNotification(data.message, 'success');
            hideForm('member-form');
            loadMembers();
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'error');
        });
    });
    
    // Switch between sections
    function switchSection(sectionName) {
        // Update menu items
        menuItems.forEach(item => {
            if (item.getAttribute('data-section') === sectionName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update content sections visibility explicitly
        contentSections.forEach(section => {
            if (section.id === `${sectionName}-section`) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
        
        // Update header title
        const headerTitle = document.querySelector('.header-left h1');
        if (headerTitle) {
            if (sectionName === 'dashboard') {
                headerTitle.textContent = 'Dashboard';
            } else if (sectionName === 'events') {
                headerTitle.textContent = 'Manage Events';
            } else if (sectionName === 'members') {
                headerTitle.textContent = 'Manage Team Members';
            }
        }
        
        // Load section-specific data
        if (sectionName === 'dashboard') {
            loadDashboardStats();
        } else if (sectionName === 'events') {
            loadEvents();
        } else if (sectionName === 'members') {
            loadMembers();
        }
    }
    
    // Load dashboard statistics
    function loadDashboardStats() {
        // Load events count
        fetch('/admin-api/events', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(events => {
            document.getElementById('events-count').textContent = events.length;
        })
        .catch(error => {
            console.error('Error loading events count:', error);
            document.getElementById('events-count').textContent = '0';
        });
        
        // Load members count
        fetch('/admin-api/members', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(members => {
            document.getElementById('members-count').textContent = members.length;
        })
        .catch(error => {
            console.error('Error loading members count:', error);
            document.getElementById('members-count').textContent = '0';
        });
        
        // Load subscribers count
        fetch('/api/subscribers', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch subscribers');
            }
            return response.json();
        })
        .then(subscribers => {
            document.getElementById('subscribers-count').textContent = subscribers.length;
        })
        .catch(error => {
            console.error('Error loading subscribers count:', error);
            document.getElementById('subscribers-count').textContent = '0';
        });
    }
    
    // Load events
    function loadEvents() {
        fetch('/admin-api/events', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(events => {
            eventsList.innerHTML = '';
            
            if (events.length === 0) {
                eventsList.innerHTML = '<tr><td colspan="4" style="text-align: center;">No events found</td></tr>';
                return;
            }
            
            events.forEach(event => {
                const eventDate = new Date(event.date);
                const formattedDate = eventDate.toLocaleDateString();
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${event.title}</td>
                    <td>${formattedDate}</td>
                    <td>${event.location}</td>
                    <td>
                        <button class="btn-edit" data-id="${event.id}">Edit</button>
                        <button class="btn-delete" data-id="${event.id}">Delete</button>
                    </td>
                `;
                
                eventsList.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('#events-table-body .btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-id');
                    editEvent(eventId);
                });
            });
            
            document.querySelectorAll('#events-table-body .btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const eventId = this.getAttribute('data-id');
                    deleteEvent(eventId);
                });
            });
        })
        .catch(error => {
            console.error('Error loading events:', error);
            showNotification('Error loading events', 'error');
        });
    }
    
    // Load members
    function loadMembers() {
        fetch('/admin-api/members', {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => response.json())
        .then(members => {
            membersList.innerHTML = '';
            
            if (members.length === 0) {
                membersList.innerHTML = '<tr><td colspan="3" style="text-align: center;">No members found</td></tr>';
                return;
            }
            
            members.forEach(member => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${member.name}</td>
                    <td>${member.position}</td>
                    <td>
                        <button class="btn-edit" data-id="${member.id}">Edit</button>
                        <button class="btn-delete" data-id="${member.id}">Delete</button>
                    </td>
                `;
                
                membersList.appendChild(row);
            });
            
            // Add event listeners to edit and delete buttons
            document.querySelectorAll('#members-table-body .btn-edit').forEach(button => {
                button.addEventListener('click', function() {
                    const memberId = this.getAttribute('data-id');
                    editMember(memberId);
                });
            });
            
            document.querySelectorAll('#members-table-body .btn-delete').forEach(button => {
                button.addEventListener('click', function() {
                    const memberId = this.getAttribute('data-id');
                    deleteMember(memberId);
                });
            });
        })
        .catch(error => {
            console.error('Error loading members:', error);
            showNotification('Error loading members', 'error');
        });
    }
    
    // Edit event
    function editEvent(eventId) {
        console.log('Editing event with ID:', eventId);
        
        fetch(`/admin-api/events/${eventId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch event');
            }
            return response.json();
        })
        .then(event => {
            // Populate the form
            document.getElementById('event-id').value = event.id;
            document.getElementById('event-title').value = event.title;
            document.getElementById('event-date').value = event.date;
            document.getElementById('event-location').value = event.location;
            document.getElementById('event-description').value = event.description;
            document.getElementById('event-image').value = event.image_url;
            
            document.getElementById('event-form-title').textContent = 'Edit Event';
            document.getElementById('event-form-container').style.display = 'block';
            document.getElementById('event-form').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading event:', error);
            showNotification('Error loading event data', 'error');
        });
    }
    
    // Edit member
    function editMember(memberId) {
        console.log('Editing member with ID:', memberId);
        
        fetch(`/admin-api/members/${memberId}`, {
            headers: {
                'x-auth-token': localStorage.getItem('adminToken')
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch member');
            }
            return response.json();
        })
        .then(member => {
            // Populate the form
            document.getElementById('member-id').value = member.id;
            document.getElementById('member-name').value = member.name;
            document.getElementById('member-position').value = member.position;
            document.getElementById('member-image').value = member.image_url;
            document.getElementById('member-facebook').value = member.facebook_url || '';
            document.getElementById('member-linkedin').value = member.linkedin_url || '';
            
            document.getElementById('member-form-title').textContent = 'Edit Member';
            document.getElementById('member-form-container').style.display = 'block';
            document.getElementById('member-form').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => {
            console.error('Error loading member:', error);
            showNotification('Error loading member data', 'error');
        });
    }
    
    // Delete event
    function deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            fetch(`/admin-api/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('adminToken')
                }
            })
            .then(response => response.json())
            .then(data => {
                showNotification(data.message, 'success');
                loadEvents();
            })
            .catch(error => {
                console.error('Error deleting event:', error);
                showNotification('An error occurred. Please try again.', 'error');
            });
        }
    }
    
    // Delete member
    function deleteMember(memberId) {
        if (confirm('Are you sure you want to delete this member?')) {
            fetch(`/admin-api/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': localStorage.getItem('adminToken')
                }
            })
            .then(response => response.json())
            .then(data => {
                showNotification(data.message, 'success');
                loadMembers();
            })
            .catch(error => {
                console.error('Error deleting member:', error);
                showNotification('An error occurred. Please try again.', 'error');
            });
        }
    }
    
    // Show event form
    function showEventForm() {
        document.getElementById('event-form-container').style.display = 'block';
        document.getElementById('event-form-title').textContent = 'Add New Event';
        eventForm.reset();
        document.getElementById('event-id').value = '';
        document.getElementById('event-form').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Show member form
    function showMemberForm() {
        document.getElementById('member-form-container').style.display = 'block';
        document.getElementById('member-form-title').textContent = 'Add New Member';
        memberForm.reset();
        document.getElementById('member-id').value = '';
        document.getElementById('member-form').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Hide form
    function hideForm(formId) {
        document.getElementById(`${formId}-container`).style.display = 'none';
        if (formId === 'event-form') {
            eventForm.reset();
            document.getElementById('event-id').value = '';
            document.getElementById('event-form-title').textContent = 'Add New Event';
        } else if (formId === 'member-form') {
            memberForm.reset();
            document.getElementById('member-id').value = '';
            document.getElementById('member-form-title').textContent = 'Add New Member';
        }
    }
    
    // Show admin dashboard
    function showAdminDashboard() {
        loginForm.style.display = 'none';
        adminDashboard.style.display = 'flex';
        // Ensure only dashboard visible initially
        switchSection('dashboard');
    }
    
    // Show login form
    function showLoginForm() {
        loginForm.style.display = 'flex';
        adminDashboard.style.display = 'none';
    }
    
    // Show notification
    function showNotification(message, type = 'info') {
        const container = document.getElementById('notification-container');
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span class="message">${message}</span>
        `;
        
        container.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                if (container.contains(notification)) {
                    container.removeChild(notification);
                }
            }, 500);
        }, 5000);
    }
});