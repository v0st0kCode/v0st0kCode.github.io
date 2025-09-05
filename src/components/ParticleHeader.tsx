
import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

declare global {
  interface Window {
    mouseX: number;
    mouseY: number;
    triggerParticleCelebration?: () => void;
  }
}

interface ParticleHeaderProps {
  className?: string;
}

const ParticleHeader: React.FC<ParticleHeaderProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5>();
  const [imantedCount, setImantedCount] = useState(0);
  const [isNewImant, setIsNewImant] = useState(false);
  const [counterPosition, setCounterPosition] = useState({ x: window?.innerWidth / 2 || 0, y: window?.innerHeight / 2 || 0 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [isHoveringContent, setIsHoveringContent] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [fadeOutCollected, setFadeOutCollected] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const [dotsVisible, setDotsVisible] = useState(true);
  const totalParticles = 80;
  const { toast } = useToast();
  const counterColor = "bg-black/70"; // Using the same color as the counter background
  const dotColor = { r: 0, g: 0, b: 0 }; // Black color for dots

  useEffect(() => {
    if (isNewImant) {
      const timer = setTimeout(() => {
        setIsNewImant(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isNewImant]);

  useEffect(() => {
    window.triggerParticleCelebration = triggerCelebration;
    
    return () => {
      delete window.triggerParticleCelebration;
    };
  }, []);

  const triggerCelebration = () => {
    console.log("Triggering celebration");
    setShowWinMessage(true);
    setGameActive(false);
    setFadeOutCollected(true);
    setCelebrationActive(true);
    setDotsVisible(false); // Hide dots during celebration
    fireworksEffect();
    
    setTimeout(() => fireworksEffect(), 800);
    setTimeout(() => fireworksEffect(), 1600);
    setTimeout(() => fireworksEffect(), 2400);
    
    setTimeout(() => {
      // Reset game state
      setImantedCount(0);
      setIsNewImant(false);
      
      // Transition to non-interactive dot grid
      setTimeout(() => {
        setShowWinMessage(false);
        setFadeOutCollected(false);
        setCelebrationActive(false);
        setDotsVisible(true); // Show dots again as non-interactive grid
      }, 5000);
    }, 4000);
  };

  const fireworksEffect = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = rect.width / 2 / rect.width;
      const y = rect.height / 2 / rect.height;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x, y },
        colors: ['#9b87f5', '#D946EF', '#F97316', '#0EA5E9', '#8B5CF6']
      });
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const particleCount = totalParticles;
      let mouseX = p.windowWidth / 2;
      let mouseY = p.windowHeight / 2;
      let imantedParticles = new Set<number>();
      let isMouseInsideCanvas = false;
      let celebrationCount = 0;
      let hasShownToast = false;
      let dotSizeMultiplier = 1;
      let fadeOutOpacity = 1;
      let lastGridUpdate = 0;
      const gridUpdateDelay = 500; // ms between grid updates

      class Particle {
        pos: p5.Vector;
        vel: p5.Vector;
        acc: p5.Vector;
        target: p5.Vector;
        radius: number;
        maxSpeed: number;
        maxForce: number;
        color: number;
        id: number;
        imanted: boolean;
        opacity: number;

        constructor(x: number, y: number, id: number) {
          this.pos = p.createVector(
            x + p.random(-p.width * 0.05, p.width * 0.05), 
            y + p.random(-p.height * 0.05, p.height * 0.05)
          );
          this.vel = p5.Vector.random2D().mult(p.random(0.5, 1.5));
          this.acc = p.createVector(0, 0);
          this.target = p.createVector(x, y);
          this.radius = p.random(2, 4);
          this.maxSpeed = p.random(1, 3);
          this.maxForce = p.random(0.1, 0.3);
          this.color = p.random(200, 255);
          this.id = id;
          this.imanted = false;
          this.opacity = 255;
        }

        update() {
          const mouse = p.createVector(mouseX, mouseY);
          
          const mouseInfluence = p5.Vector.sub(mouse, this.pos);
          const mouseDistance = mouseInfluence.mag();
          
          if (gameActive && isMouseInsideCanvas && mouseDistance < 60 && !this.imanted && !isHoveringContent && !celebrationActive) {
            this.imanted = true;
            imantedParticles.add(this.id);
            
            const newCount = imantedParticles.size;
            setImantedCount(newCount);
            setIsNewImant(true);
            
            dotSizeMultiplier = 1 + (newCount * 0.01);
            
            if (newCount >= totalParticles) {
              celebrateSuccess();
            }
          }
          
          if (this.imanted && gameActive) {
            if (!isHoveringContent && !celebrationActive) {
              mouseInfluence.setMag(this.maxSpeed * 2);
              this.vel = mouseInfluence;
              this.pos = p5.Vector.lerp(this.pos, mouse, 0.1);
            }
            
            if (this.id === Array.from(imantedParticles)[0]) {
              setCounterPosition({ x: this.pos.x, y: this.pos.y });
            }
          } else {
            if (mouseDistance < 120 && !celebrationActive) {
              mouseInfluence.setMag(-1 * (120 - mouseDistance) * 0.05);
              this.applyForce(mouseInfluence);
            } else if (mouseDistance < 200 && !celebrationActive) {
              mouseInfluence.setMag((mouseDistance - 120) * 0.01);
              this.applyForce(mouseInfluence);
            }
            
            const desired = p5.Vector.sub(this.target, this.pos);
            const distance = desired.mag();
            let speed = this.maxSpeed;
            
            if (distance < 100) {
              speed = p.map(distance, 0, 100, 0, this.maxSpeed);
            }
            
            desired.setMag(speed);
            const steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);
            
            this.applyForce(steer.mult(0.1));
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
          }
          
          // Handle transition opacity for dots
          if (!dotsVisible) {
            this.opacity = p.max(this.opacity - 15, 0); // Fade out faster
          } else {
            this.opacity = p.min(this.opacity + 10, 255); // Fade in slower
          }
        }
        
        applyForce(force: p5.Vector) {
          this.acc.add(force);
        }
        
        display() {
          p.noStroke();

          // Skip drawing if opacity is 0
          if (this.opacity <= 0) return;
          
          // Apply the opacity from the particle state
          const displayOpacity = this.opacity / 255;
          
          if (this.imanted && gameActive && !isHoveringContent) {
            // Use the counter background color for imanted dots
            p.fill(dotColor.r, dotColor.g, dotColor.b, 200 * displayOpacity * fadeOutOpacity);
            p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
          } else if (this.imanted && gameActive && isHoveringContent) {
            p.fill(dotColor.r, dotColor.g, dotColor.b, 50 * displayOpacity * fadeOutOpacity);
            p.circle(this.pos.x, this.pos.y, this.radius * 2.5 * dotSizeMultiplier);
          } else {
            const alpha = p.map(p5.Vector.dist(this.pos, this.target), 0, 100, 90, 40);
            p.fill(dotColor.r, dotColor.g, dotColor.b, alpha * displayOpacity);
            p.circle(this.pos.x, this.pos.y, this.radius * 2);
          }
        }
        
        connect(particles: Particle[]) {
          // Skip connections if dots aren't visible
          if (this.opacity <= 40) return;
          
          particles.forEach(particle => {
            if (particle.opacity <= 40) return;
            
            const d = p5.Vector.dist(this.pos, particle.pos);
            if (d < 100) {
              const alpha = p.map(d, 0, 100, 20, 0) * (this.opacity / 255) * (particle.opacity / 255);
              p.stroke(0, alpha);
              p.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
          });
        }
      }
      
      const celebrateSuccess = () => {
        triggerCelebration();
      };
      
      const resetGame = () => {
        imantedParticles.clear();
        particles.forEach(p => p.imanted = false);
        setImantedCount(0);
        setIsNewImant(false);
        celebrationCount = 0;
        hasShownToast = false;
        dotSizeMultiplier = 1;
        fadeOutOpacity = 1;
      };
      
      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight * 0.95);
        canvas.parent(containerRef.current!);
        
        const cols = 10;
        const rows = 8;
        const gridWidth = p.width * 0.95;
        const gridHeight = p.height * 0.95;
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        const startX = (p.width - gridWidth) / 2;
        const startY = (p.height - gridHeight) / 2;
        
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (particles.length < particleCount) {
              const x = startX + cellWidth * (i + 0.5);
              const y = startY + cellHeight * (j + 0.5);
              const particle = new Particle(x, y, particles.length);
              particles.push(particle);
            }
          }
        }
      };
      
      p.draw = () => {
        p.clear();
        
        for (let i = 0; i < particles.length; i++) {
          particles[i].connect(particles.slice(i + 1));
        }
        
        particles.forEach(particle => {
          particle.update();
          particle.display();
        });
      };
      
      p.windowResized = () => {
        // Don't update grid during celebration
        if (celebrationActive) return;
        
        // Throttle grid updates
        const now = Date.now();
        if (now - lastGridUpdate < gridUpdateDelay) return;
        lastGridUpdate = now;
        
        p.resizeCanvas(p.windowWidth, p.windowHeight * 0.95);
        
        const cols = 10;
        const rows = 8;
        const gridWidth = p.width * 0.95;
        const gridHeight = p.height * 0.95;
        
        const cellWidth = gridWidth / cols;
        const cellHeight = gridHeight / rows;
        
        const startX = (p.width - gridWidth) / 2;
        const startY = (p.height - gridHeight) / 2;
        
        particles.forEach((particle, index) => {
          const i = index % cols;
          const j = Math.floor(index / cols);
          particle.target.x = startX + cellWidth * (i + 0.5);
          particle.target.y = startY + cellHeight * (j + 0.5);
        });
      };
      
      p.mouseMoved = () => {
        if (celebrationActive) return; // Don't update mouse position during celebration
        
        mouseX = p.mouseX;
        mouseY = p.mouseY;
        
        if (typeof window !== 'undefined') {
          window.mouseX = p.mouseX;
          window.mouseY = p.mouseY;
        }
        
        if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
          if (isMouseInsideCanvas) {
            isMouseInsideCanvas = false;
            setIsMouseInside(false);
          }
        } else {
          isMouseInsideCanvas = true;
          setIsMouseInside(true);
        }
      };
      
      p.touchMoved = () => {
        if (celebrationActive) return false; // Don't update touch position during celebration
        
        if (p.touches.length > 0 && p.touches[0]) {
          const touch = p.touches[0] as unknown as { x: number, y: number };
          mouseX = touch.x || p.windowWidth / 2;
          mouseY = touch.y || p.windowHeight / 2;
          
          if (typeof window !== 'undefined') {
            window.mouseX = mouseX;
            window.mouseY = mouseY;
          }
          
          if (mouseX < 0 || mouseX > p.width || mouseY < 0 || mouseY > p.height) {
            if (isMouseInsideCanvas) {
              isMouseInsideCanvas = false;
              setIsMouseInside(false);
            }
          } else {
            isMouseInsideCanvas = true;
            setIsMouseInside(true);
          }
        }
        return false;
      };
    };

    sketchRef.current = new p5(sketch);

    return () => {
      sketchRef.current?.remove();
    };
  }, [gameActive, fadeOutCollected, celebrationActive, dotsVisible]);

  const handleMouseEnterContent = () => {
    setIsHoveringContent(true);
  };

  const handleMouseLeaveContent = () => {
    setIsHoveringContent(false);
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef} 
        className={`w-full h-[95vh] relative ${className || ''}`}
        style={{ touchAction: 'none' }}
      />
      
      {showWinMessage && (
        <div className="absolute left-1/2 top-[1em] transform -translate-x-1/2 px-6 py-4 bg-white text-black rounded-lg text-xl font-medium z-50 text-center whitespace-nowrap animate-win-message border-2 border-black shadow-md">
          Congratulations! You've collected all dots!
        </div>
      )}
      
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent pointer-events-none" 
        style={{ zIndex: 10 }} 
      />
      
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-64 h-32"
        onMouseEnter={handleMouseEnterContent}
        onMouseLeave={handleMouseLeaveContent}
      />
      
      {gameActive && (
        <div 
          className={`fixed px-3 py-1 ${counterColor} text-white rounded-full text-sm font-mono z-20 pointer-events-none transition-all duration-300 ease-out ${isMouseInside ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            left: `calc(${typeof window !== 'undefined' ? (counterPosition.x || window.mouseX || window.innerWidth / 2) : '50%'}px + 1em)`,
            top: `calc(${typeof window !== 'undefined' ? (counterPosition.y || window.mouseY || window.innerHeight / 2) : '50%'}px + 1em)`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out, opacity 0.3s ease-out'
          }}
        >
          {imantedCount}/{totalParticles}
        </div>
      )}
    </div>
  );
};

export default ParticleHeader;
