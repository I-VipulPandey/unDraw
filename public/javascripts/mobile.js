
function isMobileOrTablet() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  
  window.onload = function () {
    if (isMobileOrTablet()) {
      // Hide the main content for mobile/tablet users and show a message.
      document.querySelector('.hidden-content').style.display = 'block';
      document.querySelector('.pc-only').style.display = 'none';
  
  
    }
  };