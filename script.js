 // Load image list from a JSON file
 fetch('media.json')
 .then(response => response.json())
 .then(images => {
     const picturesDiv = document.getElementById('cards-container');

     images.reverse()
     // Generate and add image elements
     images.forEach(image => {
         const img = document.createElement('img');
         img.src = `media/launches/${image}`;
         img.alt = image;

         const card = document.createElement("div")
         card.classList.add("card")
         card.appendChild(img)

         picturesDiv.appendChild(card);
     });
 })
 .catch(error => console.error('Error loading images:', error));