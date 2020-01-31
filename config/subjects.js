const email = 'i.mghvdliashvili@freeuni.edu.ge'

const paradigms = {
    name: 'paradigms',
    name_ge: 'პროგრამირების პარადიგმები',
    getTaskFiles: (task) =>
        task.files.map(f => `${task.name}/${f}`)
    ,
    exams: [
        {
            name: 'midterm3',
            name_ge: 'მესამე შუალედური',
            contact: {
                lost_files: email
            },
            tasks: [
                {
                    name: 'max-decreasing-subsegment',
                    files: [
                        'max-decreasing-subsegment.scm'
                    ]
                },
                {
                    name: 'talent_show',
                    files: [
                        'talent_show.c'
                    ]
                }
            ]
        },
        {
            name: 'midterm4',
            name_ge: 'მეოთხე შუალედური',
            contact: {
                lost_files: email
            },
            tasks: [
                {
                    name: 'threads_server_room',
                    files: [
                        'maintenance.c',
                        // TODO
                    ],
                },
                {
                    name: 'stack_list',
                    files: [
                        'stack.c'
                    ],
                },
                {
                    name: 'vector_list',
                    files: [
                        'vector.c'
                    ]
                }
            ]
        },
        {
            name: 'final',
            name_ge: 'ფინალური',
            tasks: [
                {
                    name: 'asm_exam_checker',
                    files: [
                        // 'exam_checker.c',
                        'exam_checker.s'
                    ],
                },
                {
                    name: 'asm_tall_trees',
                    files: [
                        // 'tall_trees.c',
                        'tall_trees.s'
                    ],
                },
                {
                    name: 'farthest_node',
                    files: [
                        'farthest_node.scm',
                        // 'tests.scm'
                    ],
                },
                {
                    name: 'closest_node',
                    files: [
                        'closest_node.scm',
                        // 'tests.scm'
                    ],
                },
                {
                    name: 'sorted_multi_set',
                    files: [
                        'sorted_multi_set.c',
                        // 'sorted_multi_set.h'
                    ],
                },
                {
                    name: 'threads_dj_school',
                    files: [
                        'dj_school.c',
                        // 'dj_school.h',
                        // 'helper.c',
                        // 'helper.h',
                        // 'tests.c'
                    ]
                }
            ]
        }
    ]
}
module.exports = {
    methodologies: {

    },
    paradigms: paradigms
    /*
    {
        exams: {
            midterm3: {
                ge: 'მესამე შუალედური',
                contact: {
                    lost_files: email
                },
                tasks: {
                    'max-decreasing-subsegment': {
                        files: [
                            'max-decreasing-subsegment/max-decreasing-subsegment.scm'
                        ]
                    },
                    talent_show: {
                        files: [
                            'talent_show/talent_show.c'
                        ]
                    }
                }
            },
            midterm4: {
                contact: {
                    lost_files: email
                },
                tasks: {
                    threads_server_room: {
                        files: [
                            'threads_server_room/maintenance.c',
                            // TODO
                        ],
                    },
                    stack_list: {
                        files: [
                            'stack_list/stack.c'
                        ],
                    },
                    vector_list: {
                        files: [
                            'vector_list/vector.c'
                        ]
                    }
                }
            },
            final: {
                tasks: {
                    asm_exam_checker: {
                        files: [
                            // 'asm_exam_checker/exam_checker.c',
                            'asm_exam_checker/exam_checker.s'
                        ],
                    },
                    asm_tall_trees: {
                        files: [
                            // 'asm_tall_trees/tall_trees.c',
                            'asm_tall_trees/tall_trees.s'
                        ],
                    },
                    farthest_node: {
                        files: [
                            'farthest_node/farthest_node.scm',
                            // 'farthest_node/tests.scm'
                        ],
                    },
                    closest_node: {
                        files: [
                            'closest_node/closest_node.scm',
                            // 'closest_node/tests.scm'
                        ],
                    },
                    sorted_multi_set: {
                        files: [
                            'sorted_multi_set/sorted_multi_set.c',
                            // 'sorted_multi_set/sorted_multi_set.h'
                        ],
                    },
                    threads_dj_school: {
                        files: [
                            'threads_dj_school/dj_school.c',
                            // 'threads_dj_school/dj_school.h',
                            // 'threads_dj_school/helper.c',
                            // 'threads_dj_school/helper.h',
                            // 'threads_dj_school/tests.c'
                        ]
                    }
                }
            }
        }
    }
    */
}