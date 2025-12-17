// Set proper canvas size
width = window.innerWidth;
height = window.innerHeight;

function parseCSV(csv) {
    const [header, ...rows] = csv.trim().split("\n").map(row => row.split(",").map(cell => cell.trim()));

    return rows.map(row =>
        Object.fromEntries(header.map((h, i) => [h.trim(), isNaN(row[i]) ? row[i] : Number(row[i])]))
    );
}
// console.log(parseCSV("solarDataTrim.csv"))
fetch("solarDataTrim.csv")
    .then(response => response.text())
    .then(csvText => {
        timeline = parseCSV(csvText)
        // console.log(timeline[0]);
        // console.log(timeline[1]);

        // setInterval(updateSvg, 86400000/4000000); // Updates every 50ms (20 FPS)

        setup()
    })




function test() {
    console.log(`translate(${width/2}, ${height/2}`)
}

const scaleMultiplier = 2
const orbitScale = 1/1000000 * scaleMultiplier
const starScale = 10/1000000 * scaleMultiplier
const planetScale =  1/1000 * scaleMultiplier

const earthMoonOrbitScale = 40*orbitScale
const earthMoonScale      = 2*planetScale

const marsMoonOrbitScale = 1000*orbitScale
const marsMoonScale = 200*planetScale

orbitThickness=8



data = {"sun":      {"xBody":0,                             "yBody":0,                              "rBody":695700.0*starScale,   "xOrbit":0,       "yOrbit":0,     "rOrbit":0},
        "mercury":  {"xBody":-19098665.500678*orbitScale,   "yBody":43273100.18341506*orbitScale,   "rBody":2440.53*planetScale,  "xOrbit":-2.6,    "yOrbit":11.4,  "rOrbit":113000697.874/2*orbitScale},
        "venus":    {"xBody":104013136.1331001*orbitScale,  "yBody":-31379000.57788767*orbitScale,  "rBody":6051.8*planetScale,   "xOrbit":.2,      "yOrbit":0.6,   "rOrbit":216061696.533/2*orbitScale},
        "earth":    {"xBody":-147759340.5524348*orbitScale, "yBody":16987775.61675123*orbitScale,   "rBody":6378.137*planetScale, "xOrbit":0.4,     "yOrbit":2.5,   "rOrbit":299165468.751/2*orbitScale},
        "mars":     {"xBody":-38002369.62161233*orbitScale, "yBody":-217647634.3509244*orbitScale,  "rBody":3396.19*planetScale,  "xOrbit":-19.45,  "yOrbit":-9.1,  "rOrbit":455468273.890/2*orbitScale},
        "moon":     {"xBody":0, "yBody":0,  "rBody":1737.4*earthMoonScale, "xOrbit":0,  "yOrbit":0,  "rOrbit":0},
        "phobos":   {"xBody":0, "yBody":0,  "rBody":13.0*marsMoonScale,   "xOrbit":0,  "yOrbit":0,  "rOrbit":0},
        "deimos":   {"xBody":0, "yBody":0,  "rBody":7.8*marsMoonScale,    "xOrbit":0,  "yOrbit":0,  "rOrbit":0} }

