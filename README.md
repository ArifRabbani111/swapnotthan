# Swapnotthan - Volunteer and Charity Organization

A comprehensive web platform for Swapnotthan, a leading volunteer organization based in Sylhet, Bangladesh. This project provides a modern, responsive website for managing events, team members, and community engagement.

## 🌟 About Swapnotthan

Founded in 2010, Swapnotthan began as a small group of SUST students wanting to make a difference. Today, it's Sylhet's leading volunteer organization with 200+ active members across three wings:

- **Blood Wing**: Organizing blood donation camps and awareness programs
- **Education Wing**: Supporting underprivileged students with educational resources
- **Relief Wing**: Providing emergency relief and support to communities in need

## 🚀 Features

### Frontend
- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Interactive Sections**: Home, Events, About Us, Team, and Contact
- **Dynamic Content**: Events and team members loaded from backend
- **Admin Panel**: Secure administrative interface for content management

### Backend
- **RESTful API**: Complete CRUD operations for events, members, and subscribers
- **Authentication System**: Secure admin login and session management
- **Database Integration**: MySQL database with optimized queries
- **File Management**: Support for image uploads and media handling

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Responsive CSS Grid and Flexbox
- Font Awesome icons
- Google Fonts (Poppins)

### Backend
- **Node.js** with Express.js framework
- **MySQL** database with mysql2 driver
- **CORS** enabled for cross-origin requests
- **dotenv** for environment configuration
- **nodemon** for development

## 📁 Project Structure

```
swapnotthan/
├── backend/
│   ├── config/          # Database and configuration files
│   ├── middleware/      # Custom middleware functions
│   ├── models/          # Database models and schemas
│   ├── routes/          # API route handlers
│   │   ├── admin.js     # Admin panel routes
│   │   ├── auth.js      # Authentication routes
│   │   ├── events.js    # Event management routes
│   │   ├── members.js   # Team member routes
│   │   └── subscribers.js # Newsletter subscription routes
│   ├── package.json     # Backend dependencies
│   ├── server.js        # Main server file
│   └── setup.sql        # Database schema and sample data
├── public/
│   ├── css/             # Stylesheets
│   ├── js/              # Frontend JavaScript
│   ├── admin.html       # Admin panel interface
│   └── index.html       # Main website
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd swapnotthan
   ```

2. **Set up the database**
   ```bash
   # Login to MySQL and run the setup script
   mysql -u your_username -p < backend/setup.sql
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin

## 🔧 Configuration

Create a `.env` file in the `backend/` directory with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=swapnotthan
JWT_SECRET=your_jwt_secret_key
```

## 📊 Database Schema

### Events Table
- `id`: Unique identifier
- `title`: Event title
- `date`: Event date
- `location`: Event location
- `description`: Event details
- `image_url`: Event image
- `created_at`: Creation timestamp

### Members Table
- `id`: Unique identifier
- `name`: Member name
- `position`: Role/position
- `image_url`: Profile picture
- `facebook_url`: Social media links
- `linkedin_url`: Professional profile
- `created_at`: Creation timestamp

### Subscribers Table
- `id`: Unique identifier
- `email`: Subscriber email
- `created_at`: Subscription timestamp

## 🎯 API Endpoints

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Members
- `GET /api/members` - Get all team members
- `POST /api/members` - Add new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Remove member

### Subscribers
- `POST /api/subscribers` - Add newsletter subscriber
- `GET /api/subscribers` - Get all subscribers

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout





## 🙏 Acknowledgments


**Made with ❤️ for the community by Arif Rabbani** 
