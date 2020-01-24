const url = 'http://116.203.187.241:8080'

module.exports = {
    path: '../data',
    diffScript: './scripts/git-diff-total.sh',
    // url: 'file:///home/ia/dev/results-manager/frontend/index.html',
    url: url,
    email: 'i.mghvdliashvili@freeuni.edu.ge',
    getUrl: (student) => `${url}?id=${student.id}`,
    tasks: {
        midterm3: {
            'max-decreasing-subsegment': [
                'max-decreasing-subsegment.scm'
            ],
            talent_show: [
                'talent_show.c'
            ]
        },
        midterm4: {
            threads_server_room: [
                'maintenance.c',
                // TODO
            ],
            stack_list: [
                'stack.c'
            ],
            vector_list: [
                'vector.c'
            ]
        },
        final: {
            asm_exam_checker: [
                // 'exam_checker.c',
                'exam_checker.s'
            ],
            asm_tall_trees: [
                // 'tall_trees.c',
                'tall_trees.s'
            ],
            farthest_node: [
                'farthest_node.scm',
                // 'tests.scm'
            ],
            closest_node: [
                'closest_node.scm',
                // 'tests.scm'
            ],
            sorted_multi_set: [
                'sorted_multi_set.c',
                // 'sorted_multi_set.h'
            ],
            threads_dj_school: [
                'dj_school.c',
                // 'dj_school.h',
                // 'helper.c',
                // 'helper.h',
                // 'tests.c'
            ]

        }
    }
}