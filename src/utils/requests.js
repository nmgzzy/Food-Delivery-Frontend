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
        let r = res.data.data.userInfo.roleId;
        if (r === 'ROLE_ADMIN') {
          window.location.href = '/adminmanage'
        }
        else if (r === 'ROLE_CUSTOMER') {
          window.location.href = '/'
        }
        else if (r === 'ROLE_RESTAURANT_OWNER') {
          window.location.href = '/restaurantmanage'
        }
        else if (r === 'ROLE_DELIVERY_MAN') {
          window.location.href = '/'
        }
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
  }, (err) => {
    console.log(err);
  })
}

export function signupRequest(data, role, setOpen) {
  if (data.get('password') !== data.get('password2')) {
    setOpen({ open: true, msg: "Password does not match", type: "warning" });
    return;
  }
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

export function SearchRequest(searchData, setRestaurants) {
  http({
    method: 'POST',
    url: '/restaurant/searchRestaurants',
    data: searchData
  }).then((res) => {
    setRestaurants(res.data.data.restaurants);
  }, (err) => {
    console.log(err);
  })
}

export function getRestaurantRequest(restaurantIdQuery, setRestaurant, setAddress, setMenu) {
  http({
    method: 'GET',
    url: '/restaurant/getRestaurant' + restaurantIdQuery,
  }).then((res) => {
    setRestaurant(res.data.data.restaurant);
    setAddress(res.data.data.address);
    setMenu(res.data.data.menus);
  }, (err) => {
    console.log(err);
  })
}

export function ownerGetRestaurantsRequest(userId, setRestaurant, setAddress, setMenu) {
  http({
    method: 'GET',
    url: '/restaurant/ownerGetRestaurants?ownerId=' + userId + '&pageCurrent=1&pageSize=1',
  }).then((res) => {
    if (res.data.data.restaurants.records[0]) {
      var id = res.data.data.restaurants.records[0].id;
      getRestaurantRequest("?restaurantId=" + id, setRestaurant, setAddress, setMenu);
    }
  }, (err) => {
    console.log(err);
  })
}

export function customerAddOrderRequest(basketList, userId, addrId, restId) {
  var orderlist = {}
  for (var i = 0; i < basketList.length; i++) {
    orderlist[basketList[i].id] = basketList[i].num;
  }
  http({
    method: 'POST',
    url: '/order/customerAddOrder',
    data: {
      customerAddressId: addrId,
      customerId: userId,
      menuIdQuantityMap: orderlist,
      restaurantId: restId
    }
  }).then((res) => {
    console.log(res);
  }, (err) => {
    console.log(err);
  })
}

export function restaurantGetOrdersRequest(data, setOrder, setPageNum) {
  const { restaurantId, orderStatus, pageCurrent } = data;
  var url = '/order/restaurantGetOrders?restaurantId=' + restaurantId;
  if (orderStatus) {
    url += '&orderStatus=' + orderStatus;
  }
  url += '&pageCurrent=' + pageCurrent + '&pageSize=20';
  http({
    method: 'GET',
    url: url,
  }).then((res) => {
    setOrder(res.data.data.orders.records);
    setPageNum(res.data.data.orders.pages);
  }, (err) => {
    console.log(err);
  })
}

// export function getOrderDetailsRequest() {
//   http({
//     method: 'GET',
//     url: '/order/getOrderDetails',
//   }).then((res) => {
//     console.log(res);
//   }, (err) => {
//     console.log(err);
//   })
// }

// export function restaurantGetDeliveryMansRequest() {
//   http({
//     method: 'GET',
//     url: '/order/restaurantGetDeliveryMans',
//   }).then((res) => {
//     console.log(res);
//   }, (err) => {
//     console.log(err);
//   })
// }

// export function restaurantSetDeliveryManRequest(orderId, name, phone) {
//   http({
//     method: 'POST',
//     url: '/order/restaurantSetDeliveryMan?orderId=' + orderId + '&name=' + name + '&phone=' + phone,
//   }).then((res) => {
//     console.log(res);
//   }, (err) => {
//     console.log(err);
//   })
// }

// export function cancelOrderRequest() {
//   http({
//     method: 'GET',
//     url: '/order/cancelOrder',
//   }).then((res) => {
//     console.log(res);
//   }, (err) => {
//     console.log(err);
//   })
// }

export function addMenuRequest(menuItem, callBack) {
  http({
    method: 'POST',
    url: '/menu/addMenu',
    data: menuItem
  }).then((res) => {
    callBack();
  }, (err) => {
    console.log(err);
  })
}

export function updateMenuRequest(menuItem, setOpen) {
  http({
    method: 'PUT',
    url: '/menu/updateMenu',
    data: menuItem
  }).then((res) => {
    setOpen({open:true, msg:"Update Menu ok", type:"success"});
  }, (err) => {
    console.log(err);
  })
}

export function updateRestaurantAddressRequest(addr, restId) {
  var addr1 = addr;
  if (restId >= 0) {
    addr1.restaurantId = restId;
  }
  var flag = 0;
  http({
    method: 'PUT',
    url: '/restaurant/updateRestaurantAddress',
    data: addr1
  }).then((res) => {
    flag = 1;
  }, (err) => {
    console.log(err);
  })
  return flag;
}

export function updateRestaurantInfoRequest(info, addr, setOpen) {
  updateRestaurantAddressRequest(addr, -1);
  http({
    method: 'PUT',
    url: '/restaurant/updateRestaurantInfo',
    data: info
  }).then((res) => {
    setOpen({ open: true, msg: "Update Restaurant ok", type: "success" });
  }, (err) => {
    console.log(err);
  })
}

export function addRestaurantRequest(info, addr, setOpen) {
  http({
    method: 'POST',
    url: '/restaurant/addRestaurant',
    data: info
  }).then((res) => {
    if (updateRestaurantAddressRequest(addr, res.data.data.restaurantId) === 1) {
      setOpen({ open: true, msg: "Add Restaurant ok", type: "success" });
    }
  }, (err) => {
    console.log(err);
  })

}