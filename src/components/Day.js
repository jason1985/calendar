import { useEffect, useState, React, useRef } from 'react'
import Modal from 'react-modal'
import Task from './Task'

Modal.setAppElement('#root')

const Day = ({ date, today }) => {
  const [items, setItems] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [text, setText] = useState('')
  const [editId, setEditId] = useState('')

  const inputRef = useRef()
  const editInputRef = useRef()

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
        onClose()
      } else if (editModalOpen === true) {
        editModalClose()
      }
    }
  }

  const handleClick = () => {
    setModalOpen(true)
    setText('')
  }

  const onClose = () => {
    setModalOpen(false)
    if (text === '') return
    setItems((oldVal) => [...oldVal, { icon: '', color: 'white', task: text }])
  }

  const removeTask = (id) => {
    setItems(items.filter((item) => item.task !== id))
    console.log('removing a task')
  }

  const changeColor = (id, color) => {
    setItems(
      items.map((item) => {
        if (item.task === id) {
          return { icon: item.icon, color: color, task: item.task }
        }
        return item
      })
    )
  }

  const changeIcon = (id, icon) => {
    setItems(
      items.map((item) => {
        if (item.task === id) {
          return { icon: icon, color: item.color, task: item.task }
        }
        return item
      })
    )
  }

  const editModalClose = () => {
    setEditModalOpen(false)
    if (text === '') return

    setItems(
      items.map((item) => {
        if (item.task === editId) {
          return { icon: item.icon, color: item.color, task: text }
        }
        return item
      })
    )
  }

  const handleEdit = (id) => {
    setEditId(id)
    setText(id)
    setEditModalOpen(true)
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
        onRequestClose={onClose}
      >
        <p>add</p>
        <input
          spellcheck="false"
          ref={inputRef}
          onKeyPress={handelKeyPress}
          onChange={(e) => setText(e.target.value)}
          type="text"
          value={text}
        />
        <button onClick={onClose}> ok </button>
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
