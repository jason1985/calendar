import {
  ContextMenu,
  MenuItem,
  ContextMenuTrigger,
  SubMenu,
} from 'react-contextmenu'
import * as FaIcons from 'react-icons/fa'

const Task = ({
  task,
  delTask,
  color,
  changeColor,
  edit,
  icon,
  changeIcon,
}) => {
  return (
    <>
      <ContextMenuTrigger id={task}>
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

      <ContextMenu className="contextMenu" id={task}>
        <MenuItem onClick={() => edit(task)}>edit</MenuItem>

        <MenuItem className="menuItem" onClick={() => delTask(task)}>
          delete
        </MenuItem>
        <MenuItem className="colorContainer">
          <MenuItem
            className="circle red"
            onClick={() => changeColor(task, '#ffb3ba')}
          ></MenuItem>
          <MenuItem
            className="circle orange"
            onClick={() => changeColor(task, '#ffdfba')}
          ></MenuItem>
          <MenuItem
            className="circle yellow"
            onClick={() => changeColor(task, '#ffffba')}
          ></MenuItem>
          <MenuItem
            className="circle green"
            onClick={() => changeColor(task, '#baffc9')}
          ></MenuItem>
          <MenuItem
            className="circle blue"
            onClick={() => changeColor(task, '#bae1ff')}
          ></MenuItem>
        </MenuItem>

        <MenuItem className="colorContainer">
          <MenuItem onClick={() => changeIcon(task, 'cake')}>
            <FaIcons.FaBirthdayCake />
          </MenuItem>
          <MenuItem onClick={() => changeIcon(task, 'plane')}>
            <FaIcons.FaPlane />
          </MenuItem>
          <MenuItem onClick={() => changeIcon(task, '')}>""</MenuItem>
        </MenuItem>
      </ContextMenu>
    </>
  )
}

export default Task

/* <SubMenu className="subMenu" title="change color">
  <MenuItem onClick={() => changeColor(task, 'red')} className="colors">
    red
  </MenuItem>
  <MenuItem
    onClick={() => changeColor(task, 'green')}
    className="colors"
  >
    green
  </MenuItem>
  <MenuItem
    onClick={() => changeColor(task, 'rgb(41,182,246)')}
    className="colors"
  >
    blue
  </MenuItem>
</SubMenu> */
