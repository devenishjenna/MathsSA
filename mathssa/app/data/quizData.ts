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
          question: "Simplify: $3x + 2y - x + 5y$",
          options: ["$2x + 7y$", "$4x + 7y$", "$2x - 7y$", "$4x - 3y$"],
          answerIndex: 0
        },
        {
          question: "Factorise: $x^2 - 9$",
          options: ["$(x - 3)(x - 3)$", "$(x + 3)(x - 3)$", "$(x + 9)(x - 1)$", "$(x - 9)(x + 1)$"],
          answerIndex: 1
        },
        {
          question: "Expand: $(x + 4)(x - 2)$",
          options: ["$x^2 + 2x - 8$", "$x^2 - 2x - 8$", "$x^2 + 6x - 8$", "$x^2 + 2x + 8$"],
          answerIndex: 0
        },
        {
          question: "Simplify: $\frac{4x^2y^3}{2xy}$",
          options: ["$2x^2y^2$", "$2xy^2$", "$2xy^3$", "$4xy^2$"],
          answerIndex: 1
        },
        {
          question: "Which expression is a perfect square trinomial?",
          options: ["$x^2 + 6x + 8$", "$x^2 + 4x + 4$", "$x^2 - 4x + 6$", "$x^2 + 5x + 4$"],
          answerIndex: 1
        }
      ]
    },
    "straight-line-graphs": {
      quiz: [
        {
          question: "What is the gradient of the line $y = 3x - 5$?",
          options: ["$-5$", "$3$", "$5$", "$-3$"],
          answerIndex: 1
        },
        {
          question: "What is the $y$-intercept of $y = 2x + 7$?",
          options: ["$2$", "$-7$", "$7$", "$-2$"],
          answerIndex: 2
        },
        {
          question: "Which line is parallel to $y = 4x + 1$?",
          options: ["$y = -4x + 1$", "$y = 4x - 3$", "$y = \\frac{1}{4}x + 1$", "$y = -\\frac{1}{4}x + 3$"],
          answerIndex: 1
        },
        {
          question: "A line passes through $(0, 2)$ and $(1, 5)$. What is its equation?",
          options: ["$y = 2x + 5$", "$y = 3x + 2$", "$y = 5x + 2$", "$y = 3x - 2$"],
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
          question: "Simplify: $2^3 \\times 2^4$",
          options: ["$2^7$", "$2^{12}$", "$4^7$", "$2^{-1}$"],
          answerIndex: 0
        },
        {
          question: "Simplify: $x^5 \\div x^2$",
          options: ["$x^7$", "$x^3$", "$x^{10}$", "$x^{2.5}$"],
          answerIndex: 1
        },
        {
          question: "What is the value of $5^0$?",
          options: ["$0$", "$5$", "$1$", "$50$"],
          answerIndex: 2
        },
        {
          question: "Simplify: $(2x^2)^3$",
          options: ["$2x^6$", "$6x^5$", "$8x^6$", "$8x^5$"],
          answerIndex: 2
        },
        {
          question: "Solve for $x$: $2^x = 32$",
          options: ["$x = 4$", "$x = 5$", "$x = 6$", "$x = 16$"],
          answerIndex: 1
        }
      ]
    }
  },
  "grade-11": {
    "exponents-and-surds": {
      quiz: [
        {
          question: "Simplify: $\sqrt{12} + \sqrt{27}$",
          options: ["$\sqrt{39}$", "$5\sqrt{3}$", "$6\sqrt{3}$", "$3\sqrt{5}$"],
          answerIndex: 1
        },
        {
          question: "Simplify: $x^{\frac{1}{2}} \times x^{\frac{3}{2}}$",
          options: ["$x^2$", "$x^{\frac{3}{4}}$", "$x^{\frac{5}{2}}$", "$x$"],
          answerIndex: 0
        },
        {
          question: "Which of the following is equal to $\sqrt[4]{x^3}$?",
          options: ["$x^{\frac{4}{3}}$", "$x^{\frac{3}{4}}$", "$x^{12}$", "$4x^3$"],
          answerIndex: 1
        },
        {
          question: "Solve for $x$: $3^{x+1} = 27$",
          options: ["$x = 1$", "$x = 2$", "$x = 3$", "$x = 9$"],
          answerIndex: 1
        },
        {
          question: "Simplify: $(\sqrt{5} + \sqrt{3})(\sqrt{5} - \sqrt{3})$",
          options: ["$\sqrt{2}$", "$2$", "$\sqrt{15}$", "$2\sqrt{2}$"],
          answerIndex: 1
        }
      ]
    }
  }
}