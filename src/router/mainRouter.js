export const mainRouter = [
    {
        path: 'note/list',
        name: 'note-list',
        component: () => import ("@/pages/note/NoteList.vue"),
        meta: {
            auth: true,
        }
    },
    {
        path: 'linkcard/link-card',
        name: 'link-card',
        component: () => import ("@/pages/linkcard/LinkCard.vue"),
        meta: {
            auth: true,
        }
    }
]