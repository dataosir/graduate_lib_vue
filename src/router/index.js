import { createRouter, createWebHistory } from 'vue-router'
import UserView from '../views/user/User.vue'
import AddUserView from '../views/user/AddUser.vue'
import HomeView from '../views/home/Home.vue'
import EditUserView from '../views/user/EditUser.vue'
import AddAdminView from '../views/admin/AddAdmin.vue'
import EditAdminView from '../views/admin/EditAdmin.vue'
import AdminView from '../views/admin/Admin.vue'
import LoginView from '../views/login/Login.vue'
import CategoryView from '../views/catepory/Category.vue'
import AddCategoryView from '../views/catepory/AddCategory.vue'
import EditCategoryView from '../views/catepory/EditCategory.vue'
import BookView from '../views/book/Book.vue'
import AddBookView from '../views/book/AddBook.vue'
import EditBookView from '../views/book/EditBook.vue'
import BorrowView from '../views/borrow/Borrow.vue'
import AddBorrowView from '../views/borrow/AddBorrow.vue'
import EditBorrowView from '../views/borrow/EditBorrow.vue'
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  },
  {
    path: "/home",
    name: "home",
    component: HomeView
  },
  {
    path: "/user/list",
    name: "userlist",
    component: UserView
  },
  {
    path: "/user/add",
    name: "adduser",
    component: AddUserView
  },
  {
    path: "/user/edit",
    name: "useredit",
    component: EditUserView
  },
  {
    path: "/admin/list",
    name: "adminlist",
    component: AdminView
  },
  {
    path: "/admin/add",
    name: "addadmin",
    component: AddAdminView
  },
  {
    path: "/admin/edit",
    name: "adminedit",
    component: EditAdminView
  },
  {
    path: "/category/list",
    name: "categorylist",
    component: CategoryView
  },
  {
    path: "/category/add",
    name: "addcategory",
    component: AddCategoryView
  },
  {
    path: "/category/edit",
    name: "categoryedit",
    component: EditCategoryView
  },
  {
    path: "/book/list",
    name: "booklist",
    component: BookView
  },
  {
    path: "/book/add",
    name: "addbook",
    component: AddBookView
  },
  {
    path: "/book/edit",
    name: "bookedit",
    component: EditBookView
  },
  {
    path: "/borrow/list",
    name: "borrowlist",
    component: BorrowView
  },
  {
    path: "/borrow/add",
    name: "addborrow",
    component: AddBorrowView
  },
  {
    path: "/borrow/edit",
    name: "borrowedit",
    component: EditBorrowView
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
