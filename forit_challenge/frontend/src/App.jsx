import { useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Login from './components/Login'

// ===========================================
// NUEVO COMPONENTE: Calendario Mensual Básico
// ===========================================
const MonthlyCalendar = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // 0 (Ene) a 11 (Dic)
    const currentDay = today.getDate();

    // Obtener el nombre del mes y el año
    const monthName = today.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });

    // Encontrar el primer día del mes (para saber qué día de la semana cae)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    // Obtener el número total de días en el mes
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarCells = [];
    const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // 1. Celdas vacías para el desfase del inicio de mes
    // El domingo es 0. Si el mes empieza un miércoles (3), agregamos 3 celdas vacías.
    const startDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Ajuste para que Lun sea el primer día
    for (let i = 0; i < startDayIndex; i++) {
        calendarCells.push(<div key={`empty-${i}`} className="col p-0"></div>);
    }
    
    // 2. Celdas para cada día del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentDay;
        const classes = isToday 
            ? 'bg-primary text-white fw-bold rounded-circle' 
            : 'bg-light text-dark rounded-circle border-0';

        calendarCells.push(
            <div key={day} className="col p-1 text-center">
                <div className={`d-inline-flex justify-content-center align-items-center small p-1 ${classes}`} style={{ width: '2rem', height: '2rem' }}>
                    {day}
                </div>
            </div>
        );
    }
    
    // 3. Rellenar con celdas vacías al final si es necesario (opcional)
    
    return (
        <div className="text-center">
            <h6 className="text-primary text-uppercase fw-bold mb-3">{monthName}</h6>
            
            {/* Encabezado de la semana */}
            <div className="row row-cols-7 g-0 mb-1 small text-muted">
                {daysOfWeek.map(d => (
                    <div key={d} className="col fw-bold">{d.charAt(0)}</div> // Solo la inicial
                ))}
            </div>

            {/* Días del calendario */}
            <div className="row row-cols-7 g-0">
                {calendarCells}
            </div>
        </div>
    );
};


function App() {
    // ==========================================
    // 1. DECLARACIÓN DE ESTADOS (SIN CAMBIOS)
    // ==========================================
    const [user, setUser] = useState(localStorage.getItem('user') || '')
    const [tasks, setTasks] = useState([])
    const [taskToEdit, setTaskToEdit] = useState(null)
    const API_URL = 'http://localhost:5000/api/tasks'

    const userTasks = (tasks || []).filter(t => t.user === user)


    // ==========================================
    // 2. FUNCIONES DE MANEJO (SIN CAMBIOS)
    // ==========================================
    // ... (Mantener todas las funciones: handleLogin, handleLogout, handleAddOrUpdate, handleToggleDone, handleDelete, handleEdit)
    const handleLogin = (name) => {
        setUser(name)
        localStorage.setItem('user', name)
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        setUser('')
    }

    const handleAddOrUpdate = (taskData) => {
        const fechaActual = new Date().toLocaleString('es-AR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })

        const taskWithUser = { ...taskData, user, createdAt: fechaActual }

        if (taskToEdit) {
            fetch(`${API_URL}/${taskToEdit.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(taskWithUser),
            })
                .then(() => {
                    setTasks(tasks.map(t => (t.id === taskToEdit.id ? { ...t, ...taskWithUser } : t)))
                    setTaskToEdit(null)
                })
                .catch(err => console.error('Error al actualizar tarea:', err))
        } else {
            fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...taskWithUser, done: false }),
            })
                .then(res => res.json())
                .then(newTask => setTasks([...tasks, newTask]))
                .catch(err => console.error('Error al agregar tarea:', err))
        }
    }

    const handleDelete = (id) => {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
            .then(() => setTasks(tasks.filter(t => t.id !== id)))
            .catch(err => console.error('Error al eliminar tarea:', err))
    }

    const handleEdit = (task) => setTaskToEdit(task)

    const handleToggleDone = (task) => {
        const updatedTask = { ...task, done: !task.done }

        fetch(`${API_URL}/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        })
            .then(() => {
                setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)))
            })
            .catch(err => console.error('Error al cambiar estado de tarea:', err))
    }


    // ==========================================
    // 3. EFECTOS (SIN CAMBIOS)
    // ==========================================
    useEffect(() => {
        fetch(API_URL)
          .then(res => res.json())
          .then(data => setTasks(data))
          .catch(err => console.error('Error al obtener tareas:', err))
    }, [])


    // ==========================================
    // 4. RENDERIZADO CONDICIONAL Y JSX (MODIFICADO para usar MonthlyCalendar)
    // ==========================================
    if (!user) return <Login onLogin={handleLogin} />

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* NAVBAR (SIN CAMBIOS) */}
            <header className="p-3 border-bottom bg-white shadow-sm">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-rocket-takeoff fs-3 text-primary me-2"></i> 
                        <span className="fs-5 fw-bold text-dark">ForIT Tasks</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-3 text-muted">👋 Hola, {user}</span>
                        <button className="btn btn-outline-primary btn-sm" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-1"></i> Salir
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow-1 py-5">
                <div className="container-fluid px-5"> 
                    <div className="text-center mb-5">
                        <h1 className="fw-bold display-5 text-primary mb-1">Tu lista de tareas</h1>
                        <p className="text-muted mb-3 text-uppercase fw-semibold">
                            {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', })}
                        </p>
                        <p className="lead text-muted mb-2">
                            Agregá, editá o eliminá tus pendientes del día.
                        </p>
                    </div>

                    {/* LAYOUT EN TRES COLUMNAS (3 + 6 + 3 = 12) */}
                    <div className="row g-4 align-items-stretch">
                        
                        {/* Columna 1 (Izquierda): Formulario (SIN CAMBIOS) */}
                        <div className="col-12 col-lg-3 d-flex flex-column">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-semibold mb-3 text-primary">Agregá una nueva tarea</h5>
                                    <TaskForm onSubmit={handleAddOrUpdate} taskToEdit={taskToEdit} />
                                </div>
                            </div>
                        </div>

                        {/* Columna 2 (Centro): Lista de Tareas (SIN CAMBIOS) */}
                        <div className="col-12 col-lg-6 d-flex flex-column">
                            <div className="card border-0 shadow-sm h-100">
                                <div className="card-body p-4">
                                    <h5 className="fw-semibold mb-3 text-primary">Tus tareas actuales ({userTasks.length})</h5>
                                    <TaskList tasks={userTasks} onDelete={handleDelete} onEdit={handleEdit} onToggleDone={handleToggleDone} />
                                </div>
                            </div>
                        </div>
                        
                        {/* Columna 3 (Derecha): Sidebar con CALENDARIO MENSUAL */}
                        <div className="col-12 col-lg-3 d-flex flex-column">
                            <div className="card border-0 shadow-sm h-100 p-4 bg-white">
                                <h5 className="fw-semibold mb-3 text-primary">Calendario</h5>
                                <div className="mb-4">
                                    <MonthlyCalendar /> {/* NUEVO COMPONENTE */}
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-trophy fs-4 text-warning me-2"></i>
                                    <p className="mb-0 small text-muted">Logros o metas del día.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER (SIN CAMBIOS) */}
                    <footer className="text-center text-muted small mt-5">
                        Desarrollado para el Challenge ForIT 2025
                    </footer>
                </div>
            </main>
        </div>
    )
}

export default App