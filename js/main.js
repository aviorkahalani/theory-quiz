// services
import { questService } from './services/questService.js'
import { customAlert } from './alerts.js'

let gQuests = null

onload = () => {
  gQuests = questService.query()
  document.querySelector('.page-start').style.display = 'block'
}

document.querySelector('.btn-start').addEventListener('click', initGame)
function initGame() {
  renderQuest()
  document.querySelector('.page-start').style.display = 'none'
}

function renderQuest() {
  document.querySelector('.page-quest').style.display = 'block'
  let questIdx = questService.getCurrQuest()
  let quest = gQuests[questIdx]
  let strHTML = `
    <article>
      <h3 class="display-5">${quest.content}</h3>
      <ul class="list-group p-0 gap-1">
        <button data-answer="0" class="list-group-item list-group-item-action">${quest.answers[0]}</button>
        <button data-answer="1" class="list-group-item list-group-item-action">${quest.answers[1]}</button>
      </ul>
    </article>
  `
  document.querySelector('.page-quest').innerHTML = strHTML
  const elAnswers = document.querySelectorAll('.list-group-item')
  elAnswers.forEach((elAnswer) => {
    elAnswer.addEventListener('click', onCheckAnswer)
  })
}

function onCheckAnswer(ev) {
  if (questService.getCurrQuest() > gQuests.length - 2) {
    showGameOver()
    return
  }

  let answer = +ev.target.dataset.answer
  let isCorrectAnswer = questService.checkAnswer(answer)
  if (isCorrectAnswer) customAlert('יססס, תשובה נכונה!', 'success')
  else customAlert('אחלה תשובה אבל היא לא נכונה למבחן הזה', 'danger')

  if (questService.getNumOfMistakes() >= 3) {
    showGameOver(false)
    return
  }

  renderQuest()
}

function showGameOver(isWin = true) {
  document.querySelector('.page-quest').style.display = 'none'
  document.querySelector('.page-final').style.display = 'block'
  let strHTML = ''
  if (isWin)
    strHTML = `
    <h1>כל הכבוד, עברת את המבחן!</h1>
    <img src="../assets/win.gif" alt="#" />
  `
  else
    strHTML = `
    <h1>תמיד אפשר לרפרש ולהתחיל מחדש :)</h1>
    <img src="../assets/lose.gif" alt="#" />
  `
  const elFinalPage = document.querySelector('.page-final')
  elFinalPage.innerHTML = strHTML
}
