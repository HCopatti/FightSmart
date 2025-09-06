// src/components/ClassesCalendar.jsx
import { FaPen, FaTrash } from "react-icons/fa";
import type { ClassData } from './Calendar'; // Importar a interface do componente principal

interface ClassesCalendarProps {
    classes: ClassData[]; // Recebe a lista de aulas já filtrada
    openEditModal: (classToEdit: ClassData) => void;
    openDeleteModal: (classToDelete: ClassData) => void;
}

const ClassesCalendar = ({ classes, openEditModal, openDeleteModal }: ClassesCalendarProps) => {
    return (
        <div className="flex flex-col gap-1">
            {classes.length > 0 ? (
                classes.map((aula) => (
                    <div
                        key={aula.id}
                        className="bg-blue-600 text-white p-1 rounded-md text-xs truncate cursor-pointer hover:bg-blue-700 transition-colors relative group"
                    >
                        {/* Conteúdo da aula */}
                        <div onClick={() => openEditModal(aula)}>
                            <strong>{aula.name}</strong> - Prof: {aula.teacher.user.username}
                        </div>
                        {/* Ícones de hover para edição e exclusão */}
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <FaPen className="text-yellow-400 text-lg ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); openEditModal(aula); }} />
                            <FaTrash className="text-red-400 text-lg ml-2 cursor-pointer" onClick={(e) => { e.stopPropagation(); openDeleteModal(aula); }} />
                        </div>
                    </div>
                ))
            ) : null}
        </div>
    );
};

export default ClassesCalendar;