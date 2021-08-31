import {format, getUnixTime, fromUnixTime, addMonths, subMonths, startOfWeek, endOfMonth, endOfWeek, eachDayOfInterval, isSameMonth, startOfMonth, isSameDay} from 'date-fns'


const datePickerButton = document.querySelector('.date-picker-button');
const datePickerCard = document.querySelector('.date-picker');
const pickerHeader = document.querySelector('.current-month');
const previousDateButton = document.querySelector('.prev-month-button');
const nextDateButton = document.querySelector('.next-month-button')
const dateGrid = document.querySelector('.date-picker-grid-dates')
let harry = new Date()

datePickerButton.addEventListener('click', () => {
    datePickerCard.classList.toggle('show')
    const tom = fromUnixTime(pickerHeader.dataset.selected);
    pickerHeader.innerText = format(tom, 'MMMM-yyyy')
    setCard(harry)
})

//------- first time on load
function setDate(harry){
    datePickerButton.innerText = format(harry, "MMMM do yyyy");
    pickerHeader.dataset.selected = getUnixTime(harry)
}
//--------

previousDateButton.addEventListener('click', () => {
    harry = subMonths(harry, 1);
    pickerHeader.innerText = format(harry, 'MMMM-yyyy')
    setCard(harry)
})

nextDateButton.addEventListener('click', () => {
    harry = addMonths(harry, 1);
    pickerHeader.innerText = format(harry, 'MMMM-yyyy')
    setCard(harry)
})

function setCard(){
    console.log('Harry after setting card', harry)
    dateGrid.innerHTML = ''
    const monthStartDate = startOfMonth(harry)
    const weekStartDate =  startOfWeek(monthStartDate);
    const monthEndDate = endOfMonth(harry)
    const weekEndDate = endOfWeek(monthEndDate)
    const monthDates = eachDayOfInterval({
        start: weekStartDate,
        end: weekEndDate
    })
    monthDates.forEach(monthDate => {
        const buttonDate = document.createElement("Button");
        buttonDate.classList.add('date');
        buttonDate.innerText = format(monthDate, 'd');
        dateGrid.appendChild(buttonDate);
        if(!isSameMonth(monthDate, harry)) {
            buttonDate.classList.add('date-picker-other-month-date')
        }
        if(isSameDay(monthDate, harry)) {
            buttonDate.classList.add('selected')
        }
        buttonDate.addEventListener('click', () => {
            harry = monthDate
            setDate(harry)
            datePickerCard.classList.remove('show')
            console.log('Harry after selection', harry)
            
        })
       
    }
    )
    setDate(harry);
}

setDate(new Date())