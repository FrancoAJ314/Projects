paper = 1

document.getElementById("gift").addEventListener("click", function() {
    img = document.getElementById("giftImg")

    if (paper == 1) {
        img.src = "media/Paper2.webp"
        paper +=1
    }
    else if (paper == 2) {
        img.src = "media/Paper3.webp"
        paper +=1
    }
    else if (paper == 3) {
        img.src = "media/Paper4.webp"
        paper +=1
    }
    else if (paper == 4) {
        img.src = "media/Paper5.webp"
        paper +=1
    }
        
})