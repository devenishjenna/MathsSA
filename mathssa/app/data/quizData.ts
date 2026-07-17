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
export const quizData: QuizData = {
  "grade-10": {
    "algebraic-expressions": {
      quiz: [
        {
          question: "Simplify: 3x + 2y - x + 5y",
          options: ["2x + 7y", "4x + 7y", "2x - 7y", "4x - 3y"],
          answerIndex: 0
        },
        {
          question: "Factorise: x² - 9",
          options: ["(x - 3)(x - 3)", "(x + 3)(x - 3)", "(x + 9)(x - 1)", "(x - 9)(x + 1)"],
          answerIndex: 1
        },
        {
          question: "Expand: (x + 4)(x - 2)",
          options: ["x² + 2x - 8", "x² - 2x - 8", "x² + 6x - 8", "x² + 2x + 8"],
          answerIndex: 0
        },
        {
          question: "Simplify: (4x²y³) ÷ (2xy)",
          options: ["2x²y²", "2xy²", "2xy³", "4xy²"],
          answerIndex: 1
        },
        {
          question: "Which expression is a perfect square trinomial?",
          options: ["x² + 6x + 8", "x² + 4x + 4", "x² - 4x + 6", "x² + 5x + 4"],
          answerIndex: 1
        }
      ]
    },
    "straight-line-graphs": {
      quiz: [
        {
          question: "What is the gradient of the line y = 3x - 5?",
          options: ["-5", "3", "5", "-3"],
          answerIndex: 1
        },
        {
          question: "What is the y-intercept of y = 2x + 7?",
          options: ["2", "-7", "7", "-2"],
          answerIndex: 2
        },
        {
          question: "Which line is parallel to y = 4x + 1?",
          options: ["y = -4x + 1", "y = 4x - 3", "y = ¼x + 1", "y = -¼x + 3"],
          answerIndex: 1
        },
        {
          question: "A line passes through (0, 2) and (1, 5). What is its equation?",
          options: ["y = 2x + 5", "y = 3x + 2", "y = 5x + 2", "y = 3x - 2"],
          answerIndex: 1
        },
        {
          question: "What does a negative gradient tell you about a line?",
          options: [
            "The line is horizontal",
            "The line slopes upward from left to right",
            "The line slopes downward from left to right",
            "The line passes through the origin"
          ],
          answerIndex: 2
        }
      ]
    },
    "exponents": {
      quiz: [
        {
          question: "Simplify: 2³ × 2⁴",
          options: ["2⁷", "2¹²", "4⁷", "2⁻¹"],
          answerIndex: 0
        },
        {
          question: "Simplify: x⁵ ÷ x²",
          options: ["x⁷", "x³", "x¹⁰", "x²·⁵"],
          answerIndex: 1
        },
        {
          question: "What is the value of 5⁰?",
          options: ["0", "5", "1", "50"],
          answerIndex: 2
        },
        {
          question: "Simplify: (2x²)³",
          options: ["2x⁶", "6x⁵", "8x⁶", "8x⁵"],
          answerIndex: 2
        },
        {
          question: "Solve for x: 2ˣ = 32",
          options: ["x = 4", "x = 5", "x = 6", "x = 16"],
          answerIndex: 1
        }
      ]
    }
  },
  "grade-11": {
    "exponents-and-surds": {
      quiz: [
        {
          question: "Simplify: √12 + √27",
          options: ["√39", "5√3", "6√3", "3√5"],
          answerIndex: 1
        },
        {
          question: "Simplify: x^(1/2) × x^(3/2)",
          options: ["x²", "x^(3/4)", "x^(5/2)", "x"],
          answerIndex: 0
        },
        {
          question: "Which of the following is equal to ⁴√x³?",
          options: ["x^(4/3)", "x^(3/4)", "x^12", "4x³"],
          answerIndex: 1
        },
        {
          question: "Solve for x: 3^(x+1) = 27",
          options: ["x = 1", "x = 2", "x = 3", "x = 9"],
          answerIndex: 1
        },
        {
          question: "Simplify: (√5 + √3)(√5 - √3)",
          options: ["√2", "2", "√15", "2√2"],
          answerIndex: 1
        }
      ]
    }
  }
}