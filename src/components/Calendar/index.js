import React, {useState} from "react"
import classnames from 'classnames'
import * as calendar from './calendar'
import './index.css'
import EventForm from "./EventForm"

export default function Calendar() {
  const defaultProps = {
    date: new Date(),
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс']
  }

  const [date, setDate] = useState(defaultProps.date)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [chosenDate, setChosenDate] = useState(null)
  const [visibleForm, setVisibleForm] = useState(false)
  const [visibleEvent, setVisibleEvent] = useState(false)
  const [inputEvent, setInputEvent] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [inputName, setInputName] = useState('')
  const [textarea, setTextArea] = useState('')

  const handlePrevMonthButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1))
  }

  const handleNextMonthButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1))
  }

  const handleDayClick = date => {
    setSelectedDate( date )
    setVisibleForm(true)
    setChosenDate(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`)
  }

  const handleCloseClick = () => {
    setVisibleForm(false)
  }

  const handleInputEventChange = (event) => {
    setInputEvent(event.target.value)
  }

  const handleInputDateChange = (event) => {
    setInputDate(event.target.value)
  }

  const handleInputNameChange = (event) => {
    setInputName(event.target.value)
  }

  const handleTextareaChange = (event) => {
    setTextArea(event.target.value)
  }

  const handleDeleteButtonClick = () => {
    setInputEvent('')
    setInputDate('')
    setInputName('')
    setTextArea('')
  }

  const handleDoneButtonClick = () => {
    setVisibleEvent(true)
  }

  const monthData = calendar.getMonthData(date.getFullYear(), date.getMonth())

  return (<>
    <div className="wrapper_header">
      <header className="header">
        <button className="header__add-button button">Добавить</button>
        <button className="header__reload-button button">Обновить</button>
        <div className="header__input-container">
          <input
            className="header__input input"
            placeholder="Событие, дата или участник"
            type="text"
          />
        </div>
      </header>
    </div>
    <div className="wrapper">
      <div className="date">
        <button onClick={handlePrevMonthButtonClick} className="date__back-button">{'<'}</button>
        <span className="date__month">{defaultProps.monthNames[date.getMonth()]} {date.getFullYear()}</span>
        <button onClick={handleNextMonthButtonClick} className="date__next-button">{'>'}</button>
        <button className="date__today-button">Сегодня</button>
      </div>
      <div className="calendar">
        {monthData.map((week, index) =>
          <>
            {week.map((date, index) => date ?
              <div
                className={classnames('calendar__item', {
                  'today': calendar.areEqual(date, currentDate),
                  'selected': calendar.areEqual(date, selectedDate)
                })}
                key={index}
                onClick={() => handleDayClick(date)}
                id={`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`}
              >{date.getDate()}
                <h2></h2>
                <span></span>
              </div>
              :
              <div className="calendar__item"> </div>
            )}
            {visibleForm && <EventForm
              onCloseClick = {handleCloseClick}
              onInputEventChange = {handleInputEventChange} inputEvent={inputEvent}
              onInputDateChange = {handleInputDateChange} inputDate={inputDate}
              onInputNameChange = {handleInputNameChange} inputName={inputName}
              onTextareaChange = {handleTextareaChange} textarea={textarea}
              onDeleteButtonClick = {handleDeleteButtonClick}
              onDoneButtonClick = {handleDoneButtonClick}
              chosenDate={chosenDate}
            />}
          </>
        )}
      </div>
    </div>
    </>)
}