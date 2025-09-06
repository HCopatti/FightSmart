// src/components/Calendar.tsx
import React, { useState, useEffect } from 'react';
import CalendarDayView from './CalendarDayView';
import CalendarWeekView from './CalendarWeekView';
import CalendarMonthView from './CalendarMonthView';
import CalendarModal from './CalendarModal'; // Agora você importa e usa este componente

// Interface unificada para a estrutura da aula.
export interface ClassData {
    id: number;
    name: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string | null;
    brief: string | null;
    teacher: {
        user: {
            username: string;
        };
    };
    academy: {
        name: string;
    };
    date: string;
    // Adicione outras propriedades que você possa usar, como 'room' ou 'title'
    // Ex: title: string;
    // Ex: room: string;
}

export default function Calendar() {
    const [view, setView] = useState('week'); // 'day', 'week', 'month'
    const [currentDate, setCurrentDate] = useState(new Date());
    const [classes, setClasses] = useState<ClassData[]>([]);
    
    // Estados para o modal
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit' | 'delete' | null>(null);
    const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<{ date: Date, hour: string } | null>(null);
    
    // Estado do formulário
    const [formData, setFormData] = useState({
        name: '',
        room: '', // Assumindo que você terá um campo de sala
        startTime: '',
        daysOfWeek: [] as number[],
    });
    
    // Funções de manipulação do formulário
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };
    
    const handleDayChange = (dayIndex: number) => {
        setFormData(prevData => {
            const isSelected = prevData.daysOfWeek.includes(dayIndex);
            if (isSelected) {
                return {
                    ...prevData,
                    daysOfWeek: prevData.daysOfWeek.filter(day => day !== dayIndex)
                };
            } else {
                return {
                    ...prevData,
                    daysOfWeek: [...prevData.daysOfWeek, dayIndex].sort((a, b) => a - b)
                };
            }
        });
    };
    
    // Função única para buscar todas as classes
    const fetchAllClasses = async () => {
        try {
            const response = await fetch('http://localhost:5000/classesRefresh');
            if (!response.ok) {
                throw new Error('Falha ao buscar as aulas.');
            }
            const data: ClassData[] = await response.json();
            setClasses(data);
        } catch (err) {
            console.error(err);
        }
    };
    
    useEffect(() => {
        fetchAllClasses();
    }, [currentDate]);
    
    // Funções para abrir o modal em diferentes modos
    const openAddModal = (date: Date, hour: string) => {
        setModalMode('add');
        setFormData({
            name: '',
            room: '',
            startTime: hour,
            daysOfWeek: [date.getDay()],
        });
        setSelectedDateTime({ date, hour });
        setShowModal(true);
    };
    
    const openEditModal = (classToEdit: ClassData) => {
        setModalMode('edit');
        setSelectedClass(classToEdit);
        setShowModal(true);
    };
    
    const openDeleteModal = (classToDelete: ClassData) => {
        setModalMode('delete');
        setSelectedClass(classToDelete);
        setShowModal(true);
    };
    
    const closeModal = () => {
        setShowModal(false);
        setModalMode(null);
        setSelectedClass(null);
        setSelectedDateTime(null);
    };
    
    // Funções de navegação
    const goToPrevious = () => {
        let newDate = new Date(currentDate);
        if (view === 'day') newDate.setDate(newDate.getDate() - 1);
        else if (view === 'week') newDate.setDate(newDate.getDate() - 7);
        else if (view === 'month') newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };
    
    const goToNext = () => {
        let newDate = new Date(currentDate);
        if (view === 'day') newDate.setDate(newDate.getDate() + 1);
        else if (view === 'week') newDate.setDate(newDate.getDate() + 7);
        else if (view === 'month') newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };
    
    // Funções de submit para o modal
    const handleAddClassSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedDateTime) {
            console.error("Data e hora não selecionadas.");
            return;
        }
        
        const newClassData = {
            name: formData.name,
            startTime: formData.startTime,
            dayOfWeek: selectedDateTime.date.getDay(),
            date: selectedDateTime.date.toISOString(),
            teacherId: 1, // Substitua por um ID dinâmico
            academyId: 1, // Substitua por um ID dinâmico
        };
        
        try {
            const response = await fetch('http://localhost:5000/classesAdd', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClassData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro da API:", errorData.error);
                throw new Error('Falha ao adicionar aula');
            }
            
            const newClass = await response.json();
            setClasses([...classes, newClass.class]);
            closeModal();
        } catch (error) {
            console.error("Erro ao adicionar aula:", error);
        }
    };
    
    const handleEditClassSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedClass) return;
        
        // Implemente a lógica de edição aqui, enviando o PUT para sua API
        // Exemplo:
        // const updatedClassData = { ...selectedClass, name: formData.name, ... };
        // const response = await fetch(`http://localhost:5000/classes/${selectedClass.id}`, { ... });
        
        closeModal();
    };
    
    const handleDeleteClass = async () => {
        if (!selectedClass) return;
        
        // Implemente a lógica de remoção aqui, enviando o DELETE para sua API
        // Exemplo:
        // const response = await fetch(`http://localhost:5000/classes/${selectedClass.id}`, { method: 'DELETE' });
        
        closeModal();
    };
    
    
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
        {/* Cabeçalho do Calendário */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-gray-800 p-3 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold mb-4 md:mb-0 text-blue-400">
        Calendário de Aulas - Urussanga
        </h1>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="flex space-x-2">
        <button onClick={goToPrevious} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold transition-colors">&lt;</button>
        <span className="text-xl font-semibold px-4 py-2 bg-gray-700 rounded-lg">
        {currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
        </span>
        <button onClick={goToNext} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-bold transition-colors">&gt;</button>
        </div>
        <div className="flex space-x-2 mt-3 sm:mt-0">
        <button onClick={() => setView('day')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>Dia</button>
        <button onClick={() => setView('week')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>Semana</button>
        <button onClick={() => setView('month')} className={`px-4 py-2 rounded-lg font-medium transition-colors ${view === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}>Mês</button>
        </div>
        </div>
        </div>
        
        {/* Botões de funcionalidade (Adicionar/Remover/Editar) - Vamos integrá-los no modal/interação */}
        <div className="flex flex-col md:flex-row align-center items-center mb-6 bg-gray-800 p-3 rounded-lg shadow-md">
        {/* A mensagem de seleção agora será dinâmica */}
        <h1 className="text-xl font-extrabold mb-4 md:mb-0 text-white">
        {/* {modalMode === 'add' && <span>Adicionar nova aula</span>}
            {modalMode === 'edit' && <span>Editando aula</span>}
            {modalMode === 'delete' && <span>Remover aula</span>} */}
            {/* {!modalMode && <span>Clique <span className='cursor-pointer text-green-400 hover:text-green-800' onClick={() => openAddModal(currentDate, '08:00')}>aqui</span> ou uma célula para adicionar ou em uma aula para editar/remover.</span>} */}
            {<button onClick={() => openAddModal(currentDate, '08:00')} className={`px-4 py-2 rounded-lg font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700`}>Adicionar aula</button>}
            </h1>
            </div>
            
            {/* Corpo Principal do Calendário */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg min-h-[600px] max-h-[calc(100vh-100px)] overflow-hidden">
            {view === 'day' && <CalendarDayView currentDate={currentDate} classes={classes} openAddModal={openAddModal} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />}
            {view === 'week' && <CalendarWeekView currentDate={currentDate} classes={classes} openAddModal={openAddModal} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />}
            {view === 'month' && <CalendarMonthView currentDate={currentDate} classes={classes} openAddModal={openAddModal} openEditModal={openEditModal} openDeleteModal={openDeleteModal} />}
            </div>
            
            {/* Modal - Agora usando o componente dedicado */}
            <CalendarModal
            showModal={showModal}
            modalMode={modalMode}
            selectedClass={selectedClass}
            selectedDateTime={selectedDateTime}
            formData={formData}
            onClose={closeModal}
            onInputChange={handleInputChange}
            onDayChange={handleDayChange}
            onAddSubmit={handleAddClassSubmit}
            onEditSubmit={handleEditClassSubmit}
            onDeleteConfirm={handleDeleteClass}
            />
            </div>
        );
    };