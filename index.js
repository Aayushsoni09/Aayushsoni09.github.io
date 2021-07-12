const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
gsap.registerPlugin(ScrollTrigger)

let container = document.getElementById("container");

gsap.to(container, {
  x: () => -(container.scrollWidth - document.documentElement.clientWidth) + "px",
  ease: "none",
  scrollTrigger: {
    trigger: container,
    invalidateOnRefresh: true,
    pin: true,
    scrub: 0.5,
    end: () => "+=" + container.offsetWidth
  }
})
gsap.to('.navbar',{
  y:-200,
    scrollTrigger:{
  
      start:"top 2%",
      trigger:'.navbar',
      ease: Power2.easeOut,
     
      scrub:1
    }
  })

gsap.to('.top_banner_text',{

  x:2500,
  // color:'white',
  scrollTrigger:{

    trigger:'.container',
    scrub:1,
    
  }

})
var text = gsap.timeline({
  scrollTrigger: {
    trigger: '.container',
    start: "top 5%",
    pin:true,
    scrub:1,
    
  },
  defaults:{duration:0.1}
})


text.to('.top_banner_text', {color:'white'})

.to({},{})
.to({},{})
.to({},{});





var scene = new THREE.Scene();
document.addEventListener( 'mousemove', onMouseMove, false );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var mouseX;
var mouseY;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

window.addEventListener("resize", function() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
});

var distance = Math.min(200, window.innerWidth / 4);
var geometry = new THREE.Geometry();

for (var i = 0; i < 1600; i++) {

  var vertex = new THREE.Vector3();

  var theta = THREE.Math.randFloatSpread(360); 
  var phi = THREE.Math.randFloatSpread(360); 

  vertex.x = distance * Math.sin(theta) * Math.cos(phi);
  vertex.y = distance * Math.sin(theta) * Math.sin(phi);
  vertex.z = distance * Math.cos(theta);

  geometry.vertices.push(vertex);
}
var particles = new THREE.Points(geometry, new THREE.PointsMaterial({color: 0xff44ff, size: 2}));
particles.boundingSphere = 50;


var renderingParent = new THREE.Group();
renderingParent.add(particles);

var resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
scene.add(resizeContainer);

camera.position.z = 400;

var animate = function () {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
};
var myTween;
function onMouseMove(event) {
  if(myTween)
    myTween.kill();
  
  mouseX = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouseY = - ( event.clientY / window.innerHeight ) * 2 + 1;
  myTween = gsap.to(particles.rotation, {duration: 0.1, x: mouseY*-1, y: mouseX});
  //particles.rotation.x = mouseY*-1;
  //particles.rotation.y = mouseX;
}
animate();

// Scaling animation
var animProps = {scale: 1, xRot: 0, yRot: 0};
gsap.to(animProps, {duration: 10, scale: 1.3, repeat: -1, yoyo: true, ease: "sine", onUpdate: function() {
  renderingParent.scale.set(animProps.scale,animProps.scale,animProps.scale);
}});

gsap.to(animProps, {duration: 120, xRot: Math.PI * 2, yRot: Math.PI * 4, repeat: -1, yoyo: true, ease: "none", onUpdate: function() {
  renderingParent.rotation.set(animProps.xRot,animProps.yRot,0);
}});

//skill section





gsap.set('.content:not(.initial)', { autoAlpha: 0 })


var headlines = gsap.utils.toArray(".text");

var totalDuration = 1000;
var singleDuration = totalDuration / headlines.length;





const lineTimeline = gsap.timeline();

ScrollTrigger.create({    
  trigger: ".pin-up",
  start: "top top",
  end: "+=" + totalDuration,
  //markers: true,
  pin: true,
  scrub: true,
  animation: lineTimeline,
});

lineTimeline
.to('.sideline', { duration: 1 }, 0)
.to('.sideline', { duration: 0.9, scaleY: 1, ease: "none" }, 0)





headlines.forEach((elem, i) => {    
  
  const smallTimeline = gsap.timeline(); 
    
  const content = document.querySelector('.content-wrap');
  const relevantContent = content.querySelector('span.content-' + i);  
    
  ScrollTrigger.create({    
    
    trigger: ".wrapper",
        
    start: "top -=" + ( singleDuration * i ),
    end: "+=" + singleDuration,
    
    //markers: true,

    animation: smallTimeline,
    toggleActions: relevantContent.classList.contains('remaining') ? "play none play reverse" : "play reverse play reverse",
    
  });   

  smallTimeline 
    .to(elem,{ duration: 0.25, color: "orange", scale: 1.25, ease: 'none' }, 0) 
    .set(relevantContent,{ autoAlpha: 1 }, 0.125)
  ;
 
});









