import router from './router'
import store from './store'
import {Message,Loading} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import { getUserInfo } from '@/api/stationstore/api'
import Vue from 'vue'


NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect', '/bind', '/register', '/401', '/nomenus'];

router.beforeEach((to, from, next) => {
  
  if (getToken()) {
    /* has token*/
    if (to.path !== '/login') {
      NProgress.start()
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.roles
          sessionStorage.setItem('userInfo', JSON.stringify(res.user));
          sessionStorage.setItem('cityId', res.area.cityId);
          sessionStorage.setItem('areaId', Number(res.area.areaId) || res.area.areaId != '999' ? res.area.areaId : res.area.cityId);
          sessionStorage.setItem('areaName', res.area.cityName);
          sessionStorage.setItem('groupUser', res.area.groupUser);
          sessionStorage.setItem('department', JSON.stringify(res.department));
                
          store.dispatch('GenerateRoutes', { roles }).then(accessRoutes => {
            router.addRoutes(accessRoutes);
            // path改为优先
            var menus = JSON.parse(sessionStorage.getItem('menus'));
            var menuDefaultLink = res.menuDefaultLink;
            sessionStorage.setItem('menuDefaultLink', res.menuDefaultLink);

            if(menus) {
              if (menuDefaultLink && menuDefaultLink != 'null' && menuDefaultLink != 'undefined') {
                 next({ path: menuDefaultLink, replace: true });  
              } else {
                next({ path: menus[0].children[0].children[0].path, replace: true })
              }
            } else {
              next('/permission');
            }
            Vue.$loadingIns && Vue.$loadingIns.close();
            NProgress.done()
          }).catch(err=>{
            sessionStorage.removeItem('Admin-Token');
            Vue.$loadingIns && Vue.$loadingIns.close();
            next('/nomenus')
          })
        })
        .catch(err => {
          Vue.$loadingIns && Vue.$loadingIns.close();
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/401' })
          })
        })
      } else {
        next()
        NProgress.done()
      }
    }
  } else {
    NProgress.start()
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
          // 大音平单点台登录
       Vue.$loadingIns = Loading.service({
        lock: true,
        text: '正在验证用户权限，请稍候',
        background: 'rgba(255, 255, 255, 0.7)'
      });
      // alert(1)
      store.dispatch("Login", {
        username: '',
        password: '',
        rememberMe: false
      }).then((res) => {
        getUserInfo().then(res => {
          const obj = res.data || {}
          if (obj.provinceCity == '本部') {
            obj.provinceCity = '辽宁省'
          }
          window.sessionStorage.setItem("dept", JSON.stringify(obj))
        })
        next('/redirect')
      }).catch(() => {
        Vue.$loadingIns.close();
        next(`/401`);
      });
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
