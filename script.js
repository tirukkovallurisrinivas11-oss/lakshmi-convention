/* ==========================================================================
   LAKSHMI CONVENTION & RCC HOTELS - JAVASCRIPT LOGIC
   Interactive Calculator, Lightbox, Dynamic Booking & Filters
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDatePickers();
  initMobileNav();
  initScrollSpy();
});

// Set minimum date to tomorrow for date pickers
function initDatePickers() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const heroDate = document.getElementById('heroDate');
  const modalDate = document.getElementById('modalDate');

  if (heroDate) heroDate.min = minDateStr;
  if (modalDate) modalDate.min = minDateStr;
}

/* ==========================================================================
   GALLERY FILTER TABS
   ========================================================================== */
function filterGallery(category, button) {
  const buttons = document.querySelectorAll('.gallery-filter-bar .filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  const items = document.querySelectorAll('#galleryGrid .gallery-item');
  items.forEach(item => {
    if (category === 'all' || item.dataset.category === category) {
      item.style.display = 'block';
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, 50);
    } else {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.95)';
      setTimeout(() => {
        item.style.display = 'none';
      }, 250);
    }
  });
}

/* ==========================================================================
   LIGHTBOX MODAL
   ========================================================================== */
function openLightbox(imageSrc, captionText) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (modal && img) {
    img.src = imageSrc;
    if (caption) caption.innerText = captionText || 'Lakshmi Convention & RCC Hotels';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(e) {
  if (e.target.id === 'lightboxModal') {
    closeLightboxDirect();
  }
}

function closeLightboxDirect() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   BOOKING / VISIT MODAL
   ========================================================================== */
function openBookingModal(subject = 'Schedule Venue Visit') {
  const modal = document.getElementById('bookingModal');
  const subtitle = document.getElementById('modalSubtitle');
  if (subtitle) subtitle.innerText = subject;
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeBookingModal(e) {
  if (e.target.id === 'bookingModal') {
    closeBookingModalDirect();
  }
}

function closeBookingModalDirect() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightboxDirect();
    closeBookingModalDirect();
  }
});

/* ==========================================================================
   FORM SUBMISSIONS VIA WHATSAPP AUTOMATION
   ========================================================================== */
function handleQuickInquiry(e) {
  e.preventDefault();
  const name = document.getElementById('heroName').value;
  const phone = document.getElementById('heroPhone').value;
  const date = document.getElementById('heroDate').value;
  const eventType = document.getElementById('heroEventType').value;
  const guests = document.getElementById('heroGuests').value;

  let text = `*New Date Availability Request*%0A`;
  text += `*Name:* ${name}%0A`;
  text += `*Phone:* ${phone}%0A`;
  text += `*Target Date:* ${date}%0A`;
  text += `*Event Type:* ${eventType}%0A`;
  text += `*Guest Count:* ${guests}%0A%0A`;
  text += `Hello Lakshmi Convention desk, please let me know if this date is available for booking.`;

  window.open(`https://wa.me/919100078888?text=${text}`, '_blank');
}

function handleModalSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('modalName').value;
  const phone = document.getElementById('modalPhone').value;
  const date = document.getElementById('modalDate').value;
  const eventType = document.getElementById('modalEventType').value;
  const guests = document.getElementById('modalGuests').value;
  const notes = document.getElementById('modalNotes').value;

  let text = `*Venue Visit & Booking Reservation Inquiry*%0A`;
  text += `*Name:* ${name}%0A`;
  text += `*Phone:* ${phone}%0A`;
  text += `*Preferred Date:* ${date}%0A`;
  text += `*Occasion:* ${eventType}%0A`;
  text += `*Estimated Guests:* ${guests}%0A`;
  if (notes.trim()) {
    text += `*Notes:* ${notes}%0A`;
  }
  text += `%0APlease confirm appointment with venue manager.`;

  window.open(`https://wa.me/919100078888?text=${text}`, '_blank');
  closeBookingModalDirect();
}

/* ==========================================================================
   GOOGLE REVIEWS TOPICS FILTER
   ========================================================================== */
function filterReviews(topic, button) {
  const buttons = document.querySelectorAll('.review-topics-bar .topic-pill');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (button) button.classList.add('active');

  const cards = document.querySelectorAll('#reviewsGrid .review-card');
  cards.forEach(card => {
    const topics = (card.dataset.topics || '').split(' ');
    if (topic === 'all' || topics.includes(topic)) {
      card.style.display = 'flex';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 30);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px) scale(0.98)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 200);
    }
  });
}

