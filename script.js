// Function to enable smooth scrolling
// Hero Section To Contact Animation Script
function smoothScroll(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Update the current year in the footer
document.getElementById("currentYear").textContent = new Date().getFullYear();
