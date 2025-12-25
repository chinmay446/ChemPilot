/* visuals.js
   Canvas-based particle system + UI toggle for extreme visuals
   - Non-blocking, respects prefers-reduced-motion
   - Toggle button created/managed here
*/
(function(){
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create DOM layers
  function createLayers(){
    if (document.getElementById('visuals-canvas')) return;

    const gradient = document.createElement('div');
    gradient.className = 'extreme-gradient';
    gradient.setAttribute('aria-hidden','true');
    document.body.appendChild(gradient);

    const canvas = document.createElement('canvas');
    canvas.id = 'visuals-canvas';
    canvas.setAttribute('aria-hidden','true');
    document.body.appendChild(canvas);

    const noise = document.createElement('div');
    noise.className = 'visuals-noise';
    noise.setAttribute('aria-hidden','true');
    document.body.appendChild(noise);

    // no toggle/hint by default (FX button removed)
    return {canvas, gradient, noise};
  }

  // Particle system
  function Particle(x,y,dx,dy,r,color){
    this.x = x; this.y = y; this.dx = dx; this.dy = dy; this.r=r; this.color=color;
  }

  Particle.prototype.step = function(width,height){
    this.x += this.dx; this.y += this.dy;
    if(this.x < -100) this.x = width + 100;
    if(this.x > width + 100) this.x = -100;
    if(this.y < -100) this.y = height + 100;
    if(this.y > height + 100) this.y = -100;
  };

  function createParticles(count,width,height){
    const arr = [];
    for(let i=0;i<count;i++){
      const x = Math.random()*width;
      const y = Math.random()*height;
      const dx = (Math.random()-0.5)*(0.3+Math.random()*1.2);
      const dy = (Math.random()-0.5)*(0.3+Math.random()*1.2);
      const r = 6 + Math.random()*36;
      const hue = Math.floor(180 + Math.random()*180);
      const color = `hsla(${hue},90%,60%,${0.06 + Math.random()*0.12})`;
      arr.push(new Particle(x,y,dx,dy,r,color));
    }
    return arr;
  }

  // Main controller
  let ctx, canvasEl, rafId, particles=[], mouse={x:-9999,y:-9999};
  let enabled = true;

  function start(){
    if(prefersReduced) return;
    const layers = createLayers();
    canvasEl = layers.canvas;
    const dpi = window.devicePixelRatio || 1;
    canvasEl.width = window.innerWidth * dpi;
    canvasEl.height = window.innerHeight * dpi;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    ctx = canvasEl.getContext('2d');
    ctx.scale(dpi,dpi);

    particles = createParticles(Math.max(24, Math.floor((window.innerWidth*window.innerHeight)/50000)), window.innerWidth, window.innerHeight);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('pointerdown', handleBurst);

    // no toggle/hint listeners (FX button removed)

    enabled = true;
    loop();
  }

  function stop(){
    enabled = false;
    if(rafId) cancelAnimationFrame(rafId);
    try{ window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMove); window.removeEventListener('pointerdown', handleBurst); }catch(e){}
  }

  function handleResize(){
    const dpi = window.devicePixelRatio || 1;
    if(!canvasEl) return;
    canvasEl.width = window.innerWidth * dpi;
    canvasEl.height = window.innerHeight * dpi;
    canvasEl.style.width = window.innerWidth + 'px';
    canvasEl.style.height = window.innerHeight + 'px';
    ctx.scale(dpi,dpi);
  }

  function handleMove(e){ mouse.x = e.clientX; mouse.y = e.clientY; }

  function handleBurst(e){
    // create temporary fast outward particles
    for(let i=0;i<18;i++){
      const angle = Math.random()*Math.PI*2;
      particles.push(new Particle(e.clientX,e.clientY,Math.cos(angle)*(2+Math.random()*3),Math.sin(angle)*(2+Math.random()*3),4+Math.random()*18,`hsla(${Math.floor(Math.random()*360)},90%,60%,0.12)`));
    }
  }

  function loop(){
    if(!enabled) return;
    rafId = requestAnimationFrame(loop);
    if(!ctx) return;
    const w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0,0,w,h);

    // subtle vignette background
    const grd = ctx.createLinearGradient(0,0,w,h);
    grd.addColorStop(0, 'rgba(10,10,18,0.02)');
    grd.addColorStop(1, 'rgba(10,10,30,0.02)');
    ctx.fillStyle = grd; ctx.fillRect(0,0,w,h);

    // draw particles
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      p.step(w,h);
      // influence by mouse
      const dx = p.x - mouse.x; const dy = p.y - mouse.y; const dist = Math.sqrt(dx*dx+dy*dy);
      if(mouse.x > -9000 && dist < 220){
        const f = (220-dist)/220;
        p.x += (dx/dist) * -0.6 * f;
        p.y += (dy/dist) * -0.6 * f;
      }
      // draw glow
      ctx.beginPath();
      const g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
      g.addColorStop(0, p.color);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(p.x - p.r, p.y - p.r, p.r*2, p.r*2);
    }

    // connect some particles
    ctx.lineWidth = 0.8; ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    for(let i=0;i<Math.min(80,particles.length);i++){
      for(let j=i+1;j<Math.min(80,particles.length);j++){
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y; const d = dx*dx + dy*dy;
        if(d < 16000){
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }

    // trim explosion particles if too many
    if(particles.length > 300) particles.splice(0, particles.length - 220);
  }

  // toggle removed (FX button removed)

  // initialize but don't start if reduced-motion
  document.addEventListener('DOMContentLoaded', ()=>{
    createLayers();
    // auto-start visuals when user does not prefer reduced motion
    if(!prefersReduced){ start(); }
  });

  // Also provide icon-appearance animation for pages that load visuals.js (e.g., support.html)
  document.addEventListener('DOMContentLoaded', function(){
    try {
      const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;
      const main = document.querySelector('main') || document.body;
      const nodeList = main.querySelectorAll('i, .feature-icon, .stat-icon, .feature-card, .stat-card, .testimonial-author img');
      const nodes = Array.from(nodeList);

      nodes.forEach(n => { if (!n.classList.contains('icon-appear')) n.classList.add('icon-appear'); });
      nodes.forEach((el, i) => setTimeout(()=>{ el.classList.add('icon-visible'); if (el.classList.contains('feature-card')||el.classList.contains('stat-card')) el.classList.add('appeared'); }, 150 + i*80));
    } catch(e){ console.error('Visuals icon animation error', e); }
  });

})();
