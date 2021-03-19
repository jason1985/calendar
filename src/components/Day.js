import { useEffect, useState, React, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Modal from 'react-modal'
import Task from './Task'

Modal.setAppElement('#root')

const Day = ({ date, today, calendarinfo }) => {
  const [items, setItems] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [text, setText] = useState('')
  const [editId, setEditId] = useState('')

  const inputRef = useRef()
  const editInputRef = useRef()

  useEffect(() => {
    updateItemsFromStorage()
  }, [])

  useEffect(() => {
    updateStorage()
  }, [items])

  useEffect(() => {
    if (modalOpen === true) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 1)
    }
  }, [modalOpen])

  useEffect(() => {
    if (editModalOpen === true) {
      setTimeout(() => {
        editInputRef.current.focus()
      }, 1)
    }
  }, [editModalOpen])

  const handelKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (modalOpen === true) {
        addItem()
      } else if (editModalOpen === true) {
        editModalClose()
      }
    }
  }

  const handleClick = () => {
    setModalOpen(true)
    setText('')
  }

  const addItem = () => {
    setModalOpen(false)
    if (text === '') return
    setItems((oldVal) => [
      ...oldVal,
      { id: uuidv4(), icon: '', color: '#bae1ff', task: text },
    ])
    // updateStorage()
  }

  const removeTask = (id) => {
    setItems(items.filter((item) => item.id !== id))
    // updateStorage()
  }

  const changeColor = (id, color) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { id: item.id, icon: item.icon, color: color, task: item.task }
        }
        return item
      })
    )
    // updateStorage()
  }

  const changeIcon = (id, icon) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { id: item.id, icon: icon, color: item.color, task: item.task }
        }
        return item
      })
    )
    // updateStorage()
  }

  const editModalClose = () => {
    setEditModalOpen(false)
    if (text === '') return

    setItems(
      items.map((item) => {
        if (item.id === editId) {
          return { id: item.id, icon: item.icon, color: item.color, task: text }
        }
        return item
      })
    )
    // updateStorage()
  }

  const handleEdit = (id, task) => {
    setEditId(id)
    setText(task)
    setEditModalOpen(true)
  }

  const updateItemsFromStorage = () => {
    if (calendarinfo[date] === undefined) {
      // console.log("it's undefined")
    } else {
      setItems(
        calendarinfo[date].map((item) => {
          return {
            id: uuidv4(),
            icon: item.icon,
            color: item.color,
            task: item.task,
          }
        })
      )
    }
  }

  const updateStorage = () => {
    let arr = items.map((item) => {
      return { icon: item.icon, color: item.color, task: item.task }
    })

    let obj = JSON.parse(localStorage.getItem('calendarInfo'))
    obj = { ...obj, [date]: arr }

    localStorage.setItem(`calendarInfo`, JSON.stringify(obj))
    // console.log('updated calendarInfo localstorage:')
    // console.log(obj)
  }

  return (
    <div onDoubleClick={handleClick} className="day">
      {today === date ? (
        <div>
          <span className="today">{date}</span>
        </div>
      ) : (
        date
      )}
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={modalOpen}
        onRequestClose={addItem}
      >
        <p>add</p>
        <input
          spellCheck="false"
          ref={inputRef}
          onKeyPress={handelKeyPress}
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
        />
        <button onClick={addItem}> ok </button>
      </Modal>
      <Modal
        className="modal"
        overlayClassName="overlay"
        isOpen={editModalOpen}
        onRequestClose={editModalClose}
      >
        <p>edit</p>
        <input
          spellcheck="false"
          ref={editInputRef}
          onKeyPress={handelKeyPress}
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
        />
        <button onClick={editModalClose}> ok </button>
      </Modal>
      {items.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          icon={item.icon}
          changeIcon={changeIcon}
          edit={handleEdit}
          task={item.task}
          color={item.color}
          changeColor={changeColor}
          delTask={removeTask}
        />
      ))}
    </div>
  )
}

export default Day
