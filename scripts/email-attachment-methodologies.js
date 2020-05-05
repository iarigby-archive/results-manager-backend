const email = require('../services/email')
const fs = require('fs').promises

const rootDir = '/home/ia/too-large/cs106a/2019/final'
const worksDir = `${rootDir}/works`
// const file = `${rootDir}/results_all_final.csv`
const file = `${rootDir}/results_wrong.csv`
const extra_message = `
                    თქვენს ნაშრომს არასწორი სახელი ქონდა. (აკლდა წელი 
                  ან რომელიმე ასო) და გაითვალისწინეთ რომ ყურადღებით იყოთ შემდეგ ჯერზე.`
async function main() {
    fs.readFile(file)
        .then(f => {
            const lines = f.toString().split('\n')
            lines.slice(0, lines.length - 1).map((line, index) => {
                const array = line.split(',')
                const dir = array[0]
                const emailId = array[1]
                const grades = array.slice(2, array.length - 1)
                const results = []
                for (let i = 0; i < grades.length / 3; i++) {
                    results.push({
                        problem: grades[3*i],
                        score: grades[3*i + 1],
                        max_score: grades[3*i + 2]
                    })
                }
                const path = `${worksDir}/${dir}`
                const attachments = results.map(e => {
                    const problemName = e.problem.split('.')[0]
                    return {
                        fiename: `${problemName}.txt`,
                        path: `${path}/${e.problem}`
                    }
                })
                setTimeout(() => {
                    email.sendEmail(`${emailId}@freeuni.edu.ge`,
                        `პროგრამირების მეთოდოლოგიების ფინალურის შედეგი`,
                        `გამარჯობა, 
                    
                       გიგზავნით ფინალურის შესწორებულ ნაშრომს.

                       ${extra_message}

                       თქვენი შედეგი:
${results.map(e => `${e.problem}: ${e.score}/${e.max_score}`).join('\n')}

                      კონკრეტულ ამოცანაზე კითხვისთვის მიმართეთ მხოლოდ მის გამსწორებელს, 
                    ანუ ყველას ერთად არა, ქვემოთ წერია ვინ რომელი გავასწორეთ 
                    და რა მისამართზე მოგვწეროთ.

                       მეილს რომ მოგვწერთ, სათაური/subject დააწერეთ 
                    "მეთოდოლოგიების ფინალური: <ვარიანტი> <ამოცანის სახელი> გასაჩივრება".
                    "<>"-იანად ჩაანაცვლეთ, მაგალითად: 
                    "მეთოდოლოგიების ფინალური: ვარიანტი 1 graphics.java გასაჩივრება"
                    
                      მე თუ მწერთ მაინც ახალი მეილი უნდა მომწეროთ ამ სათაურით.
                    ამ მეილზე პასუხები ავტომატურად წაიშლება. 
                    
                      ია
                    
                    
                    ${checking}
            `,
                        () => console.log(emailId),
                       attachments
                    )
                }, index * 5000)
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
}

const checking = `
მეილები: 
gburd14@freeuni.edu.ge
ekavt15@freeuni.edu.ge
nsana15@freeuni.edu.ge
gpetr12@freeuni.edu.ge
zmesh15@freeuni.edu.ge
mzhgh14@freeuni.edu.ge
i.mghvdliashvili@freeuni.edu.ge

ვინ რომელი ამოცანა შეასწორა:

ვარიანტი 1
1-graphics.java ია
V1 - person.java - მიშო
V1 - substring - ნოდო
1 - greedy.java - ზაური

ვარიანტი 2
2-strings.java ია
V2 - siblings.java - მიშო
V2 - friends - ნოდო
2 - water.java - ზაური

ვარიანტი 3
3-polygon.java ია
V3 - exam.java - მიშო
V3 - word - ნოდო
3 - items.java - ზაური

ვარიანტი 4
4-randomText.java ია
V4 - grandkid.java - მიშო
V4 - neighbors - ნოდო
4 - fire.java - ზაური

ვარიანტი 5
5-merge.java - გუგა
5-robot.java - ელენე
V5 - acquaintance - გათი
V5 - ballgame - გათი


ვარიანტი 6
6-period.java - გუგა
6-search.java - ელენე
V6 - create.java - მიშო
V6 - circle - გათი


ვარიანტი 7
7-acquaintance.java - გუგა
7-apples.java - ელენე
7-merge.java - ელენე
V7 - squareGame - გათი


ვარიანტი 8
8-create.java - გუგა
8-square.java - გუგა
8-vertical.java - ელენე
V8 - divide - გათი
`

main()