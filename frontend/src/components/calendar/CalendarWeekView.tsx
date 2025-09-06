import React, { useState } from 'react';
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";
import type { ClassData } from './Calendar';

interface CalendarWeekViewProps {
    currentDate: Date;
    classes: ClassData[];
    openAddModal: (date: Date, hour: string) => void;
    openEditModal: (classToEdit: ClassData) => void;
    openDeleteModal: (classToDelete: ClassData) => void;
}

export default function CalendarWeekView({ currentDate, classes, openAddModal, openEditModal, openDeleteModal }: CalendarWeekViewProps) {
    const [hoveredCell, setHoveredCell] = useState<{ day: string, hour: string } | null>(null);

    const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(currentDate);
        d.setDate(currentDate.getDate() - currentDate.getDay() + i);
        return d;
    });

    // const allHours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
    const relevantHours = new Set<string>();

    daysOfWeek.forEach(day => {
        classes.filter(cls => new Date(cls.date).toDateString() === day.toDateString())
            .forEach(cls => relevantHours.add(cls.startTime.substring(0, 5)));
    });

    const hoursToDisplay = Array.from(relevantHours).sort();
    
    if (hoursToDisplay.length === 0) {
        hoursToDisplay.push('08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00');
    }

    return (
        <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-x-1 text-sm overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)]">
            <div className="sticky left-0 top-0 bg-gray-800 text-white font-bold p-2 text-right z-30 min-w-[50px]">Hora</div>
            {daysOfWeek.map(day => (
                <div key={day.toISOString()} className="sticky top-0 bg-gray-800 text-white font-bold p-2 text-center border-l border-gray-700 z-20 min-w-[100px]">
                    {day.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                </div>
            ))}
            {hoursToDisplay.map(hour => (
                <React.Fragment key={hour}>
                    <div className="sticky left-0 bg-gray-800 py-2 px-1 text-right border-t border-gray-700 z-30 min-w-[50px]">{hour}</div>
                    {daysOfWeek.map(day => {
                        const cellKey = `${day.toISOString()}-${hour}`;
                        const isHovered = hoveredCell?.day === day.toDateString() && hoveredCell?.hour === hour;
                        const classesInCell = classes.filter(cls => new Date(cls.date).toDateString() === day.toDateString() && cls.startTime.substring(0, 5) === hour);
                        
                        return (
                            <div
                                key={cellKey}
                                className="py-2 px-2 border-t border-gray-700 border-l relative group min-h-[40px] flex flex-col justify-center"
                                onMouseEnter={() => setHoveredCell({ day: day.toDateString(), hour })}
                                onMouseLeave={() => setHoveredCell(null)}
                                onClick={() => openAddModal(day, hour)}
                            >
                                {classesInCell.length > 0 ? (
                                    classesInCell.map(cls => (
                                        <div
                                            key={cls.id}
                                            className="bg-blue-600 text-white p-1 rounded-md text-xs truncate cursor-pointer hover:bg-blue-700 transition-colors my-0.5"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openEditModal(cls);
                                            }}
                                        >
                                            {cls.name}
                                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                <FaPen
                                                    className="text-yellow-400 text-lg mx-1 cursor-pointer"
                                                    onClick={(e) => { e.stopPropagation(); openEditModal(cls); }}
                                                />
                                                <FaTrash
                                                    className="text-red-400 text-lg mx-1 cursor-pointer"
                                                    onClick={(e) => { e.stopPropagation(); openDeleteModal(cls); }}
                                                />
                                            </div>
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
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}