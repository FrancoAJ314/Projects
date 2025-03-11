const canvas = document.getElementById("paper");
const ctx = canvas.getContext("2d");

// Set proper canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function parseCSV(csv) {
    const [header, ...rows] = csv.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));

    return rows.map(row =>
        Object.fromEntries(header.map((h, i) => [h.trim(), isNaN(row[i]) ? row[i] : Number(row[i])]))
    );
}


function makeOrbit(body) {    
    orbit = bodies[body]
    ctx.beginPath();
    ctx.arc(orbit["orbitCenterX"], orbit["orbitCenterY"], orbit["orbitRadius"], 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(128,128,128,0.5";
    ctx.stroke();
    ctx.closePath();
}
function makeBody(body) {
    body = bodies[body]
    ctx.beginPath();
    ctx.arc(body["centerX"], body["centerY"], body["radius"], 0, Math.PI * 2);
    // ctx.fillStyle = body["color"];
    ctx.fillStyle = "black";
    ctx.strokeStyle = body["color"];
    ctx.fill();
    ctx.lineWidth = canvas.height/200;      
    ctx.stroke();
    ctx.closePath();
}
function makePath(body) {
    body = bodies[body]
    ctx.beginPath();
    ctx.arc(body["centerX"], body["centerY"], body["radius"], 0, Math.PI * 2);
    // ctx.fillStyle = body["color"];
    ctx.fillStyle = "rgba(128,128,128,.15";
    ctx.fill();
    ctx.closePath();
}
let startTime = new Date().getTime()
day = 0
function drawOrbits() {
    scaleOrbit = 30000/window.innerHeight*2
    scalePlanet = 10000/window.innerHeight*25
    currentTime = new Date().getTime()
    elapsedTime = (currentTime-startTime)/50*1
    startTime = currentTime
    day = day + elapsedTime
    if (day >= 7300-30) {day = 1}
    dayInt = parseInt(day)
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    trailLen = 60
    dayInt += trailLen
    for (i = trailLen; i >= 1; i--) {
        dayInt -=1
        // scalePlanet = 10000/window.innerHeight*25 * (trailLen/(i))
        // scalePlanet = 10000/window.innerHeight*25 * (trailLen/(i**0.5*(trailLen**.5)))
        scalePlanet = 10000/window.innerHeight*25 * (trailLen/(i**2/trailLen))
        // console.log(i, (i/trailLen));
        
        
        bodies = {
            sun:{
                centerX: canvas.width / 2,
                centerY: canvas.height / 2,
                radius: 695700/scalePlanet/100,
                color: "yellow"
            },
            mercury:{
                centerX: (canvas.width / 2) + (timeline[dayInt]["mercuryX"]/scaleOrbit*10),
                centerY: (canvas.height / 2) + (timeline[dayInt]["mercuryY"]/scaleOrbit*10),
                // centerX: (canvas.width / 2) + (timeline[dayInt][0]/scaleOrbit*10),
                // centerY: (canvas.height / 2) + (timeline[dayInt][1]/scaleOrbit*10),
                radius: 2439.7/scalePlanet,
                color: "brown",
                orbitCenterX: (canvas.width / 2)+(-280/scaleOrbit),
                orbitCenterY: (canvas.height / 2)+(-1150/scaleOrbit),
                orbitRadius: 5700/scaleOrbit
            },
            venus:{
                centerX: (canvas.width / 2) + (timeline[dayInt]["venusX"]/scaleOrbit*10),
                centerY: (canvas.height / 2) + (timeline[dayInt]["venusY"]/scaleOrbit*10),
                radius: 6051.8/scalePlanet,
                color: "tan",
                orbitCenterX: (canvas.width / 2)+(30/scaleOrbit),
                orbitCenterY: (canvas.height / 2)+(-37/scaleOrbit),
                orbitRadius: 10800/scaleOrbit
            },
            earth:{
                centerX: (canvas.width / 2) + (timeline[dayInt]["earthX"]/scaleOrbit*10),
                centerY: (canvas.height / 2) + (timeline[dayInt]["earthY"]/scaleOrbit*10),
                radius: 6371.0/scalePlanet,
                color: "blue",
                orbitCenterX: (canvas.width / 2)+(100/scaleOrbit),
                orbitCenterY: (canvas.height / 2)+(-230/scaleOrbit),
                orbitRadius: 15000/scaleOrbit
            },
            moon:{
                centerX: (canvas.width / 2) + ((timeline[dayInt]["moonX"]+timeline[dayInt]["earthX"])/scaleOrbit*10),
                centerY: (canvas.height / 2) + ((timeline[dayInt]["moonY"]+timeline[dayInt]["earthY"])/scaleOrbit*10),
                radius: 1737.4/scalePlanet,
                color: "gray"//,
                // orbitCenterX: ,
                // orbitCenterY: ,
                // orbitRadius: 
            },
            mars:{
                centerX: (canvas.width / 2) + (timeline[dayInt]["marsX"]/scaleOrbit*10),
                centerY: (canvas.height / 2) + (timeline[dayInt]["marsY"]/scaleOrbit*10),
                radius: 3389.5/scalePlanet,
                color: "orange",
                orbitCenterX: (canvas.width / 2)+(-2020/scaleOrbit),
                orbitCenterY: (canvas.height / 2)+(910/scaleOrbit),
                orbitRadius: 22710/scaleOrbit
            },
            phobos:{
                centerX: (canvas.width / 2) + (((timeline[dayInt]["phobosX"]*1)+timeline[dayInt]["marsX"])/scaleOrbit*10),
                centerY: (canvas.height / 2) + (((timeline[dayInt]["phobosY"]*1)+timeline[dayInt]["marsY"])/scaleOrbit*10),
                radius: 11.08/scalePlanet*100,
                color: "gray"//,
                // orbitCenterX: ,
                // orbitCenterY: ,
                // orbitRadius: 
            },
            deimos:{
                centerX: (canvas.width / 2) + (((timeline[dayInt]["deimosX"]*1)+timeline[dayInt]["marsX"])/scaleOrbit*10),
                centerY: (canvas.height / 2) + (((timeline[dayInt]["deimosY"]*1)+timeline[dayInt]["marsY"])/scaleOrbit*10),
                radius: 6.27/scalePlanet*100,
                color: "gray"//,
                // orbitCenterX: ,
                // orbitCenterY: ,
                // orbitRadius: 
            }
        }
        
        // planets
        makePath("mercury")
        makePath("venus")
        makePath("earth")
        makePath("moon")
        makePath("mars")
        makePath("phobos")
        makePath("deimos")    
    }
    
    scalePlanet = 10000/window.innerHeight*25
    dayInt += trailLen
    bodies = {
        sun:{
            centerX: canvas.width / 2,
            centerY: canvas.height / 2,
            radius: 695700/scalePlanet/100,
            color: "yellow"
        },
        mercury:{
            centerX: (canvas.width / 2) + (timeline[dayInt]["mercuryX"]/scaleOrbit*10),
            centerY: (canvas.height / 2) + (timeline[dayInt]["mercuryY"]/scaleOrbit*10),
            // centerX: (canvas.width / 2) + (timeline[dayInt][0]/scaleOrbit*10),
            // centerY: (canvas.height / 2) + (timeline[dayInt][1]/scaleOrbit*10),
            radius: 2439.7/scalePlanet,
            color: "brown",
            orbitCenterX: (canvas.width / 2)+(-280/scaleOrbit),
            orbitCenterY: (canvas.height / 2)+(-1150/scaleOrbit),
            orbitRadius: 5700/scaleOrbit
        },
        venus:{
            centerX: (canvas.width / 2) + (timeline[dayInt]["venusX"]/scaleOrbit*10),
            centerY: (canvas.height / 2) + (timeline[dayInt]["venusY"]/scaleOrbit*10),
            radius: 6051.8/scalePlanet,
            color: "tan",
            orbitCenterX: (canvas.width / 2)+(30/scaleOrbit),
            orbitCenterY: (canvas.height / 2)+(-37/scaleOrbit),
            orbitRadius: 10800/scaleOrbit
        },
        earth:{
            centerX: (canvas.width / 2) + (timeline[dayInt]["earthX"]/scaleOrbit*10),
            centerY: (canvas.height / 2) + (timeline[dayInt]["earthY"]/scaleOrbit*10),
            radius: 6371.0/scalePlanet,
            color: "blue",
            orbitCenterX: (canvas.width / 2)+(100/scaleOrbit),
            orbitCenterY: (canvas.height / 2)+(-230/scaleOrbit),
            orbitRadius: 15000/scaleOrbit
        },
        moon:{
            centerX: (canvas.width / 2) + ((timeline[dayInt]["moonX"]+timeline[dayInt]["earthX"])/scaleOrbit*10),
            centerY: (canvas.height / 2) + ((timeline[dayInt]["moonY"]+timeline[dayInt]["earthY"])/scaleOrbit*10),
            radius: 1737.4/scalePlanet,
            color: "gray"//,
            // orbitCenterX: ,
            // orbitCenterY: ,
            // orbitRadius: 
        },
        mars:{
            centerX: (canvas.width / 2) + (timeline[dayInt]["marsX"]/scaleOrbit*10),
            centerY: (canvas.height / 2) + (timeline[dayInt]["marsY"]/scaleOrbit*10),
            radius: 3389.5/scalePlanet,
            color: "orange",
            orbitCenterX: (canvas.width / 2)+(-2020/scaleOrbit),
            orbitCenterY: (canvas.height / 2)+(910/scaleOrbit),
            orbitRadius: 22710/scaleOrbit
        },
        phobos:{
            centerX: (canvas.width / 2) + (((timeline[dayInt]["phobosX"]*1)+timeline[dayInt]["marsX"])/scaleOrbit*10),
            centerY: (canvas.height / 2) + (((timeline[dayInt]["phobosY"]*1)+timeline[dayInt]["marsY"])/scaleOrbit*10),
            radius: 11.08/scalePlanet*100,
            color: "gray"//,
            // orbitCenterX: ,
            // orbitCenterY: ,
            // orbitRadius: 
        },
        deimos:{
            centerX: (canvas.width / 2) + (((timeline[dayInt]["deimosX"]*1)+timeline[dayInt]["marsX"])/scaleOrbit*10),
            centerY: (canvas.height / 2) + (((timeline[dayInt]["deimosY"]*1)+timeline[dayInt]["marsY"])/scaleOrbit*10),
            radius: 6.27/scalePlanet*100,
            color: "gray"//,
            // orbitCenterX: ,
            // orbitCenterY: ,
            // orbitRadius: 
        }
    }
    // orbit paths
    makeOrbit("mercury")
    makeOrbit("venus")
    makeOrbit("earth")
    makeOrbit("mars")
    // planets
    makeBody("sun")
    makeBody("mercury")
    makeBody("venus")
    makeBody("earth")
    makeBody("moon")
    makeBody("mars")
    makeBody("phobos")
    makeBody("deimos")  

    // requestAnimationFrame(drawOrbits)
}




// Function to resize the canvas
function resizeCanvas() {
    const dpr =  1;
    // Set canvas width and height to window's inner width and height
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    

    // Redraw your content after resizing (if needed)
    drawOrbits();
}

window.onload = setup;

function setup() {
    fetch("output.csv")
    .then(response => response.text())
    .then(csvText => {
        timeline = parseCSV(csvText)

        setInterval(resizeCanvas, 30); // Updates every 50ms (20 FPS)
    })
}
