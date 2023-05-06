import myRequest from '@/service'

/**
 * @name:用户登录
 * @msg:/users/login
 * @param {string} userName
 * @param {string} password
 * @return {*}
 */
export function login(params: object) {
  return myRequest({
    url: '/users/login',
    method: 'post',
    data: params
  })
}

/**
 * @name:用户注册
 * @msg:/users/register
 * @param {string} userName
 * @param {string} password
 * @return {*}
 */
export function register(params: object) {
  return myRequest({
    url: '/users/register',
    method: 'post',
    data: params
  })
}

/**
 * @name:修改/重置密码
 * @msg:/users/register
 * @param {string} userName
 * @param {string} password
 * @return {*}
 */
export function updatePassword(params: object) {
  return myRequest({
    url: '/users/updatePassword',
    method: 'post',
    data: params
  })
}
