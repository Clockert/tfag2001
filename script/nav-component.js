/**
 * @fileoverview Navigation component loader for Jimmy Halvardsson Mountain Guide website
 * This file handles loading and initializing the navigation component across pages
 * @author [Your Name]
 * @version 1.0.0
 */

/**
 * The navigation component HTML template
 * @type {string}
 */
const navigationTemplate = `
<header class="header">
    <nav class="navbar">
        <div class="navbar-left">
            <a href="index.html" class="logo">
                <img src="assets/logo/logo_icon.svg" alt="Jimmy Halvardsson Mountain Guide">
            </a>
            <div class="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="nav-links menu">
                <a href="about.html" data-nav-link="about">About</a>
                <a href="services.html" data-nav-link="services">Services</a>
                <a href="articles.html" data-nav-link="articles">Articles</a>
                <a href="contact.html" data-nav-link="contact">Contact</a>
                <!-- Mobile only button -->
                <a href="contact.html" class="btn btn-primary mobile-only-btn">Get in Touch</a>
            </div>
        </div>
        <div class="navbar-right">
            <a href="contact.html" class="btn btn-primary">Get in Touch</a>
        </div>
    </nav>
</header>
`;

/**
 * Loads the navigation component into the specified container
 * @param {string} containerId - The ID of the container element
 */
function loadNavigation(containerId = "navigation-container") {
  // Wait for DOM to be ready
  document.addEventListener("DOMContentLoaded", () => {
    // Get the container element
    const container = document.getElementById(containerId);

    if (container) {
      // Insert the navigation HTML
      container.innerHTML = navigationTemplate;

      // Initialize the navigation functionality
      initializeNavigation();
    } else {
      console.error(`Navigation container with ID "${containerId}" not found.`);
    }
  });
}

/**
 * Initialize all navigation functionality
 */
function initializeNavigation() {
  setupMobileMenu();
  highlightCurrentPage();
}

/**
 * Set up mobile menu toggle functionality
 */
function setupMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      this.classList.toggle("active");
      navLinks.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll(".nav-links a");
    links.forEach((link) => {
      link.addEventListener("click", function () {
        menuToggle.classList.remove("active");
        navLinks.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

/**
 * Highlight the current page in the navigation
 */
function highlightCurrentPage() {
  // Get current page from URL
  const currentPath = window.location.pathname;
  const pageName = currentPath.split("/").pop().split(".")[0];

  // Handle empty path or index
  const currentPage =
    pageName === "" || pageName === "index" ? "index" : pageName;

  // Find links and set active class
  const navLinks = document.querySelectorAll("[data-nav-link]");
  navLinks.forEach((link) => {
    // Get the navigation identifier
    const navIdentifier = link.getAttribute("data-nav-link");

    // Clear any existing active class
    link.classList.remove("active");

    // Set active class based on current page
    if (navIdentifier === currentPage) {
      link.classList.add("active");
    }
  });
}

// Automatically load the navigation when this script is included
loadNavigation();
