import {constantRoutes} from '@/router'
import {getRouters} from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView';

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        getRouters().then(res => {
          dealMenuData(res.data);
          const accessedRoutes = filterAsyncRouter(res.data)
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        })
      })
    }
  }
}

function dealMenuData(datas) {
  datas.forEach(item => {
    if (item.meta.title == "大音门户") {
      let arr = [];
      let id = 0;
      item.children.forEach(menu => {
        menu.id = String(id++);
        let secondMenuId = 0;

        if (menu.children) {

          menu.children.forEach(secondMenu => {
            secondMenu.id = String(menu.id + '-' + secondMenuId++);
            let thirdMenuId = 0;
            secondMenu.parentId = String(secondMenu.id);
            if (secondMenu.children) {
              secondMenu.children.forEach(thirdMenu => {
                thirdMenu.id = String(menu.id + '-' + secondMenu.id + '-' + thirdMenuId++);
                thirdMenu.parentIds = [menu.id, secondMenu.id];
              })
            }
          })
        }

        arr.push(menu);
        /*if (menu.meta.title != '集团大音') {
          
        } else {
          sessionStorage.setItem('jtMenu', JSON.stringify(menu));
        }*/
      })

      sessionStorage.setItem('menus', JSON.stringify(arr));
    }
  })
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter(route => {
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
}

export const loadView = (view) => { // 路由懒加载
  return (resolve) =>  require([`@/views/${view}`], resolve)
}

export default permission
