// Sample JSON data

filters = {
  "modes":[],
  "makes":[],
  "models":[],
  "designers":[]
}

activeCards = {}


async function update_data() {
  fetch("data/list.json")
    .then(response => response.json())
    .then(dataDB => {
      data = dataDB;
      getCars();        
    })
    .catch(error => console.error("Error fetching data", error));
}

function getCars() {
  cars = []

  data.forEach(item => {
    if(filters["makes"].length==0 && filters["models"].length==0) {
      cars.push(item)
      activeCards[item.id] = item
      // console.log("A");
    }

    // else if (and == [item.make, item.model, item.author]) { // ANDish behavior
    else if (and.some(r=>[item.make, item.model, item.designer].includes(r))) { // OR behavior
      cars.push(item)
      // console.log(item.name, and.some(r=>[item.make, item.model, item.designer].includes(r)));
    }

  });
    generateCards(cars)
}


function createCard(item) {
  // Get the template content
  const template = document.getElementById('card-template').content.cloneNode(true);
  
  // Fill in the template with data
  template.querySelector('.card').id = item.id;
  template.querySelector('.card-img').src = item.imageFront;
  template.querySelector('.card-name').textContent = item.name;
  template.querySelector('.url').href = item.purchase;

  special = [10295, 76934, 42196]
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
          update_info_col(this.closest(".card"))
      }
      })
    })
    
    container.appendChild(card);
  });
}

window.onload = update_data;
