function TaskItem({ task, onDelete, onEdit }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{task.title}</span>
      <div>
        <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(task)}>Editar</button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(task.id)}>Eliminar</button>
      </div>
    </li>
  )
}

export default TaskItem
