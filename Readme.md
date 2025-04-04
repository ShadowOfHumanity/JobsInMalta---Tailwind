<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">JobsForMalta</h3>

  <p align="center">
    A modern job board platform connecting job seekers and employers in Malta with robust security features and intuitive user experience.
    <br />
    <a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind">View Demo</a>
    &middot;
    <a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#development-timeline">Development Timeline</a></li>
        <li><a href="#current-features">Current Features</a></li>
        <li><a href="#technical-implementation">Technical Implementation</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This repository documents my journey in creating JobsForMalta, a platform designed to connect job seekers and employers in Malta. The project demonstrates a systematic approach to building a full-stack application with robust security and user management features.

### Development Timeline

#### Phase 1: Initial Setup (Feb 11-13, 2025)
- Created project template and structure
- Implemented barebones backend and frontend logic
- Set up job management features with hooks and data sanitization
- Implemented category logic and testing
- Enhanced API with category filtering
- Added PostgreSQL database connection

#### Phase 2: User Management & Authentication (Feb 14-16, 2025) 
- Implemented user model with employer/employee classes
- Added password hashing with bcrypt
- Added email and phone handling
- Fixed database errors and major salary calculation bugs
- Implemented user registration endpoints with validation

#### Phase 3: Session Management & Error Handling (Feb 17-20, 2025)
- Implemented session control and authentication
- Enhanced job insertion logic with async handling
- Added comprehensive error handling
- Improved validation for job postings
- Enhanced employer role verification
- Added company name retrieval system
- Implemented user editing functionality

#### Phase 4: API Structure & Routes (Feb 22-28, 2025)
- Separated concerns with Routes and Controllers
- Fixed AddJob in frontend to include JobPromise
- Added proper routing for endpoints
- Added initial UI components

#### Phase 5: UI Development & Refinement (Mar 1-20, 2025)
- Improved mobile support and search bar filtering
- Added Tailwind CSS for styling (replaced Bootstrap)
- Implemented Login page and authentication components
- Added TitleLogo component and updated dependencies
- Refactored login and search pages
- Refactored routing and component imports
- Implemented new registration pages

#### Phase 6: Authentication Enhancement & User Experience (Mar 21-27, 2025)
- Improved internationalization with country code support for phone numbers
- Enhanced password validation and sanitization
- Added loading indicators with GeneralSpinner component
- Refactored authentication logic to use hooks instead of global state
- Implemented useAuth and useAuthSession hooks for better session management
- Added user profile management with ProfileCircle component
- Enhanced dark mode toggle functionality
- Created employer job posting page (PostPg)
- Improved user role-based navigation
- Optimized authentication flows with better error handling

### Current Features
- User authentication with session management
- Separate employer and employee registration flows
- Job posting system with validation
- Category-based job filtering
- Secure password handling with bcrypt
- Database connection pooling
- Input sanitization and validation
- Error handling and logging
- Modern UI with Tailwind CSS
- Dark/Light mode support
- Responsive design across all devices
- Interactive job cards with animations
- Advanced search functionality with filters
- Type-safe frontend with TypeScript

### Technical Implementation
- **Database**: PostgreSQL with connection pooling
- **Authentication**: 
  - Session-based authentication
  - Express-session for session management
  - Role-based access control (Employee/Employer)
- **Frontend**:
  - React 19 with TypeScript
  - Tailwind CSS for styling
  - Custom hooks for data fetching
  - Responsive component architecture
  - Dark mode support
  - Modern UI animations
- **Security**: 
  - Password hashing with bcrypt
  - Input sanitization
  - Session-based user tracking
- **API Endpoints**:
  - User registration and session management
  - Job posting and management
  - Category filtering
  - Company information handling

### Built With

* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Node.js][Node.js]][Node-url]
* [![Express.js][Express-shield]][Express-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]
* [![Tailwind CSS][Tailwind-css]][Tailwind-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy of the project up and running, follow these steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* PostgreSQL 14 or later
* Node.js 18 or later

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind.git
   ```
2. Install backend dependencies
   ```sh
   cd BackEnd
   npm install
   ```
3. Install frontend dependencies
   ```sh
   cd ../FrontEnd/JobsInMalta
   npm install
   ```
4. Set up PostgreSQL database and update connection settings
   ```sh
   # Create a database named jobsformalta
   # Update db.js with your PostgreSQL credentials
   ```
5. Configure environment variables
   ```sh
   # Create .env in BackEnd directory with:
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=youruser
   DB_PASSWORD=yourpassword
   DB_NAME=jobsformalta
   SESSION_SECRET=your_session_secret

   # Create .env in FrontEnd/JobsInMalta with:
   VITE_API_URL=http://localhost:3001
   ```
6. Start the backend server
   ```sh
   cd ../../BackEnd
   npm start
   ```
7. Start the frontend development server
   ```sh
   cd ../FrontEnd/JobsInMalta
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

This project is a full-stack application where both employers and employees can sign up and interact with the platform. The platform offers:

### For Employers
- Register and create a company profile
- Post job listings with detailed descriptions and requirements
- Filter and manage applicants
- Edit and update job listings

### For Job Seekers
- Create a personal profile with professional details
- Browse available jobs with advanced filtering
- Apply to positions directly through the platform
- Track application status

The platform is secured with various features to ensure the safety and integrity of user data, including input sanitization, secure session management, and password hashing.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

### Completed
- [x] User authentication (Sign up / Sign in) with Sessions
- [x] Modern UI with Tailwind CSS
- [x] Dark/Light mode support
- [x] Job search with filters
- [x] Mobile-responsive design
- [x] User profile management
- [x] Employer job posting interface
- [x] Fixed email handling in login & registration forms (automatic lowercase conversion)
- [x] Enhanced employer registration process
- [x] Optimized authentication hooks for better performance
- [x] Fixed login functionality and error handling

### In Progress
- [ ] Remove "skills" and "experience_years" fields from database (Education has its own table linked with user_id)
- [ ] Job applications system
- [ ] Employer dashboard
- [ ] Advanced security features
    - [x] Password validation and sanitization
    - [x] Enhanced session management
    - [ ] Cross-site request forgery protection

### Upcoming (Q2 2025)
- [ ] Email notifications
- [ ] Recommendation system
- [ ] Analytics dashboard
- [ ] Resume builder for job seekers
- [ ] Chat system for employers and candidates
- [ ] Application tracking system
- [ ] Interview scheduling tool

See the [open issues](https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are welcome! If you'd like to make changes to the project, feel free to fork it and create a pull request. You can also open an issue if you have suggestions.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ShadowOfHumanity/JobsInMalta---Tailwind" alt="contrib.rocks image" />
</a>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Darian Baker Bray - [@ShadowOfHumanity](https://twitter.com/ShadowOfHumanity) - Darianbakerbray@gmail.com

Project Link: [https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind](https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind)

LinkedIn: [Darian Baker](https://www.linkedin.com/in/darian-baker-1402b2327/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [React Icons](https://react-icons.github.io/react-icons/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [Express.js Documentation](https://expressjs.com/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TODOs and Future Improvements -->
## TODOs and Future Improvements

1. TODO: SEND DATA FROM USER-DETAILS PAGE TO SERVER
   - Implement functionality to send form data from ExtraDetailsPg.tsx to the backend API
   - Create appropriate endpoint on the server to handle and store profile details
   - Add validation and error handling for the profile data submission

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ShadowOfHumanity/JobsInMalta---Tailwind.svg?style=for-the-badge
[contributors-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ShadowOfHumanity/JobsInMalta---Tailwind.svg?style=for-the-badge
[forks-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/network/members
[stars-shield]: https://img.shields.io/github/stars/ShadowOfHumanity/JobsInMalta---Tailwind.svg?style=for-the-badge
[stars-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/stargazers
[issues-shield]: https://img.shields.io/github/issues/ShadowOfHumanity/JobsInMalta---Tailwind.svg?style=for-the-badge
[issues-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/issues
[license-shield]: https://img.shields.io/github/license/ShadowOfHumanity/JobsInMalta---Tailwind.svg?style=for-the-badge
[license-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/darian-baker-1402b2327/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express-shield]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Tailwind-css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[TypeScript]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
