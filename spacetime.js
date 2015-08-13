var updateStarted = false;
var earthOrbitPosition = null;
var radii = null;
var day = null;
var moonOrbitPosition = null;
var now = null;

function spacetime() 
{
  now = new Date(d3.time.year.floor(new Date())); // начало года
 
  // Remove previous rendered svg
  $("#main").find("svg").remove();
 
  var width = getSectionWidth(),
      height = getSectionHeight(),
      radius = Math.min(width, height);
   
  radii = {
    "sun": radius / 8,
    "earthOrbit": radius / 2.5,
    "earth": radius / 32,
    "moonOrbit": radius / 16,
    "moon": radius / 96,
    "timeFontSize": (radius / 96) * 1.2,
    "dateFontSize": (radius / 96) * 1.5
  };
   
  // Space
  var svg = d3.select('#main').append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
   
  // Sun
  svg.append("circle")
    .attr("class", "sun")
    .attr("r", radii.sun)
    .style("fill", "rgba(255, 204, 0, 1.0)");
   
  // Earth's orbit
  svg.append("circle")
    .attr("class", "earthOrbit")
    .attr("r", radii.earthOrbit)
    .style("fill", "none")
    .style("stroke", "rgba(255, 204, 0, 0.25)");
   
  // Current position of Earth in its orbit
  earthOrbitPosition = d3.svg.arc()
    .outerRadius(radii.earthOrbit + 1)
    .innerRadius(radii.earthOrbit - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "earthOrbitPosition")
    //.attr("d", earthOrbitPosition)
    .style("fill", "rgba(255, 204, 0, 0.75)");
  
  svg.append("text")
    .attr("class", "earthDate")
    .attr("y", radii.dateFontSize * 2)
    .attr("text-anchor", "middle")
    .attr("font-size", radii.dateFontSize)
    .attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .attr("fill", "white")
    .text("");
  
  // Earth
  svg.append("circle")
    .attr("class", "earth")
    .attr("r", radii.earth)
    //.attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .style("fill", "rgba(113, 170, 255, 1.0)");
   
  // Time of day
  day = d3.svg.arc()
    .outerRadius(radii.earth)
    .innerRadius(0)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "day")
    //.attr("d", day)
    //.attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .style("fill", "rgba(53, 110, 195, 1.0)");
    
  svg.append("text")
    .attr("class", "earthTime")
    .attr("y", radii.timeFontSize / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", radii.timeFontSize)
    //.attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .attr("fill", "white")
    .text("");
   
  // Moon's orbit
  svg.append("circle")
    .attr("class", "moonOrbit")
    .attr("r", radii.moonOrbit)
    //.attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .style("fill", "none")
    .style("stroke", "rgba(113, 170, 255, 0.25)");
   
  // Current position of the Moon in its orbit
  moonOrbitPosition = d3.svg.arc()
    .outerRadius(radii.moonOrbit + 1)
    .innerRadius(radii.moonOrbit - 1)
    .startAngle(0)
    .endAngle(0);
  svg.append("path")
    .attr("class", "moonOrbitPosition")
    //.attr("d", moonOrbitPosition(now))
    //.attr("transform", "translate(0," + -radii.earthOrbit + ")")
    .style("fill", "rgba(113, 170, 255, 0.75)");
   
  // Moon
  svg.append("circle")
    .attr("class", "moon")
    .attr("r", radii.moon)
    //.attr("transform", "translate(0," + (-radii.earthOrbit + -radii.moonOrbit) + ")")
    .style("fill", "rgba(150, 150, 150, 1.0)");
  
  refresh();
  
  if (!updateStarted)
  {
    updateStarted = true;
    // Update the clock every second
    setInterval(refresh, 1000);
  }
  
  function refresh()
  {
    // common
      
    now = new Date();
    
    var newEarthOrbitPosition = (2 * Math.PI * d3.time.hours(d3.time.year.floor(now), now).length / d3.time.hours(d3.time.year.floor(now), d3.time.year.ceil(now)).length);
    var newSelfRotationPosition = (2 * Math.PI * d3.time.seconds(d3.time.day.floor(now), now).length / d3.time.seconds(d3.time.day.floor(now), d3.time.day.ceil(now)).length);
    var newMoonOrbitPosition = (2 * Math.PI * d3.time.hours(d3.time.month.floor(now), now).length / d3.time.hours(d3.time.month.floor(now), d3.time.month.ceil(now)).length);
    
    d3.select(".earthDate")
      .text(moment().format('L'));
    d3.select(".earthTime")
      .text(moment().format('HH:mm:ss'));
    
    // no animation
    
    var earthOrbitTranslation = "translate(" + radii.earthOrbit * Math.sin(newEarthOrbitPosition - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(newEarthOrbitPosition - earthOrbitPosition.startAngle()()) + ")";
    
    // Earth orbit position
    d3.select(".earthOrbitPosition")
      .attr("d", earthOrbitPosition.endAngle(newEarthOrbitPosition));
    
    // Transition Earth
    d3.select(".earth")
      .attr("transform", earthOrbitTranslation);
    
    d3.select(".earthTime")
      .attr("transform", earthOrbitTranslation);

    // day
    d3.select(".day")
      .attr("d", day.endAngle(newSelfRotationPosition))
      .attr("transform", earthOrbitTranslation);
    
    // Moon orbit
    d3.select(".moonOrbit")
      .attr("transform", earthOrbitTranslation);

    // Moon orbit position
    d3.select(".moonOrbitPosition")
      .attr("d", moonOrbitPosition.endAngle(newMoonOrbitPosition))
      .attr("transform", earthOrbitTranslation);
    
    // Transition Moon
    d3.select(".moon")
      .attr("transform", "translate(" + (radii.earthOrbit * Math.sin(newEarthOrbitPosition - earthOrbitPosition.startAngle()()) + radii.moonOrbit * Math.sin(newMoonOrbitPosition - moonOrbitPosition.startAngle()())) + "," + (-radii.earthOrbit * Math.cos(newEarthOrbitPosition - earthOrbitPosition.startAngle()()) + -radii.moonOrbit * Math.cos(newMoonOrbitPosition - moonOrbitPosition.startAngle()())) + ")");

    /*
    // with animation
    
    var interpolateEarthOrbitPosition = d3.interpolate(earthOrbitPosition.endAngle()(), newEarthOrbitPosition);
    var interpolateDay = d3.interpolate(day.endAngle()(), newSelfRotationPosition);
    var interpolateMoonOrbitPosition = d3.interpolate(moonOrbitPosition.endAngle()(), newMoonOrbitPosition);
    
    d3.transition().tween("orbit", function () {
      return function (t) {
        // Animate Earth orbit position
        d3.select(".earthOrbitPosition").attr("d", earthOrbitPosition.endAngle(interpolateEarthOrbitPosition(t)));
   
        d3.select(".earthDate")
          .text(moment().format('L'));
   
        // Transition Earth
        d3.select(".earth")
          .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
   
        d3.select(".earthTime")
          .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")")
          .text(moment().format('HH:mm:ss'));
   
        // Animate day
        // Transition day
        d3.select(".day")
          .attr("d", day.endAngle(interpolateDay(t)))
          .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
        
        // Transition Moon orbit
        d3.select(".moonOrbit")
          .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
   
        // Animate Moon orbit position
        // Transition Moon orbit position
        d3.select(".moonOrbitPosition")
          .attr("d", moonOrbitPosition.endAngle(interpolateMoonOrbitPosition(t)))
          .attr("transform", "translate(" + radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + "," + -radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + ")");
        
        // Transition Moon
        d3.select(".moon")
          .attr("transform", "translate(" + (radii.earthOrbit * Math.sin(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + radii.moonOrbit * Math.sin(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + "," + (-radii.earthOrbit * Math.cos(interpolateEarthOrbitPosition(t) - earthOrbitPosition.startAngle()()) + -radii.moonOrbit * Math.cos(interpolateMoonOrbitPosition(t) - moonOrbitPosition.startAngle()())) + ")");
      };
    });*/
  }
}