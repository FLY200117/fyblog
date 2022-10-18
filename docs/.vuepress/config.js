import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { commentPlugin } from 'vuepress-plugin-comment2'

// import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({
    lang: 'zh-CN',
    title: "Fyliue个人博客",
    description: '我的个人博客',
    base: './',
    logo:'https://vuejs.org/images/logo.png',
    theme: defaultTheme({
        navbar: [
            {
                text: '主页', 
                link: '/'
            },
            {
                text: '前端',
                children: [
                    {
                        text: "基础",
                        children: [
                            {
                                text: 'html',
                                link: '/pages/Web/base/html'
                            },
                            {
                                text: 'css',
                                link: '/pages/Web/base/css'
                            },
                            {
                                text: 'JavaScript',
                                link: '/pages/Web/base/JavaScript'
                            },
                            {
                                text: 'TypeScript',
                                link: '/pages/Web/base/TypeScript'
                            },
                            {
                                text: '网络基础与浏览器',
                                link: '/pages/Web/base/network&browser'
                            },
                            
                        ]
                    },
                    {
                        text: '前端框架',
                        children: [
                            {
                                text: 'Vue',
                                link: '/pages/Web/frame/Vue2'
                            },
                            {
                                text: 'React',
                                link: '/pages/Web/frame/React'
                            }
                        ]
                    },
                    {
                        text: '不仅仅是Browser',
                        children: [
                            {
                                text: '移动端',
                                link: '/pages/Web/platform/MobileDevices'
                            },
                            {
                                text: '桌面端',
                                link: '/pages/Web/platform/desktop'
                            },
                            {
                                text: '小程序',
                                link: '/pages/Web/platform/WeChat'
                            }
                        ]
                    },
                    {
                        text: '额外知识',
                        children: [
                            {
                                text: 'webpack与Vite',
                                link: '/pages/Web/more/PackagingTools'
                            },
                            {
                                text: '脚手架',
                                link: '/pages/Web/more/Cli'
                            },
                            {
                                text: '微前端',
                                link: '/pages/Web/more/Micro-Frontends'
                            }
                        ]
                    }
                ]
            },
            {
                text: '后端',
                children: [
                    {
                        text: '基础',
                        link: '/pages/Server/base'
                    },
                    {
                        text: '进阶',
                        link: '/pages/Server/best'
                    },
                    {
                        text: '数据库',
                        link: '/pages/Server/DataBase'
                    },
                    {
                        text: '框架',
                        children: [
                            {
                                text: 'Node-express',
                                link: '/pages/Server/frame/Node-express'
                            },
                            {
                                text: 'Node-Nest',
                                link: '/pages/Server/frame/Node-Nest'
                            }
                        ]
                    }
                ]
            },
            {
                text: '技术',
                children: [
                    {
                        text: '基础',
                        children: [
                            {
                                text: '数据结构',
                                link: '/pages/Skill/base/DataStructure'
                            },
                            {
                                text: '设计模式',
                                link: '/pages/Skill/base/DesignMode'
                            },
                            {
                                text: '计算机基础',
                                link: '/pages/Skill/base/ComputerBasics'
                            }
                        ]
                    },
                    {
                        text: '算法',
                        link: '/pages/Skill/algorithm'
                    },
                    {
                        text: '随笔',
                        link: '/pages/Skill/essay'
                    }
                ]
            },
            {
                text: 'Github',
                link: 'https://github.com/FLY200117',
                target:'_blank' 
            }
        ],
        sidebar: {
            '/pages/Web/base/': [
                {
                    text: 'HTML',
                    collapsible: true,
                    children: [
                        '/pages/Web/base/HTML.md'
                    ]
                },
                {
                    text: 'CSS',
                    collapsible: true,
                    children: [
                        '/pages/Web/base/CSS.md'
                    ]
                },
                {
                    text: 'JavaScript',
                    collapsible: true,
                    children: [
                        '/pages/Web/base/JavaScript.md'
                    ]
                },
                {
                    text: 'TypeScript',
                    collapsible: true,
                    children: [
                        '/pages/Web/base/TypeScript.md',
                        '/pages/Web/base/TypeScript2.md'
                    ]
                },
                {
                    text: '网络基础与浏览器',
                    collapsible: true,
                    children: [
                        '/pages/Web/base/Network.md',
                        '/pages/Web/base/Browser.md'
                    ]
                }
            ],
            '/pages/Web/frame/': [
                {
                    text: 'Vue',
                    collapsible: true,
                    children: [
                        '/pages/Web/frame/Vue2.md',
                        '/pages/Web/frame/Vue3.md',
                    ]
                },
                {
                    text: 'React',
                    collapsible: true,
                    // link: '/pages/Web/frame/React.md',
                    children: [
                        '/pages/Web/frame/React.md',
                        '/pages/Web/frame/React2.md',
                        '/pages/Web/frame/Redux.md'
                    ]
                }
            ],
            '/pages/Web/platform/': [
                {
                    text: '移动端',
                    collapsible: true,
                    children: [
                        '/pages/Web/platform/MobileDevices.md'
                    ]
                },
                {
                    text: '桌面端',
                    collapsible: true,
                    children: [
                        '/pages/Web/platform/desktop.md'
                    ]
                },
                {
                    text: '小程序',
                    collapsible: true,
                    children: [
                        '/pages/Web/platform/WeChat.md'
                    ]
                },
            ],
            '/pages/Web/more/': [
                {
                    text: 'webpack与Vite',
                    collapsible: true,
                    children: [
                        '/pages/Web/more/PackagingTools.md'
                    ]
                },
                {
                    text: '脚手架',
                    collapsible: true,
                    children: [
                        '/pages/Web/more/Cli.md'
                    ]
                },
                {
                    text: '微前端',
                    collapsible: true,
                    children: [
                        '/pages/Web/more/Micro-Frontends.md'
                    ]
                },
            ],
            '/pages/Server/': [
                {
                    text: '基础',
                    collapsible: true,
                    children: [
                        '/pages/Server/base.md'
                    ]
                },
                {
                    text: '进阶',
                    collapsible: true,
                    children: [
                        '/pages/Server/best.md'
                    ]
                },
                {
                    text: '数据库',
                    collapsible: true,
                    children: [
                        '/pages/Server/DataBase.md'
                    ]
                },
            ],
            '/pages/Server/frame/': [
                {
                    text: 'Express',
                    collapsible: true,
                    children: [
                        '/pages/Server/frame/Node-express.md'
                    ]
                },
                {
                    text: 'Nest',
                    collapsible: true,
                    children: [
                        '/pages/Server/frame/Node-Nest.md'
                    ]
                }
            ],
            '/pages/Skill/': [
                {
                    text: '算法',
                    collapsible: true,
                    children: [
                        '/pages/Skill/algorithm.md'
                    ]
                },
                {
                    text: '随笔',
                    collapsible: true,
                    children: [
                        '/pages/Skill/essay.md'
                    ]
                }
            ],
            '/pages/Skill/base/': [
                {
                    text: '数据结构',
                    collapsible: true,
                    children: [
                        '/pages/Skill/base/DataStructure.md'
                    ]
                },
                {
                    text: '设计模式',
                    collapsible: true,
                    children: [
                        '/pages/Skill/base/DesignMode.md'
                    ]
                },
                {
                    text: '计算机基础',
                    collapsible: true,
                    children: [
                        '/pages/Skill/base/ComputerBasics.md'
                    ]
                }
            ],
            
        }
    }),
    plugins: [
        commentPlugin({
            provider: "Giscus",
            repo: "FLY200117/FyliueBlog-Comment-Repository-Giscus-",
            repoId: "R_kgDOINunTQ",
            category: "Announcements",
            categoryId: "DIC_kwDOINunTc4CR-W9",
            comment: true
        })
    ]
})
