activeCards = {}


async function update_data() {
  fetch("data/list.json")
  .then(response => response.json())
  .then(dataDB => {
    data = dataDB;
    getCards();        
  })
  .catch(error => console.error("Error fetching data", error));
}

function getCards() {
  cards = []
  
  data.forEach(item => {
    cards.push(item)
    activeCards[item.id] = item
  });
  generateCards(cards)
}


function createCard(item) {
  // Get the template content
  const template = document.getElementById('card-template').content.cloneNode(true);
  
  // Fill in the template with data
  template.querySelector('.card').id = item.id;
  template.querySelector('.card-img').src = item.imageFront;
  template.querySelector('.card-name').textContent = item.name;
  template.querySelector('.url').href = item.purchase;
  template.querySelector('.card-note').textContent = item.note;
  
  special = [1, 3, 10, 11]
  if (special.includes(item.id) ) {
    template.querySelector(".card").classList.add("special")
  }

  return template;
}

function generateCards(db) {
  const container = document.getElementById('cards-container');
  container.innerHTML = "";
  db.forEach(item => {
    // console.log(item);
    const card = createCard(item);
    
    imgFt = card.querySelector(".card-img");
    imgBk = card.querySelector(".card-imgBk");
    
    card.querySelectorAll(".img-container, .card-img, .card-img-bk, .card, .name, .view-btns").forEach(element => {
      element.addEventListener("mouseup", function(event) {
        if(event.target === element) {
          Array.from(document.getElementsByClassName("card")).forEach(c => {
            c.style.border = "none";
            c.style.margin = "20px";
          })
          this.closest(".card").style.border = "1px solid white";
          this.closest(".card").style.margin = "19px";
        }
      })
    })
    
    container.appendChild(card);
  });
}

window.onload = update_data;

