import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }

  let config = {
    url: '/login',
    method: 'post',
    data: data
  }

  if (window.location.hash.indexOf('?token=') != -1) {
    const str = window.location.hash.split('?token=')[1];
    const arr = str.split('&');
    config.headers = {
      token: arr[0]
    }
  }
  return request(config)
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}

// 跳转到集团工单处理
export function getToken() {
  return request({
    url: '/sso/getToken',
    method: 'get'
  });
}