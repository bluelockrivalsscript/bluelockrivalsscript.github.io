document.addEventListener('DOMContentLoaded', function () {
  // Navigation buttons
  const btnCodes = document.getElementById('btn-codes');
  const btnHowToUse = document.getElementById('btn-how-to-use');
  const btnAbout = document.getElementById('btn-about');
  const btnReview = document.getElementById('btn-review');
  const btnCodess = document.getElementById('btn-codess');

  // Sections
  const sectionCodes = document.getElementById('codes');
  const sectionHowToUse = document.getElementById('how-to-use');
  const sectionAbout = document.getElementById('about');
  const sectionReview = document.getElementById('review');

  const sectionCoess = document.getElementById('codess');
  const codeBlockBtns = document.querySelectorAll('.code-block button')


  codeBlockBtns.forEach(button => {
    button.addEventListener('click', () => {
      const text = button.getAttribute('data-code');
      copyTextToClipboard(text);
    });
  });

  // Helper function to show the chosen section and hide others
  function showSection(section) {
    document.querySelectorAll('.section').forEach(function (sec) {
      sec.classList.remove('active');
    });
    section.classList.add('active');
  }

  // Attach event listeners for navigation
  btnCodes.addEventListener('click', function () {
    showSection(sectionCodes);
  });

  btnHowToUse.addEventListener('click', function () {
    showSection(sectionHowToUse);
  });

  btnAbout.addEventListener('click', function () {
    showSection(sectionAbout);
  });

  btnReview.addEventListener('click', function () {
    showSection(sectionReview);
  });

  btnCodess.addEventListener('click', function () {
    showSection(sectionCoess);
  });

  // Copy button functionality
  const copyButtons = document.querySelectorAll('.copy-button');
  copyButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Find the nearest <pre> element inside the same .script-box
      const scriptBox = button.closest('.script-box');
      if (scriptBox) {
        const pre = scriptBox.querySelector('pre');
        if (pre) {
          const text = pre.textContent;
          copyTextToClipboard(text);
        }
      }
    });
  });

  // Function to copy text to the clipboard
  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(function () {
          alert('Script copied to clipboard!');
        })
        .catch(function (err) {
          fallbackCopyTextToClipboard(text);
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  }

  // Fallback for browsers that do not support navigator.clipboard
  function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    // Prevent scrolling to the bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Script copied to clipboard!');
      } else {
        alert('Failed to copy script.');
      }
    } catch (err) {
      alert('Failed to copy script.');
    }
    document.body.removeChild(textArea);
  }

  // Star rating functionality
  const stars = document.querySelectorAll('.star');
  let rating = 0;
  stars.forEach(function (star) {
    star.addEventListener('mouseover', function () {
      const currentValue = parseInt(star.getAttribute('data-value'));
      highlightStars(currentValue);
    });

    star.addEventListener('mouseout', function () {
      highlightStars(rating);
    });

    star.addEventListener('click', function () {
      rating = parseInt(star.getAttribute('data-value'));
      highlightStars(rating);
    });
  });

  function highlightStars(count) {
    stars.forEach(function (star) {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= count) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  // Review button functionality
  const submitReviewButton = document.getElementById('submitReview');
  if (submitReviewButton) {
    submitReviewButton.addEventListener('click', function () {
      if (rating > 0) {
        alert('Thank you for your ' + rating + '-star review!');
      } else {
        alert('Please select a rating before submitting.');
      }
    });
  }
});



