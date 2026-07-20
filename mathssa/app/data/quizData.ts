// INTERFACES
export interface Question {
  question: string
  options: string[]
  answerIndex: number
  answerExplanation: string
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
          answerIndex: 0,
          answerExplanation: "Combine like terms separately: $3x - x = 2x$ and $2y + 5y = 7y$, giving $2x + 7y$."
        },
        {
          question: "Factorise: $x^{2} - 9$",
          options: ["$(x - 3)(x - 3)$", "$(x + 3)(x - 3)$", "$(x + 9)(x - 1)$", "$(x - 9)(x + 1)$"],
          answerIndex: 1,
          answerExplanation: "This is a difference of squares: $x^2 - 9 = x^2 - 3^2 = (x + 3)(x - 3)$."
        },
        {
          question: "Expand: $(x + 4)(x - 2)$",
          options: ["$x^2 + 2x - 8$", "$x^2 - 2x - 8$", "$x^2 + 6x - 8$", "$x^2 + 2x + 8$"],
          answerIndex: 0,
          answerExplanation: "Use FOIL: $x^2 - 2x + 4x - 8 = x^2 + 2x - 8$."
        },
        {
          question: "Simplify: $\\tfrac{4x^2y^3}{2xy}$",
          options: ["$2x^2y^2$", "$2xy^2$", "$2xy^3$", "$4xy^2$"],
          answerIndex: 1,
          answerExplanation: "Divide coefficients and subtract exponents: $\\tfrac{4}{2} = 2$, $x^{2-1} = x$, $y^{3-1} = y^2$, giving $2xy^2$."
        },
        {
          question: "Which expression is a perfect square trinomial?",
          options: ["$x^2 + 6x + 8$", "$x^2 + 4x + 4$", "$x^2 - 4x + 6$", "$x^2 + 5x + 4$"],
          answerIndex: 1,
          answerExplanation: "$x^2 + 4x + 4 = (x + 2)^2$, since the middle term is twice the product of the square roots of the outer terms."
        }
      ]
    },
    "straight-line-graphs": {
      quiz: [
        {
          question: "What is the gradient of the line $y = 3x - 5$?",
          options: ["$-5$", "$3$", "$5$", "$-3$"],
          answerIndex: 1,
          answerExplanation: "In the form $y = mx + c$, the gradient is $m$. Here $m = 3$."
        },
        {
          question: "What is the $y$-intercept of $y = 2x + 7$?",
          options: ["$2$", "$-7$", "$7$", "$-2$"],
          answerIndex: 2,
          answerExplanation: "In the form $y = mx + c$, the $y$-intercept is $c$. Here $c = 7$."
        },
        {
          question: "Which line is parallel to $y = 4x + 1$?",
          options: ["$y = -4x + 1$", "$y = 4x - 3$", "$y = \\tfrac{1}{4}x + 1$", "$y = -\\tfrac{1}{4}x + 3$"],
          answerIndex: 1,
          answerExplanation: "Parallel lines have the same gradient. $y = 4x - 3$ also has gradient $4$."
        },
        {
          question: "A line passes through $(0, 2)$ and $(1, 5)$. What is its equation?",
          options: ["$y = 2x + 5$", "$y = 3x + 2$", "$y = 5x + 2$", "$y = 3x - 2$"],
          answerIndex: 1,
          answerExplanation: "The $y$-intercept is $2$ (from $(0,2)$). The gradient is $\\tfrac{5-2}{1-0} = 3$, so the equation is $y = 3x + 2$."
        },
        {
          question: "What does a negative gradient tell you about a line?",
          options: [
            "The line is horizontal",
            "The line slopes upward from left to right",
            "The line slopes downward from left to right",
            "The line passes through the origin"
          ],
          answerIndex: 2,
          answerExplanation: "A negative gradient means $y$ decreases as $x$ increases, so the line slopes downward from left to right."
        }
      ]
    },
    "exponents": {
      quiz: [
        {
          question: "Simplify: $2^3 \\times 2^4$",
          options: ["$2^7$", "$2^{12}$", "$4^7$", "$2^{-1}$"],
          answerIndex: 0,
          answerExplanation: "When multiplying powers with the same base, add the exponents: $2^{3+4} = 2^7$."
        },
        {
          question: "Simplify: $x^5 \\div x^2$",
          options: ["$x^7$", "$x^3$", "$x^{10}$", "$x^{2.5}$"],
          answerIndex: 1,
          answerExplanation: "When dividing powers with the same base, subtract the exponents: $x^{5-2} = x^3$."
        },
        {
          question: "What is the value of $5^0$?",
          options: ["$0$", "$5$", "$1$", "$50$"],
          answerIndex: 2,
          answerExplanation: "Any non-zero number raised to the power of $0$ equals $1$."
        },
        {
          question: "Simplify: $(2x^2)^3$",
          options: ["$2x^6$", "$6x^5$", "$8x^6$", "$8x^5$"],
          answerIndex: 2,
          answerExplanation: "Raise each factor to the power of 3: $2^3 = 8$ and $(x^2)^3 = x^6$, giving $8x^6$."
        },
        {
          question: "Solve for $x$: $2^x = 32$",
          options: ["$x = 4$", "$x = 5$", "$x = 6$", "$x = 16$"],
          answerIndex: 1,
          answerExplanation: "Write $32$ as a power of $2$: $32 = 2^5$, so $x = 5$."
        }
      ]
    }
  },
  "grade-11": {
    "exponents-and-surds": {
      quiz: [
        {
          question: "Simplify: $\\sqrt{12} + \\sqrt{27}$",
          options: ["$\\sqrt{39}$", "$5\\sqrt{3}$", "$6\\sqrt{3}$", "$3\\sqrt{5}$"],
          answerIndex: 1,
          answerExplanation: "Simplify each surd first: $\\sqrt{12} = 2\\sqrt{3}$ and $\\sqrt{27} = 3\\sqrt{3}$. Then add: $2\\sqrt{3} + 3\\sqrt{3} = 5\\sqrt{3}$."
        },
        {
          question: "Simplify: $x^{\\tfrac{1}{2}} \\times x^{\\tfrac{3}{2}}$",
          options: ["$x^2$", "$x^{\\tfrac{3}{4}}$", "$x^{\\tfrac{5}{2}}$", "$x$"],
          answerIndex: 0,
          answerExplanation: "When multiplying powers with the same base, add the exponents: $\\tfrac{1}{2} + \\tfrac{3}{2} = 2$, giving $x^2$."
        },
        {
          question: "Which of the following is equal to $\\sqrt[4]{x^3}$?",
          options: ["$x^{\\tfrac{4}{3}}$", "$x^{\\tfrac{3}{4}}$", "$x^{12}$", "$4x^3$"],
          answerIndex: 1,
          answerExplanation: "A root can be written as a fractional exponent: $\\sqrt[n]{x^m} = x^{\\tfrac{m}{n}}$, so $\\sqrt[4]{x^3} = x^{\\tfrac{3}{4}}$."
        },
        {
          question: "Solve for $x$: $3^{x+1} = 27$",
          options: ["$x = 1$", "$x = 2$", "$x = 3$", "$x = 9$"],
          answerIndex: 1,
          answerExplanation: "Write $27$ as a power of $3$: $27 = 3^3$, so $x + 1 = 3$, giving $x = 2$."
        },
        {
          question: "Simplify: $(\\sqrt{5} + \\sqrt{3})(\\sqrt{5} - \\sqrt{3})$",
          options: ["$\\sqrt{2}$", "$2$", "$\\sqrt{15}$", "$2\\sqrt{2}$"],
          answerIndex: 1,
          answerExplanation: "This is a difference of squares: $(\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$."
        }
      ]
    }
  }
}