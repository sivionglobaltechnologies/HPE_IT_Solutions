# HPE IT Solutions

A modern, responsive web application for HPE IT Solutions, showcasing enterprise IT services, infrastructure solutions, workforce management, and project portfolios.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Maps**: Location-based contact information using Leaflet
- **Dynamic Animations**: Smooth transitions with Framer Motion
- **Contact Management**: Backend API for handling contact form submissions
- **Admin Dashboard**: Administrative interface for managing content
- **Project Showcase**: Portfolio of completed IT projects and solutions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Framer Motion** - Animation library
- **Leaflet** - Interactive maps
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Lightweight Python web framework
- **MongoDB Atlas** - Cloud database for data storage
- **Flask-CORS** - Cross-origin resource sharing
- **Flasgger** - API documentation

## 📋 Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB Atlas account (for database)

## 🏃‍♂️ Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── index.html          # Backend template
├── frontend/
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context providers
│   │   ├── data/           # Static data files
│   │   └── projects/       # Project data
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `python app.py` - Start Flask development server

## 🌐 API Endpoints

- `GET /api/contacts/all` - Retrieve all contact submissions
- `POST /api/contacts` - Submit new contact form
- `GET /` - Serve homepage

## � Environment Variables

### Backend
Create a `.env` file in the `backend/` directory:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app_name>
FLASK_ENV=development
```

### Frontend
No specific `.env` file required for basic setup. API calls use `http://localhost:5000` in development.

## 🚀 Deployment

### Vercel Deployment (Frontend)

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel automatically detects Vite configuration
4. Deploy settings:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

The `postinstall` script in `package.json` automatically sets executable permissions for build tools.

### Heroku/Railway Deployment (Backend)

1. Deploy the `backend/` directory
2. Set environment variables in deployment platform
3. Ensure MongoDB connection string is configured

## 🐛 Troubleshooting

### Vercel Build Errors
- **Permission Denied Error**: The `postinstall` script in `package.json` automatically fixes this
- **Peer Dependency Conflicts**: Removed incompatible packages (react-simple-maps, topojson-client, world-atlas)

### Local Development Issues
- **Port Already in Use**: Change port in `vite.config.js` (frontend) or `app.py` (backend)
- **MongoDB Connection Failed**: Verify `MONGO_URI` and network access in MongoDB Atlas
- **CORS Issues**: Ensure backend is running and Flask-CORS is configured

## 📦 Dependencies

### Removed Packages
The following packages were removed due to React 18 compatibility:
- `react-simple-maps` (only supports React 16)
- `topojson-client` (dependency of react-simple-maps)
- `world-atlas` (dependency of react-simple-maps)

Use `react-leaflet` for interactive map functionality.

## �📧 Contact

For questions or support, please use the contact form on the website or reach out to the development team.

## 📄 License

This project is proprietary to HPE IT Solutions.
