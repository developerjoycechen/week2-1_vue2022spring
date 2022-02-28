import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.31/vue.esm-browser.min.js';

const site = 'https://vue3-course-api.hexschool.io/v2';
// api_path 為個人 API Path
const api_path = 'jc22';

const app = createApp({
    data(){
        return { 
            products:[],
            // 點擊查看單一產品的暫存空間
            tempProduct:{},
        }
    },
    methods:{
        //登入確認
        checkLogin(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            //每次發送請求時，都將 token 放到預設的 headers 內，如果不同站點，就不能使用預設值，要依站點做區分
            axios.defaults.headers.common['Authorization'] = token;
                const url = `${site}/api/user/check`;
                axios.post(url)
                    .then(res => {
                        //觸發取得遠端產品品項函式
                        this.getProducts();
                    })
                    .catch((err) => {
                        alert(err.data.message)
                        window.location = 'login.html';
                    })
        },
        //取得產品列表
        getProducts(){
            const url = `${site}/api/${api_path}/admin/products/all`;

            //打 api 取得遠端資料
            axios.get(url)
                .then(res => {
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.data.message);
                })
                

        },
        openproduct(item){ 
            this.tempProduct = item;
        }
    },
    //使用 mounted 生命週期，觸發登入行為
    mounted(){
        this.checkLogin();
    }

});

app.mount('#app');