const email = require('../services/email')
const fs = require('fs').promises

const rootDir = '/home/ia/too-large/problem_ideas/student_works/final'
// const file = `${rootDir}/achac17/asm_exam_checker/exam_checker.s`
const solutionDir = `/home/ia/too-large/problem_ideas/problems`
const solution1 = `${solutionDir}/asm_exam_checker/solution.s`
const solution2 = `${solutionDir}/asm_tall_trees/solution.s`
// /*
fs.readFile(`${rootDir}/results.csv`)
    .then(f => {
        const lines = f.toString().split('\n')
        lines.slice(0, lines.length - 2).map((line, index) => {
            const [path, emailId, nuMistakes] = line.split(',')
            const message = nuMistakes.includes('empty') ? `ცარიელი ფაილი` : `${nuMistakes} შეცდომა`
            const file = `${rootDir}/${path}`
            setTimeout(() => {
                email.sendEmail(`${emailId}@freeuni.edu.ge`,
                    `პარადიგმების ფინალური: ესემბლი`,
                    `გამარჯობა, 
                    
                    გიგზავნით ესემბლის ქულას და ამოხსნას შესადარებლად 
              და განმარტების საპოვნელად. 

              თქვენ გქონდათ ${message}.
              
             სწორ ამოხსნაში 33 ხაზია და სავარაუდოდ პროცენტულად ამ 
              რიცხვის მიმართ დაითვლება საბოლოო შეფასება (ხაზებს - შეცდომების რაოდენობა გაყოფილი ხაზებზე).
               უფრო დეტალურად მოგვიანებით გაცნობებებთ გიორგი მაგრამ დიდი სხვაობა არ იქნება.
              
              // N: რომელ ხაზებშიც მიწერია, იქ შეცდომა გაქვთ და ამოხსნის
              შესაბამის ხაზს / ნაწილს დააკვირდით. თუ რაიმე გაურკვეველია, მიპასუხეთ ამ მეილზე, მაგრამ ჯერ
              ჰენდაუთებს გადახედეთ. მეილზე სამშაბათამდე გიპასუხებთ.

              ია
            `,
                    () => console.log(emailId),
                    [{ filename: 'work.txt', path: file },
                    { filename: 'solution_exam.txt', path: solution1 },
                    { filename: 'solution_trees.txt', path: solution2 }]
                )
            }, index * 5000)
            console.log(path, emailId, nuMistakes)
        })
    })
    // */
/*
email.sendEmail('marvinzem@gmail.com',
    'without fs',
    'hello',
    () => console.log('h'),
    [{ filename: 'a.txt', path: solution1 }]
)
*/
