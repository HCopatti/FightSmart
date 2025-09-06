import React from 'react';
import { FaPlus } from "react-icons/fa";
import type { ClassData } from './Calendar'; // Importação de tipo

interface CalendarDayViewProps {
    currentDate: Date;
    classes: ClassData[];
    openAddModal: (date: Date, hour: string) => void;
    openEditModal: (classToEdit: ClassData) => void;
    openDeleteModal: (classToDelete: ClassData) => void;
}

export default function CalendarDayView({ currentDate, classes, openAddModal, openEditModal }: CalendarDayViewProps) {
    const [hoveredCell, setHoveredCell] = React.useState<{ day: string; hour: string } | null>(null);

    const allHours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    const classesToday = classes.filter(cls => {
        const classDate = new Date(cls.date);
        return classDate.toDateString() === currentDate.toDateString();
    });

    const hoursWithClasses = new Set(classesToday.map(cls => cls.startTime.substring(0, 5)));
    const hoursToDisplay = hoursWithClasses.size > 0
        ? allHours.filter(hour =>
            hoursWithClasses.has(hour) ||
            hoursWithClasses.has(allHours[allHours.indexOf(hour) - 1]) ||
            hoursWithClasses.has(allHours[allHours.indexOf(hour) + 1])
        )
        : allHours.slice(8, 18);

    if (hoursToDisplay.length === 0) {
        hoursToDisplay.push('08:00', '09:00', '10:00');
    }

    return (
        <div className="grid grid-cols-[auto_1fr] gap-x-2 text-sm overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="sticky top-0 bg-gray-800 text-white font-bold p-2 text-right z-10">Hora</div>
            <div className="sticky top-0 bg-gray-800 text-white font-bold p-2 text-center z-10">
                {currentDate.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
            </div>
            {hoursToDisplay.map(hour => {
                const day = currentDate.toDateString();
                const isHovered = hoveredCell?.day === day && hoveredCell?.hour === hour;
                const currentClasses = classesToday.filter(cls => cls.startTime.substring(0, 5) === hour);
                
                return (
                    <React.Fragment key={hour}>
                        <div className="py-2 px-1 text-right border-t border-gray-700">{hour}</div>
                        <div
                            className="py-2 px-2 border-t border-gray-700 relative group min-h-[40px] flex flex-col justify-center"
                            onMouseEnter={() => setHoveredCell({ day, hour })}
                            onMouseLeave={() => setHoveredCell(null)}
                            onClick={() => openAddModal(currentDate, hour)}
                        >
                            {currentClasses.length > 0 ? (
                                currentClasses.map(cls => (
                                    <div
                                        key={cls.id}
                                        className="bg-blue-600 text-white p-1 rounded-md text-xs truncate cursor-pointer hover:bg-blue-700 transition-colors my-0.5"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Evita que o clique se propague para a célula
                                            openEditModal(cls);
                                        }}
                                    >
                                        {cls.name}
                                    </div>
                                ))
                            ) : (
                                isHovered && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                        <FaPlus className="text-green-400 text-lg" />
                                    </div>
                                )
                            )}
                        </div>
                    </React.Fragment>
                );
            })}
        </div>
    );
}