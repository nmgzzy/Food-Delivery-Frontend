import axios from 'axios';
import md5 from 'js-md5';

export function loginRequest(data, login) {
  axios.post('https://fd.shimonzhan.com/api/user/login',
    {
      username: data.get('email'),
      password: md5(data.get('password')),
    }
  )
    .then(function (res) {
      login({
        id : res.data.data.userInfo.id,
        username : res.data.data.userInfo.username,
        roleId : res.data.data.userInfo.roleId,
        email : res.data.data.userInfo.email,
        nickName : res.data.data.userInfo.nickName,
        avatar : res.data.data.userInfo.avatar,
        token : res.data.data.token
      });
      setTimeout(() => {
        window.location.href = '/'
      }, 1000);
    })
    .catch(function (err) {
      console.log(err);
    });
}

export function signupRequest(data, role) {
  axios.post('https://fd.shimonzhan.com/api/user/register',
    {
      email: data.get('email'),
      password: md5(data.get('password')),
      username: data.get('email'),
      nickName: data.get('firstName') + " " + data.get('lastName'),
      roleId: role //1 admin; 2 customer; 3 restaurant; 4 delivery
    }
  )
    .then(function (res) {
      window.location.href = '/login'
    })
    .catch(function (err) {
      console.log(err);
    });
}

export function activateRequest(setData) {
  axios.get('https://fd.shimonzhan.com/api/user/activate' + window.location.search)
    .then(function (res) {
      setData(res.data.message)
    })
    .catch(function (err) {
      console.log(err);
      setData(err.data.message)
    });
}


export function getCategoriesRequest(setCategories) {
  axios.get('https://fd.shimonzhan.com/api/restaurant/getCategories')
    .then(function (res) {
      setCategories(res.data.data.categories);
      console.log(res.data.data.categories);
    })
    .catch(function (err) {
      console.log(err);
    });
}