import http from './http'
import md5 from 'js-md5';

export function loginRequest(data, login, setOpen) {
    http({
      method: 'POST',
      url: '/user/login',
      data: {
        username: data.get('email'),
        password: md5(data.get('password')),
      }
    }).then((res) => {
      if (res.data.success === true) {
        setOpen({ open: true, msg: res.data.message, type: "success" });
        login({
          id: res.data.data.userInfo.id,
          username: res.data.data.userInfo.username,
          roleId: res.data.data.userInfo.roleId,
          email: res.data.data.userInfo.email,
          nickName: res.data.data.userInfo.nickName,
          avatar: res.data.data.userInfo.avatar,
          token: res.data.data.token
        });
        setTimeout(() => {
          window.location.href = '/'
        }, 1000);
      }
      else {
        setOpen({ open: true, msg: res.data.message, type: "error" });
      }
    }, (err) => {
      console.log(err);
    })
}

export function logoutRequest() {
  http({
    method: 'GET',
    url: '/restaurant/getCategories',
  }).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })
}

export function signupRequest(data, role, setOpen) {
  http({
    method: 'POST',
    url: '/user/register',
    data: {
      email: data.get('email'),
      password: md5(data.get('password')),
      username: data.get('email'),
      nickName: data.get('firstName') + " " + data.get('lastName'),
      roleId: role //1 admin; 2 customer; 3 restaurant; 4 delivery
    }
  }).then((res) => {
    if (res.data.success === true) {
      setOpen({ open: true, msg: res.data.message, type: "success" });
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000);
    }
    else {
      setOpen({ open: true, msg: res.data.message, type: "error" });
    }
  }, (err) => {
    console.log(err);
  })
}

export function activateRequest(setData) {
  http({
    method: 'GET',
    url: '/user/activate' + window.location.search,
  }).then((res) => {
    setData(res.data.message);
  }, (err) => {
    setData(err.data.message);
    console.log(err);
  })
}

export function getCategoriesRequest(setCategories) {
  http({
    method: 'GET',
    url: '/restaurant/getCategories',
  }).then((res) => {
    setCategories(res.data.data.categories);
  }, (err) => {
    console.log(err);
  })
}