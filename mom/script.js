// document.getElementById("card").addEventListener("click", flip)

// function flip() {
//     card = document.getElementById("card")
//     // for (let i = 0; i < 100; i+=0.001) {
//         //     card.transform = "rotateY("+i+"deg)"
//         //     // card.style.transform = "rotateY(100deg)"
//         //     console.log("rotateY("+i+"deg)");
//         // }
        
        
//     img = document.getElementById("img")
//     if (img.alt != "bk"){
//         card.style.transform = "rotateY(90deg)"
//         img.src = "media/CardInside.webp"
//         img.alt = "bk"
//         card.style.transform = "rotateY(180deg)"
//     }
//     else {
//         document.getElementById("img").src = "media/CardOutside.webp"
//         img.alt = "ft"
//         card.style.transform = "rotateY(0deg)"
//     }
    
    
// }

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