//cursor
var cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: window.innerWidth / 2,
  endY: window.innerHeight / 2,
  cursorVisible: true,
  cursorEnlarged: false,
  CoursorColor: true,
  $dot: document.querySelector(".cursor-dot"),
  $outline: document.querySelector(".cursor-dot-outline"),

  init: function () {
    // Configuracion de tamaños de elementos
    this.setupEventListeners();
    this.animateDotOutline();
  },

  setupEventListeners: function () {
    var self = this;

    // Ancho del hovering
    document.querySelectorAll("a").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        self.CoursorColor = false;
        self.toggleColor();
        self.cursorEnlarged = true;
        self.toggleCursorSize();
      });
      el.addEventListener("mouseout", function () {
        self.CoursorColor = true;
        self.toggleColor();
        self.cursorEnlarged = false;
        self.toggleCursorSize();
      });
    });

    // Eventos click
    document.addEventListener("mousedown", function () {
      self.cursorEnlarged = true;
      self.toggleCursorSize();
    });
    document.addEventListener("mouseup", function () {
      self.cursorEnlarged = false;
      self.toggleCursorSize();
    });

    document.addEventListener("mousemove", function (e) {
      // Mostar el cursor
      self.cursorVisible = true;
      self.toggleCursorVisibility();

      // Posición de el punto
      self.endX = e.pageX;
      self.endY = e.pageY;
      self.$dot.style.top = self.endY + "px";
      self.$dot.style.left = self.endX + "px";
    });

    // Oculta/mostrar cursor
    document.addEventListener("mouseenter", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    });

    document.addEventListener("mouseleave", function (e) {
      self.cursorVisible = true;
      self.toggleCursorVisibility();
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    });
  },

  animateDotOutline: function () {
    var self = this;

    self._x += (self.endX - self._x) / self.delay;
    self._y += (self.endY - self._y) / self.delay;
    self.$outline.style.top = self._y + "px";
    self.$outline.style.left = self._x + "px";
    requestAnimationFrame(this.animateDotOutline.bind(self));
  },

  toggleCursorSize: function () {
    var self = this;

    if (self.cursorEnlarged) {
      self.$dot.style.transform = "translate(-50%, -50%) scale(0.75)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(1.5)";
    } else {
      self.$dot.style.transform = "translate(-50%, -50%) scale(1)";
      self.$outline.style.transform = "translate(-50%, -50%) scale(1)";
    }
  },

  toggleColor: function () {
    if (this.CoursorColor) {
      this.$dot.style.visibility = "visible";
      this.$outline.style.visibility = "visible";
    } else {
      this.$dot.style.visibility = "hidden";
      this.$outline.style.visibility = "hidden";
    }
  },

  toggleCursorVisibility: function () {
    var self = this;
    if (self.cursorVisible) {
      self.$dot.style.opacity = 1;
      self.$outline.style.opacity = 1;
    } else {
      self.$dot.style.opacity = 0;
      self.$outline.style.opacity = 0;
    }
  }
};

cursor.init();





document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.4
  };

  // IMAGE ANIMATION

  let revealCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;

      if (entry.isIntersecting) {
        console.log(container);
        container.classList.add("animating");
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("animating");
      }
    });
  };

  let revealObserver = new IntersectionObserver(revealCallback, options);

  document.querySelectorAll(".reveal").forEach((reveal) => {
    revealObserver.observe(reveal);
  });

  // TEXT ANIMATION

  let fadeupCallback = (entries) => {
    entries.forEach((entry) => {
      let container = entry.target;
      container.classList.add("not-fading-up");

      if (entry.isIntersecting) {
        container.classList.add("fading-up");
        return;
      }

      if (entry.boundingClientRect.top > 0) {
        container.classList.remove("fading-up");
      }
    });
  };

  let fadeupObserver = new IntersectionObserver(fadeupCallback, options);

  document.querySelectorAll(".fadeup").forEach((fadeup) => {
    fadeupObserver.observe(fadeup);
  });
});



//text animation
const tltext = gsap.timeline();

tltext.from(".navbar", 1.8, {
  y: -100,
  ease: "power4.out",
  
  opacity:0,
  stagger: {
    amount: 0.3
  }
})
.from(".top_banner_text ", 1.8, {
  y: -100,
  ease: "back",
  delay: -1,
  opacity:0,
  stagger: {
    amount: 0.3
  }
})
.from(".bottom_banner_text ", 1.8, {
  y: -100,
  ease: "power4.out",
  delay: -1,
  opacity:0,
  stagger: {
    amount: 0.3
  }
})
