const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

//  Store color theme for future visits

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark"); //add this
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light"); //add this
  }
}

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

// Calendly Enhanced Integration
function openCalendly(e) {
  e.preventDefault();

  // Check if Calendly is loaded
  if (typeof Calendly === 'undefined') {
    console.error('Calendly script not loaded');
    // Fallback: open in new tab
    window.open('https://calendly.com/ahmedbhs123/new-meeting-1', '_blank');
    return;
  }

  // Advanced popup options
  Calendly.initPopupWidget({
    url: 'https://calendly.com/ahmedbhs123/new-meeting-1',

    // Prefill information from URL params or form
    prefill: {
      // Will be populated if user comes from a form or URL params
      name: getUrlParameter('name') || '',
      email: getUrlParameter('email') || '',
      customAnswers: {
        a1: getUrlParameter('company') || '', // Question 1: Company name
      }
    },

    // UTM parameters for tracking
    utm: {
      utmSource: 'portfolio',
      utmMedium: 'website',
      utmCampaign: 'cta_booking',
      utmContent: window.location.pathname
    }
  });

  // Track event (Google Analytics, Mixpanel, etc.)
  if (typeof gtag !== 'undefined') {
    gtag('event', 'calendly_open', {
      'event_category': 'engagement',
      'event_label': 'Calendly Popup Opened'
    });
  }

  return false;
}

// Helper function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Attach event listeners to all Calendly buttons
document.addEventListener('DOMContentLoaded', function() {
  const calendlyButtons = document.querySelectorAll('[data-calendly]');

  calendlyButtons.forEach(button => {
    button.addEventListener('click', openCalendly);
  });

  // Listen for Calendly events
  window.addEventListener('message', function(e) {
    if (e.data.event && e.data.event.indexOf('calendly') === 0) {

      // Event scheduled
      if (e.data.event === 'calendly.event_scheduled') {
        console.log('Calendly event scheduled:', e.data.payload);

        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'conversion', {
            'send_to': 'YOUR_CONVERSION_ID', // Replace with your GA conversion ID
            'event_category': 'calendly',
            'event_label': 'Meeting Scheduled'
          });
        }

        // Optional: Show thank you message
        // alert('Merci ! Votre rendez-vous est confirmé. À bientôt !');
      }

      // Event type viewed
      if (e.data.event === 'calendly.event_type_viewed') {
        console.log('Calendly popup opened');
      }

      // Date and time selected
      if (e.data.event === 'calendly.date_and_time_selected') {
        console.log('Date selected:', e.data.payload);
      }
    }
  });
});
