import React from 'react';
import { FaTimes, FaTrash, FaSave } from "react-icons/fa";
import type { ClassData } from './Calendar';

// Define a interface das props de forma mais limpa
interface CalendarModalProps {
    showModal: boolean;
    modalMode: 'add' | 'edit' | 'delete' | null;
    selectedClass: ClassData | null;
    selectedDateTime: { date: Date, hour: string } | null;
    formData: {
        name: string;
        room: string;
        startTime: string;
        daysOfWeek: number[];
    };
    onClose: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDayChange: (dayIndex: number) => void;
    onAddSubmit: (e: React.FormEvent) => void;
    onEditSubmit: (e: React.FormEvent) => void;
    onDeleteConfirm: () => void;
}

export default function CalendarModal({
    showModal,
    modalMode,
    selectedClass,
    selectedDateTime,
    formData,
    onClose,
    onInputChange,
    onDayChange,
    onAddSubmit,
    onEditSubmit,
    onDeleteConfirm
}: CalendarModalProps) {
    if (!showModal) {
        return null;
    }

    // A data formatada para exibição no modal
    const formattedDate = selectedDateTime?.date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative overflow-y-scroll">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                    <FaTimes size={20} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-blue-400">
                    {modalMode === 'add' && 'Adicionar Nova Aula'}
                    {modalMode === 'edit' && 'Editar Aula'}
                    {modalMode === 'delete' && 'Remover Aula'}
                </h2>
                
                {/* Formulário de Adição */}
                {modalMode === 'add' && (
                    <form onSubmit={onAddSubmit} className="space-y-4">
                        <p className="text-sm text-gray-400">
                            Adicionando aula em: <span className="font-semibold text-blue-300">{formattedDate} às {selectedDateTime?.hour}</span>
                        </p>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nome da Aula:</label>
                            <input type="text" id="name" value={formData.name} onChange={onInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white" required />
                        </div>
                        <div>
                            <label htmlFor="room" className="block text-sm font-medium text-gray-300">Sala:</label>
                            <input type="text" id="room" value={formData.room} onChange={onInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div>
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-300">Horário:</label>
                            <input type="time" id="startTime" value={formData.startTime} onChange={onInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Repetir em:</label>
                            <div className="flex flex-wrap gap-2">
                                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, index) => (
                                    <label key={index} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.daysOfWeek.includes(index)} onChange={() => onDayChange(index)} className="form-checkbox text-blue-600 rounded" />
                                        <span className="text-gray-300">{day}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Adicionar</button>
                        </div>
                    </form>
                )}
                
                {/* Formulário de Edição */}
                {modalMode === 'edit' && selectedClass && (
                    <form onSubmit={onEditSubmit} className="space-y-4">
                        <p className="text-gray-300">Editando aula: <span className="font-bold text-blue-300">{selectedClass.name}</span></p>
                        <div>
                            <label htmlFor="editName" className="block text-sm font-medium text-gray-300">Novo Nome:</label>
                            <input type="text" id="name" defaultValue={selectedClass.name} onChange={onInputChange} className="mt-1 block w-full p-2 rounded-md bg-gray-700 border-gray-600 text-white" />
                        </div>
                        <div className="flex justify-between space-x-2">
                            <button type="button" onClick={() => { onClose(); onDeleteConfirm(); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                                <FaTrash /> <span>Excluir</span>
                            </button>
                            <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                                <FaSave /> <span>Salvar</span>
                            </button>
                        </div>
                    </form>
                )}
                
                {/* Confirmação de Exclusão */}
                {modalMode === 'delete' && selectedClass && (
                    <div className="space-y-4 text-center">
                        <p className="text-lg text-gray-300">Tem certeza que deseja remover a aula:</p>
                        <p className="text-xl font-bold text-blue-300">"{selectedClass.name}"</p>
                        <div className="flex justify-center space-x-4 mt-6">
                            <button onClick={onDeleteConfirm} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Remover</button>
                            <button onClick={onClose} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}