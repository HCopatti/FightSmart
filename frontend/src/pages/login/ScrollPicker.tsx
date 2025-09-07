import * as React from "react";


interface ScrollPickerProps {
  values: string[];
  value: string;
  onChange: (val: string) => void;
  height?: number; // altura de cada item
}

export const ScrollPicker: React.FC<ScrollPickerProps> = ({
  values,
  value,
  onChange,
  height = 48,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  
  // Mantém o item selecionado centralizado
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const containerHeight = containerRef.current.offsetHeight;
    const padding = (containerHeight - height) / 2;
    
    // adiciona padding dinâmico top/bottom
    containerRef.current.style.paddingTop = `${padding}px`;
    containerRef.current.style.paddingBottom = `${padding}px`;
    
    
    const index = values.indexOf(value);
    if (containerRef.current && index >= 0) {
      containerRef.current.scrollTo({
        top: index * height,
        behavior: "auto",
      });
    }
  }, [value, values, height]);
  
  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / height);
    const selected = values[index];
    if (selected !== value) onChange(selected);
  };
  
  // Lógica de arrastar para rolar
  const isDragging = React.useRef(false);
  const startY = React.useRef(0);
  const scrollStart = React.useRef(0);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // evita seleção de texto e scroll nativo
    isDragging.current = true;
    startY.current = e.clientY;
    if (containerRef.current) scrollStart.current = containerRef.current.scrollTop;
  };
  
  let animationFrame: number;
  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault(); // ajuda a evitar “travadas”
    if (!isDragging.current || !containerRef.current) return;
    const delta = startY.current - e.clientY;
    
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(() => {
      containerRef.current!.scrollTop = scrollStart.current + delta;
    });
  };
  
  const handleMouseUp = () => {
    if (!isDragging.current || !containerRef.current) return;
    isDragging.current = false;
    
    // Ajusta para o item mais próximo (snap manual)
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / height);
    containerRef.current.scrollTo({
      top: index * height,
      behavior: "smooth",
    });
    onChange(values[index]);
  };
  
  React.useEffect(() => {
    // adiciona os listeners globais enquanto arrasta
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  
  return (
    <div
    ref={containerRef}
    onScroll={handleScroll}
    onMouseDown={handleMouseDown}
    className="overflow-y-scroll scroll-smooth snap-y snap-mandatory border border-gray-300 rounded-lg h-48 ${isDragging.current ? 'cursor-grabbing' : 'cursor-grab'}"                    
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}>
    {values.map((val, idx) => (
      <div
      key={idx}
      className="snap-center flex items-center justify-center px-2 py-2 select-none"
      style={{ height }}
      >
      {val}
      </div>
    ))}
    </div>
  );
};
