import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import * as FaIcons from 'react-icons/fa'

const Task = ({
  task,
  delTask,
  color,
  changeColor,
  icon,
  changeIcon,
  edit,
  id,
}) => {
  return (
    <>
      <ContextMenuTrigger id={id}>
        <div className="task" style={{ backgroundColor: `${color}` }}>
          {icon === 'cake' ? (
            <FaIcons.FaBirthdayCake className="cake" />
          ) : icon === 'plane' ? (
            <FaIcons.FaPlane className="icons" />
          ) : (
            ''
          )}
          {task}
        </div>
      </ContextMenuTrigger>

      <ContextMenu className="contextMenu" id={id}>
        <MenuItem onClick={() => edit(id)}>edit</MenuItem>

        <MenuItem className="menuItem" onClick={() => delTask(id)}>
          delete
        </MenuItem>
        <MenuItem className="colorContainer">
          <MenuItem
            className="circle red"
            onClick={() => changeColor(id, '#ffb3ba')}
          ></MenuItem>
          <MenuItem
            className="circle orange"
            onClick={() => changeColor(id, '#ffdfba')}
          ></MenuItem>
          <MenuItem
            className="circle yellow"
            onClick={() => changeColor(id, '#ffffba')}
          ></MenuItem>
          <MenuItem
            className="circle green"
            onClick={() => changeColor(id, '#baffc9')}
          ></MenuItem>
          <MenuItem
            className="circle blue"
            onClick={() => changeColor(id, '#bae1ff')}
          ></MenuItem>
        </MenuItem>

        <MenuItem className="colorContainer">
          <MenuItem onClick={() => changeIcon(id, 'cake')}>
            <FaIcons.FaBirthdayCake />
          </MenuItem>
          <MenuItem onClick={() => changeIcon(id, 'plane')}>
            <FaIcons.FaPlane />
          </MenuItem>
          <MenuItem onClick={() => changeIcon(id, '')}>""</MenuItem>
        </MenuItem>
      </ContextMenu>
    </>
  )
}

export default Task
