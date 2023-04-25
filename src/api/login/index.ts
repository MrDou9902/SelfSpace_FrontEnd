import myRequest from '@/service';

export function login(params: object) {
  return myRequest({
    url:'/users/register',
    method: 'post',
    data: params,
  });
}
