import { utilService } from './utilService.js'

export const questService = {
  query,
  getCurrQuest,
  getNumOfMistakes,
  checkAnswer,
}

const STORAGE_KEY = 'quest_db'
let gQuests = _createQuests()
let gMistakes = 0
let gCurrQuestIdx = 0

function query() {
  return utilService.loadFromStorage(STORAGE_KEY)
}

function getCurrQuest() {
  return gCurrQuestIdx
}

function getNumOfMistakes() {
  return gMistakes
}

function checkAnswer(answer) {
  if (answer !== gQuests[gCurrQuestIdx].correctAnswerIdx) {
    gMistakes++
    return false
  }
  gCurrQuestIdx++
  return true
}

function _createQuests() {
  let quests = [
    {
      _id: utilService.makeId(),
      content: 'את נוסעת בתל אביב וצריכה שניה לקנות פלאפל, מה תעשי?',
      answers: [
        'אמצא מקום חניה ואחנה שם את רכבי בצורה מסודרת',
        'אעלה טיפה על המדרכה ואגיד לאיזה ילד לבדוק שאין פקח',
      ],
      correctAnswerIdx: 1,
    },
    {
      _id: utilService.makeId(),
      content: 'השעה 2 בלילה. אין אף אחד בכביש ויש רמזור אדום. מה תעשי?',
      answers: [
        'אעבור ואחכה שבועיים לראות אם יש דוח',
        'אחכה בסבלנות עד שהרמזור יתחלף לירוק ואמשיך בדרכי',
      ],
      correctAnswerIdx: 1,
    },
    {
      _id: utilService.makeId(),
      content:
        'קבעת תור עם מי שעושה את הלק גל הכי טוב בעיר אבל ילד בא לחצות את הכביש. מה תעשי',
      answers: [
        'מה קרה? כשאני הייתי ילדה אף אחד לא עצר לי. שיתמודד.',
        'אעצור ואחייך אליו כדי להראות לו שהוא לא גורם לי צער',
      ],
      correctAnswerIdx: 0,
    },
    {
      _id: utilService.makeId(),
      content: 'מהו הפתרון היעיל לבעיית העייפות של הנהג?',
      answers: [
        'לעצור ולנוח, אולי אפילו לקנות סנדוויץ טונה בארומה',
        'להתאים את המהירות למצב העייפות (לנסוע לאט יותר ככל שהנהג עייף יותר)',
      ],
      correctAnswerIdx: 1,
    },
    {
      _id: utilService.makeId(),
      content: 'מה משפיע הכי הרבה על מפלס העצבים ברכב?',
      answers: ['חום, עייפות, מצב נפשי', 'מי שאחראי על המוזיקה'],
      correctAnswerIdx: 1,
    },
    {
      _id: utilService.makeId(),
      content: 'אביזרים הממתנים את חומרת הפגיעה בנוסעים בתאונת דרכים',
      answers: ['חגורות בטיחות, כריות אוויר ומשענות ראש', 'מגבים אחוריים ופנסי ערפל'],
      correctAnswerIdx: 1,
    },
  ]
  utilService.saveToStorage(STORAGE_KEY, quests)
  return quests
}
