import React from 'react'
import './index.css'

export default function EventForm(props) {

    const {onCloseClick,
        inputEvent, inputDate, inputName, textarea,
        onInputEventChange, onInputDateChange, onInputNameChange, onTextareaChange,
        onDeleteButtonClick, onDoneButtonClick,chosenDate} = props

    return <div className='eventForm'>
        <button className='eventForm__closeButton' onClick={onCloseClick}>&#10006;</button>
        <input className='eventForm__inputEvent' placeholder="Событие" value={inputEvent} onChange={onInputEventChange} />
        <input className='eventForm__inputDate' placeholder="День, месяц, год" defaultValue={chosenDate} value={chosenDate} onChange={onInputDateChange} />
        <input className='eventForm__inputName' placeholder="Имена участников" value={inputName} onChange={onInputNameChange} />
        <textarea className='eventForm__textarea' placeholder="Описание" value={textarea} onChange={onTextareaChange} />
        <button className='eventForm__doneButton' onClick={onDoneButtonClick}>Готово</button>
        <button className='eventForm__deleteButton' onClick={onDeleteButtonClick}>Удалить</button>
    </div>
}