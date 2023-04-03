import { createRouter , createWebHistory} from 'vue-router'
import Home from '../views/Upload.vue';
import Edit from '../views/Edit.vue'  
import Detail from  '../views/Detail.vue'  
import List from '../views/List.vue'

const router = createRouter({
    history: createWebHistory(),
    routes : [{
        path : '/Upload'
        ,component : Home
    },
    {
        path : '/Edit'
        ,component : Edit
    },
    {
        path : '/Detail'
        ,component : Detail
    },
    {
        path : '/List'
        ,component : List
    }]
    

})

export default router;