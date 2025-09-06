
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";
import type { ClassData } from './Calendar';

interface CalendarMonthViewProps {
    currentDate: Date;
    classes: ClassData[];
    openAddModal: (date: Date, hour: string) => void;
    openEditModal: (classToEdit: ClassData) => void;
    openDeleteModal: (classToDelete: ClassData) => void;
}

export default function CalendarMonthView({ currentDate, classes, openAddModal, openEditModal, openDeleteModal }: CalendarMonthViewProps) {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1));

    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const firstDayOfWeek = startOfMonth.getDay();
    const emptyStartDays = Array.from({ length: firstDayOfWeek });

    const totalDays = [...emptyStartDays, ...daysInMonth];

    return (
        <div className="grid grid-cols-7 gap-1 text-sm">
            {weekdays.map(day => (
                <div key={day} className="font-bold text-center p-2 bg-gray-700 rounded-t-lg">
                    {day}
                </div>
            ))}
            {totalDays.map((day, i) => {
                if (!day) {
                    return <div key={`empty-start-${i}`} className="p-2 bg-gray-800 border border-gray-700 rounded-sm"></div>;
                }

                const dayDate = day as Date;
                const classesOnThisDay = classes.filter(cls => new Date(cls.date).toDateString() === dayDate.toDateString());
                const isToday = dayDate.toDateString() === new Date().toDateString();

                return (
                    <div
                        key={dayDate.toISOString()}
                        className={`p-2 bg-gray-800 border border-gray-700 rounded-sm min-h-[100px] relative group overflow-hidden ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (classesOnThisDay.length === 0) {
                                openAddModal(dayDate, '08:00');
                            }
                        }}
                    >
                        <div className="font-semibold text-right mb-1">
                            {dayDate.getDate()}
                        </div>
                        <div className="flex flex-col gap-1">
                            {classesOnThisDay.length > 0 ? (
                                classesOnThisDay.map(cls => (
                                    <div
                                        key={cls.id}
                                        className="bg-blue-600 text-white p-1 rounded-md text-xs truncate cursor-pointer hover:bg-blue-700 transition-colors relative"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openEditModal(cls);
                                        }}
                                    >
                                        <div className="flex items-center">
                                            <strong className="flex-grow">{cls.name}</strong>
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                            <FaPen
                                                className="text-yellow-400 text-lg mx-1 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openEditModal(cls);
                                                }}
                                            />
                                            <FaTrash
                                                className="text-red-400 text-lg mx-1 cursor-pointer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDeleteModal(cls);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <FaPlus className="text-green-400 text-lg" />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}