function setBodyPosition(id, x, y){
  trueData=true
  
  
  y=-y
  // console.log(id, x, y);
  
  solid  = document.getElementById(`${id}Solid`)
  shader = document.getElementById(`shader-${id}`)
  if (trueData){
    solid.setAttribute("cx", x)
    shader.setAttribute("cx", x)
    solid.setAttribute("cy", y)
    shader.setAttribute("cy", y)
  }
  else{
    cX=data[id]["xOrbit"]
    cY=data[id]["yOrbit"]
    r=data[id]["rOrbit"]
    dX=x-cX
    dY=y-cY
    distance=Math.sqrt((dX*dX)+(dY*dY))
    
    X=cX+((dX*r)/distance)
    Y=cY+((dY*r)/distance)
    // console.log(id, x,X,y,Y, r);
    
    solid.setAttribute("cx", X)
    shader.setAttribute("cx", X)
    solid.setAttribute("cy", Y)
    shader.setAttribute("cy", Y)
  }
}
function setup() {
    document.getElementById("innerMap").setAttribute("viewBox", `0 0 ${width} ${height}`)
    document.getElementById("mapLayer1").setAttribute("transform", `translate(${width/2}, ${height/2})`)

    function setOrbitCenter(id, x, y) {
      ellipse = document.getElementById(`orbit${id}`)
      ellipse.setAttribute("cx", x)
      ellipse.setAttribute("cy", y)
    }
    function setOrbitRadiuskm(id, r) {
      r = r*orbitScale+(orbitThickness/2)
      ellipse = document.getElementById(`orbit${id}`)
      ellipse.setAttribute("rx", r)
      ellipse.setAttribute("ry", r)
    }
    function setOrbitPathThickness(id, thickness){
      orbitRadius = document.getElementById(`orbit${id}`).getAttribute("rx")
      stop1 = (orbitRadius-thickness)/orbitRadius
      stop2 = (orbitRadius-(thickness/2))/orbitRadius
      // console.log(stop1, stop2)

      stops = `<stop style="stop-color:#000000;stop-opacity:0;" offset="${stop1}" id="stop85375"></stop>
               <stop style="stop-color:#797979;stop-opacity:0.9;" offset="${stop2}" id="stop85367"></stop>
               <stop style="stop-color:#000000;stop-opacity:0;" offset="1" id="stop85369"></stop>`
      document.getElementById(`linearGradientOrbit${id}`).innerHTML = stops
    }
    function setBodyRadiuskm(id, r){
      solid  = document.getElementById(`${id}Solid`)
      shader = document.getElementById(`shader-${id}`)
      solid.setAttribute("r", r)
      shader.setAttribute("r", r)
    }

    setOrbitCenter(1, -2.6*scaleMultiplier, 11.4*scaleMultiplier)
    setOrbitRadiuskm(1, 113000697.874/2)

    setOrbitCenter(2, .2*scaleMultiplier, .6*scaleMultiplier)
    setOrbitRadiuskm(2, 216061696.533/2)

    setOrbitCenter(3, 0.4*scaleMultiplier, 2.5*scaleMultiplier)
    setOrbitRadiuskm(3, 299165468.751/2)

    setOrbitCenter(4, -19.45*scaleMultiplier, -9.1*scaleMultiplier)
    setOrbitRadiuskm(4, 455468273.89/2)

    setOrbitPathThickness(1, orbitThickness)
    setOrbitPathThickness(2, orbitThickness)
    setOrbitPathThickness(3, orbitThickness)
    setOrbitPathThickness(4, orbitThickness)

    setBodyRadiuskm("sun", 695700.0*starScale)
    setBodyRadiuskm("mercury", 2440.53*planetScale)
    setBodyRadiuskm("venus", 6051.8*planetScale)
    setBodyRadiuskm("earth", 6378.137*planetScale)
    setBodyRadiuskm("mars", 3396.19*planetScale)
    setBodyRadiuskm("moon", 1737.4*earthMoonScale)
    setBodyRadiuskm("phobos", 13.0*marsMoonScale)
    setBodyRadiuskm("deimos", 7.8*marsMoonScale)

    setBodyPosition("mercury",  timeline[dayInt]["xMercuryAtSun"]*orbitScale,  timeline[dayInt]["yMercuryAtSun"]*orbitScale)
    console.log(timeline[dayInt]["xMercuryAtSun"]*orbitScale,  timeline[dayInt]["yMercuryAtSun"]*orbitScale)
    setBodyPosition("venus",    timeline[dayInt]["xVenusAtSun"]*orbitScale,    timeline[dayInt]["yVenusAtSun"]*orbitScale)
    setBodyPosition("earth",    timeline[dayInt]["xEarthAtSun"]*orbitScale,    timeline[dayInt]["yEarthAtSun"]*orbitScale)
    setBodyPosition("mars",     timeline[dayInt]["xMarsAtSun"]*orbitScale,     timeline[dayInt]["yMarsAtSun"]*orbitScale)

    updateSvg()
}
dayInt = 0
function updateSvg(){
  // console.log(timeline[dayInt]);
  setBodyPosition("mercury",  timeline[dayInt]["xMercuryAtSun"]*orbitScale,  timeline[dayInt]["yMercuryAtSun"]*orbitScale)
  setBodyPosition("venus",    timeline[dayInt]["xVenusAtSun"]*orbitScale,    timeline[dayInt]["yVenusAtSun"]*orbitScale)
  setBodyPosition("earth",    timeline[dayInt]["xEarthAtSun"]*orbitScale,    timeline[dayInt]["yEarthAtSun"]*orbitScale)
  setBodyPosition("mars",     timeline[dayInt]["xMarsAtSun"]*orbitScale,     timeline[dayInt]["yMarsAtSun"]*orbitScale)
  setBodyPosition("moon",     timeline[dayInt]["xMoonAtEarth"]*earthMoonOrbitScale+(timeline[dayInt]["xEarthAtSun"]*orbitScale),     timeline[dayInt]["yMoonAtEarth"]*earthMoonOrbitScale+(timeline[dayInt]["yEarthAtSun"]*orbitScale))
  setBodyPosition("phobos",   timeline[dayInt]["xPhobosAtMars"]*marsMoonOrbitScale+(timeline[dayInt]["xMarsAtSun"]*orbitScale),     timeline[dayInt]["yPhobosAtMars"]*marsMoonOrbitScale+(timeline[dayInt]["yMarsAtSun"]*orbitScale))
  setBodyPosition("deimos",   timeline[dayInt]["xDeimosAtMars"]*marsMoonOrbitScale+(timeline[dayInt]["xMarsAtSun"]*orbitScale),     timeline[dayInt]["yDeimosAtMars"]*marsMoonOrbitScale+(timeline[dayInt]["yMarsAtSun"]*orbitScale))
  dayInt+=1
  if (dayInt == timeline.length) {dayInt=0}
}

