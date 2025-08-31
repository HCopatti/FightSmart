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

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="overflow-y-scroll scroll-smooth snap-y snap-mandatory border border-gray-300 rounded-lg h-48" // mostra 5 itens
    >
      {values.map((val, idx) => (
        <div
          key={idx}
          className="snap-center flex items-center justify-center h-12"
          style={{ height }}
        >
          {val}
        </div>
      ))}
    </div>
  );
};
