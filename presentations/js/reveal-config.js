// RevealJS Configuration for Cashscript Workshop
const revealConfig = {
    // Display presentation control arrows
    controls: true,
    
    // Help the user learn the controls by providing hints, for example by
    // bouncing the down arrow when they first encounter a vertical slide
    help: true,
    
    // Enable keyboard shortcuts for navigation
    keyboard: true,
    
    // Enable the slide overview mode
    overview: true,
    
    // Disable the default reveal.js slide layout (scaling and centering)
    // so that you can use custom CSS layout
    disableLayout: false,
    
    // Hides the address bar on mobile devices
    hideAddressBar: true,
    
    // Opens links in an iframe preview overlay
    // Add `data-preview-link` and `data-preview-link="false"` to customise this behaviour per link.
    previewLinks: false,
    
    // Transition style - Changed from 'slide' to 'fade' to eliminate dizzying effect
    transition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Transition speed
    transitionSpeed: 'fast', // default/fast/slow - Made faster for cleaner transitions
    
    // Transition style for full page slide backgrounds
    backgroundTransition: 'fade', // none/fade/slide/convex/concave/zoom
    
    // Number of slides away from the current that are visible
    viewDistance: 3,
    
    // Parallax background image
    parallaxBackgroundImage: '',
    
    // Parallax background size
    parallaxBackgroundSize: '',
    
    // Number of pixels to move the parallax background per slide
    // -1 means automatic, 0 means no movement
    // (set to 1 for a nice parallax effect)
    parallaxBackgroundHorizontal: null,
    
    // Number of pixels to move the parallax background per slide
    // -1 means automatic, 0 means no movement
    // (set to 1 for a nice parallax effect)
    parallaxBackgroundVertical: null,
    
    // The display mode that will be used to show slides
    display: 'block',
    
    // Hide cursor if inactive
    hideInactiveCursor: true,
    
    // Time before the cursor is hidden (in ms)
    hideCursorTime: 5000,
    
    // Plugins
    plugins: [
        // Add any additional plugins here
    ],
    
    // Custom keyboard shortcuts
    keyboard: {
        13: 'next', // Enter
        27: 'overview', // Escape
        32: 'next', // Space
        37: 'prev', // Left arrow
        38: 'prev', // Up arrow
        39: 'next', // Right arrow
        40: 'next', // Down arrow
        70: 'toggleFullscreen', // F
        72: 'prev', // H
        74: 'next', // J
        75: 'prev', // K
        76: 'next', // L
        78: 'next', // N
        80: 'prev', // P
        83: 'overview', // S
        84: 'toggleOverview', // T
        87: 'prev', // W
        89: 'prev', // Y
    },
    
    // Fix scaling issues
    width: 1200,
    height: 700,
    margin: 0.1,
    minScale: 0.2,
    maxScale: 1.5,
    
    // Center slides
    center: true,
    
    // Touch support
    touch: true,
    
    // Loop presentation
    loop: false,
    
    // RTL support
    rtl: false,
    
    // Navigation mode
    navigationMode: 'default',
    
    // Shuffle slides
    shuffle: false,
    
    // Fragments
    fragments: true,
    
    // Fragment in URL
    fragmentInURL: false,
    
    // Embedded presentation
    embedded: false,
    
    // Show notes
    showNotes: false,
    
    // Auto play media
    autoPlayMedia: null,
    
    // Preload iframes
    preloadIframes: null,
    
    // Auto slide
    autoSlide: 0,
    
    // Auto slide stoppable
    autoSlideStoppable: true,
    
    // Auto slide method
    autoSlideMethod: 'default',
    
    // Default timing
    defaultTiming: null,
    
    // Mouse wheel
    mouseWheel: false,
    
    // Hide inactive cursor
    hideInactiveCursor: true,
    
    // Hide cursor time
    hideCursorTime: 5000,
    
    // Preview links
    previewLinks: false,
    
    // Post message
    postMessage: true,
    
    // Post message events
    postMessageEvents: false,
    
    // Focus body on page visibility change
    focusBodyOnPageVisibilityChange: true,
    
    // View distance
    viewDistance: 3,
    
    // Display
    display: 'block',
    
    // Hide empty elements
    hideEmptyElements: true
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = revealConfig;
} 