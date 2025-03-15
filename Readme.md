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
    A platform connecting job seekers and employers in Malta. Sign up as an employer or employee. Full-stack application with robust security features.
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

#### Week 1 (Feb 11-12, 2025)
- Created initial project template and structure
- Implemented barebones backend and frontend logic
- Set up job management features with hooks
- Established data sanitization protocols

#### Week 2 (Feb 13-15, 2025)
- Implemented category logic and testing
- Added PostgreSQL database connection
- Enhanced API with category filtering
- Developed user model with employer/employee classes
- Implemented bcrypt password hashing
- Added email and phone handling
- Optimized database pool access

#### Week 3 (Feb 16-19, 2025)
- Fixed critical salary calculation bugs
- Implemented session control and authentication
- Enhanced job insertion logic with async handling
- Added comprehensive error handling
- Improved validation for job postings
- Enhanced employer role verification
- Added company name retrieval system

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
* [![Node.js][Node.js]][Node-url]
* [![Express.js][Express-url]]
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
5. Configure environment variables
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

This project is a full-stack application where both employers and employees can sign up and interact with the platform. Employers can post job listings, while job seekers can apply. The platform is secured with various features to ensure the safety and integrity of user data.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] User authentication (Sign up / Sign in) with Sessions
- [ ] Job listing and job search functionality
- [ ] Employer dashboard
- [ ] Employee job application feature
- [ ] Advanced security features
    - [ ] Secure job postings
    - [ ] Enhanced session management

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

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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
[license-shield]: https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge
[license-url]: https://github.com/ShadowOfHumanity/JobsInMalta---Tailwind/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/darian-baker-1402b2327/
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Tailwind-css]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
```
