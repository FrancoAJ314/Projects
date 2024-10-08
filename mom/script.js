(function() {

    var toggleBtn = document.querySelector('.toggle-btn'),
        flipContainer = document.querySelector('.flip-container');
  
      // Click on toggle-btn -> init map
      toggleBtn.addEventListener('click', function() {
          flipContainer.classList.toggle('hover');
      });
    
    
    // some default animations for codepen-preview ;)
    window.setTimeout(function() {
      flipContainer.classList.toggle('hover');
       window.setTimeout(function() {
         flipContainer.classList.toggle('hover');
       }, 1200);
    }, 500);
    
  
  })();