function makePath(id, points) {
  path = `<path fill="none" stroke="url(#mercuryPath)" stroke-width=${data[id]["rBody"]} d="M ${points[0][0]} ${points[0][1]} C ${points[0][0]} ${points[0][1]}`
  document.getElementById(`${id}Path`).setAttribute("x1", points[0][0])
  document.getElementById(`${id}Path`).setAttribute("y1", points[0][1])
  document.getElementById(`${id}Path`).setAttribute("x2", points[59][1])
  document.getElementById(`${id}Path`).setAttribute("y2", points[59][1])
  // path = `<path fill=none stroke="red" stroke-width=4 d="M ${points[0][0]} ${points[0][1]} C ${points[0][0]} ${points[0][1]}`
  function calcSlope(p0, p1){
    return (p1[1]-p0[1])/(p1[0]-p0[0])
  }
  console.log(points[0][0],points[0][1])
  for(let i = 1; i<points.length-1; i++) {
        slope = calcSlope(points[i-1], points[i+1])
        distance = Math.sqrt((points[i+1][0]-points[i-1][0])**2+(points[i+1][1]-points[i-1][1])**2)
        dx = Math.sqrt( (distance/6)**2 / ((1)+slope**2) )

        x = points[i][0]
        y = points[i][1]
        
        handleX1 = x-dx
        handleX2 = x+dx
        handleY1 = y-(slope*dx)
        handleY2 = y+(slope*dx)

        if (points[i+1][0] > points[i-1][0]){
            path+=`\t${handleX1.toFixed(3)} ${handleY1.toFixed(3)}, ${x.toFixed(3)} ${y.toFixed(3)}, ${handleX2.toFixed(3)} ${handleY2.toFixed(3)}\n`
        } else{
            path+=`\t${handleX2.toFixed(3)} ${handleY2.toFixed(3)}, ${x.toFixed(3)} ${y.toFixed(3)}, ${handleX1.toFixed(3)} ${handleY1.toFixed(3)}\n`
      }
    }
    path +="\"/>"

    // console.log(path)
    svg = document.getElementById("trails").innerHTML += path
    // console.log(svg)
}
points = [ 
    [-21052621*orbitScale,-66406638*orbitScale*-1],
    [-17856647*orbitScale,-67371145*orbitScale*-1],
    [-14608666*orbitScale,-68139441*orbitScale*-1],
    [-11318160*orbitScale,-68709387*orbitScale*-1],
    [-7994669*orbitScale,-69079059*orbitScale*-1],
    [-4647809*orbitScale,-69246754*orbitScale*-1],
    [-1287302*orbitScale,-69210988*orbitScale*-1],
    [2076999*orbitScale,-68970497*orbitScale*-1],
    [5435088*orbitScale,-68524249*orbitScale*-1],
    [8776776*orbitScale,-67871456*orbitScale*-1],
    [12091663*orbitScale,-67011587*orbitScale*-1],
    [15369114*orbitScale,-65944394*orbitScale*-1],
    [18598226*orbitScale,-64669931*orbitScale*-1],
    [21767808*orbitScale,-63188592*orbitScale*-1],
    [24866346*orbitScale,-61501142*orbitScale*-1],
    [27881981*orbitScale,-59608765*orbitScale*-1],
    [30802480*orbitScale,-57513114*orbitScale*-1],
    [33615217*orbitScale,-55216367*orbitScale*-1],
    [36307147*orbitScale,-52721298*orbitScale*-1],
    [38864794*orbitScale,-50031355*orbitScale*-1],
    [41274237*orbitScale,-47150745*orbitScale*-1],
    [43521103*orbitScale,-44084536*orbitScale*-1],
    [45590581*orbitScale,-40838769*orbitScale*-1],
    [47467430*orbitScale,-37420583*orbitScale*-1],
    [49136016*orbitScale,-33838352*orbitScale*-1],
    [50580366*orbitScale,-30101841*orbitScale*-1],
    [51784239*orbitScale,-26222368*orbitScale*-1],
    [52731240*orbitScale,-22212981*orbitScale*-1],
    [53404957*orbitScale,-18088642*orbitScale*-1],
    [53789146*orbitScale,-13866417*orbitScale*-1],
    [53867968*orbitScale,-9565662*orbitScale*-1],
    [53626283*orbitScale,-5208195*orbitScale*-1],
    [53050000*orbitScale,-818447*orbitScale*-1],
    [52126505*orbitScale,3576427*orbitScale*-1],
    [50845152*orbitScale,7946507*orbitScale*-1],
    [49197826*orbitScale,12259130*orbitScale*-1],
    [47179552*orbitScale,16479049*orbitScale*-1],
    [44789152*orbitScale,20568702*orbitScale*-1],
    [42029901*orbitScale,24488666*orbitScale*-1],
    [38910151*orbitScale,28198275*orbitScale*-1],
    [35443869*orbitScale,31656433*orbitScale*-1],
    [31651028*orbitScale,34822604*orbitScale*-1],
    [27557786*orbitScale,37657953*orbitScale*-1],
    [23196402*orbitScale,40126578*orbitScale*-1],
    [18604847*orbitScale,42196760*orbitScale*-1],
    [13826095*orbitScale,43842142*orbitScale*-1],
    [8907114*orbitScale,45042724*orbitScale*-1],
    [3897611*orbitScale,45785610*orbitScale*-1],
    [-1151379*orbitScale,46065408*orbitScale*-1],
    [-6188966*orbitScale,45884275*orbitScale*-1],
    [-11165810*orbitScale,45251600*orbitScale*-1],
    [-16035386*orbitScale,44183373*orbitScale*-1],
    [-20755011*orbitScale,42701303*orbitScale*-1],
    [-25286597*orbitScale,40831785*orbitScale*-1],
    [-29597119*orbitScale,38604796*orbitScale*-1],
    [-33658814*orbitScale,36052803*orbitScale*-1],
    [-37449146*orbitScale,33209743*orbitScale*-1],
    [-40950584*orbitScale,30110132*orbitScale*-1],
    [-44150244*orbitScale,26788305*orbitScale*-1],
    [-47039453*orbitScale,23277818*orbitScale*-1]
]
makePath("mercury", points)

// function easing(t, type) {
//     x=t
//     // easeInOutSine
//     if (type==1) {return -(Math.cos(Math.PI * t) - 1) / 2;}
//     // easeInOutCubic
//     if (type==0) {return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;}
//     // easeInOutQuad
//     if (type==2) {return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;}
//     // easeInOutExpo
//     if (type==3) {return t === 0 ? 0 : t === 1 ? 1 :  
//         t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 :  
//         (2 - Math.pow(2, -20 * t + 10)) / 2;}
//     // cubic2
//     if (type==4) {return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;}  
//     // expo out
//     if (type==5) {return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);}  
//     // circ out
//     if (type==6) {return Math.sqrt(1 - Math.pow(x - 1, 2));}  
//     // circ in out
//     if (type==7) {return x < 0.5
//                     ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
//                     : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;}  
//     // quart in out
//     if (type==8) {return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;}  
// }
// function transition(value, n, curve) {
//     let easedValue = easing(value / 100, curve) * n;
//     //console.log(easedValue); // Apply easedValue to your transition logic
//     return parseInt(easedValue)
// }