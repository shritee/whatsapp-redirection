// WhatsApp link configuration
const WHATSAPP_LINK = 'https://wa.me/917494868984';

// DOM elements
const modalOverlay = document.getElementById('modal-overlay');
const okBtn = document.getElementById('ok-btn');
const cancelBtn = document.getElementById('cancel-btn');
const loading = document.getElementById('loading');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Show the modal immediately when page loads
    showModal();
    
    // Add event listeners
    setupEventListeners();
    
    // Optional: Auto-redirect after a delay (uncomment if needed)
    // setTimeout(() => {
    //     redirectToWhatsApp();
    // }, 3000); // Auto-redirect after 3 seconds
});

// Setup event listeners
function setupEventListeners() {
    // OK button click
    okBtn.addEventListener('click', function() {
        redirectToWhatsApp();
    });
    
    // Cancel button click
    cancelBtn.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Handle keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            redirectToWhatsApp();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Handle browser back button
    window.addEventListener('popstate', function() {
        showModal();
    });
}

// Show modal function
function showModal() {
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Focus on OK button for accessibility
    setTimeout(() => {
        okBtn.focus();
    }, 300);
}

// Close modal function
function closeModal() {
    modalOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Optional: Show a goodbye message or redirect to another page
    showThankYouMessage();
}

// Redirect to WhatsApp function
function redirectToWhatsApp() {
    // Show loading screen
    showLoading();
    
    // Add a small delay for better user experience
    setTimeout(() => {
        try {
            // Try to open WhatsApp
            window.open(WHATSAPP_LINK, '_blank');
            
            // Close the current window/tab after a short delay
            setTimeout(() => {
                // For mobile devices, try to close the tab
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    // If can't go back, show success message
                    showSuccessMessage();
                }
            }, 1000);
            
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            showErrorMessage();
        }
    }, 1500); // 1.5 second delay
}

// Show loading screen
function showLoading() {
    loading.classList.remove('hidden');
    modalOverlay.style.display = 'none';
}

// Hide loading screen
function hideLoading() {
    loading.classList.add('hidden');
}

// Show success message
function showSuccessMessage() {
    hideLoading();
    
    const successHtml = `
        <div class="modal-overlay" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #28a745, #20B358);">
                    <div class="whatsapp-icon">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </div>
                    <h2>Success!</h2>
                </div>
                <div class="modal-body">
                    <p>WhatsApp should now be opening in a new tab.</p>
                    <p>If it doesn't open automatically, you can <a href="${WHATSAPP_LINK}" target="_blank" style="color: #25D366; text-decoration: none; font-weight: 600;">click here</a>.</p>
                </div>
                <div class="modal-footer">
                    <button onclick="location.reload()" class="btn btn-ok">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successHtml);
}

// Show error message
function showErrorMessage() {
    hideLoading();
    
    const errorHtml = `
        <div class="modal-overlay" style="display: flex;">
            <div class="modal-content">
                <div class="modal-header" style="background: linear-gradient(135deg, #dc3545, #c82333);">
                    <div class="whatsapp-icon">
                        <svg width="50" height="50" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                    </div>
                    <h2>Error</h2>
                </div>
                <div class="modal-body">
                    <p>There was an error opening WhatsApp.</p>
                    <p>Please try opening this link manually: <a href="${WHATSAPP_LINK}" target="_blank" style="color: #dc3545; text-decoration: none; font-weight: 600;">${WHATSAPP_LINK}</a></p>
                </div>
                <div class="modal-footer">
                    <button onclick="location.reload()" class="btn btn-cancel">Try Again</button>
                    <button onclick="window.open('${WHATSAPP_LINK}', '_blank')" class="btn btn-ok">Open Link</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', errorHtml);
}

// Show thank you message when user cancels
function showThankYouMessage() {
    const thankYouHtml = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 3000;
            max-width: 300px;
            width: 90%;
        ">
            <h3 style="color: #333; margin-bottom: 15px;">Thanks for visiting!</h3>
            <p style="color: #666; margin-bottom: 20px;">You can always reach out via WhatsApp anytime.</p>
            <button onclick="this.parentElement.remove()" style="
                background: #25D366;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 20px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
    `;
    
    setTimeout(() => {
        document.body.insertAdjacentHTML('beforeend', thankYouHtml);
    }, 500);
}

// Additional utility functions

// Check if user is on mobile device
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Format phone number for display
function formatPhoneNumber(phoneNumber) {
    // Remove country code and format
    const number = phoneNumber.replace('91', '');
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`;
}

// Analytics tracking (optional)
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking here
    console.log('Event tracked:', eventName, properties);
    
    // Example for Google Analytics
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Track when modal is shown
document.addEventListener('DOMContentLoaded', function() {
    trackEvent('modal_shown', {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        is_mobile: isMobileDevice()
    });
});

// Track when user clicks OK
okBtn?.addEventListener('click', function() {
    trackEvent('whatsapp_redirect', {
        timestamp: new Date().toISOString(),
        phone_number: WHATSAPP_LINK
    });
});

// Track when user cancels
cancelBtn?.addEventListener('click', function() {
    trackEvent('redirect_cancelled', {
        timestamp: new Date().toISOString()
    });
});