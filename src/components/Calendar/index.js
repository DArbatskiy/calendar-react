import React, {useState} from "react"
import classnames from 'classnames'
import * as calendar from './calendar'
import './index.css'

export default function Calendar() {
  const defaultProps = {
    date: new Date(),
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт' , 'Пт', 'Сб', 'Вс']
  }

  const [date, setDate] = useState(defaultProps.date)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const handlePrevMonthButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1))
  }

  const handleNextMonthButtonClick = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1))
  }

  const handleDayClick = date => {
    setSelectedDate( date )
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
              >{date.getDate()}</div>
              :
              <div className="calendar__item"> </div>
            )}
          </>
        )}
      </div>
    </div>
    </>)
}