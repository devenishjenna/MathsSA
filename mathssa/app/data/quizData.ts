// INTERFACES

export interface Question {
  question: string
  options: string[]
  answerIndex: number
}

interface Quiz {
  quiz: Question[]
}

interface QuizData {
  [gradeSlug: string]: {
    [topicSlug: string]: Quiz
  }
}

export const quizData: QuizData  = {
  "grade-10": {
    "introduction-to-functions": {
    quiz: [{
        question: "This is the first questiongr10?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 1
      },
      {
        question: "This is the second question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      },
      {
        question: "This is the third question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      }]
    },
    "straight-line-graphs": {
    quiz: [{
        question: "This is the first question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 1
      },
      {
        question: "This is the second question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      },
      {
        question: "This is the third question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      }]
    }
  },
   "grade-11": {
    "introduction-to-functions": {
      quiz: [{
        question: "This is the first question gr11?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 1
      },
      {
        question: "This is the second question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      },
      {
        question: "This is the third question?",
        options: ['This is options A', 'This is options B', 'This is options C', 'This is options D'],
        answerIndex: 3
      }]
  }}
}

