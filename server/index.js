import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import data from './api'
import { API_PREFIX } from "../src/config";

const app = new Koa();
app.use(bodyParser())
const router = new Router();
let status = 0;
let timeout = null;

router.get(`${API_PREFIX}consumer/appointment/booked/past`, async (ctx, next) => {
  ctx.body = data.consumer.pastAppointments()
})
router.get(`${API_PREFIX}consumer/appointment/booked`, async (ctx, next) => {
  ctx.body = data.consumer.confirmedAppointments()
})
router.get(`${API_PREFIX}consumer/appointment/session/:id/check`, async (ctx, next) => {
  if(!timeout) {timeout = setTimeout(() => {status = 1 }, 10000)}
  ctx.body = {Status: status}
  if (status > 0) {status = 0; timeout = null}
})
router.get(`${API_PREFIX}consumer/practice`, async (ctx, next) => {
  ctx.body = data.consumer.appointment.organisationList;
});
router.get(`${API_PREFIX}consumer/appointment/organisation/:id`, async (ctx, next) => {
  ctx.body = data.consumer.appointment.organisation(ctx.params.id)
})

router.get(`${API_PREFIX}consumer/appointment/:orgId/:day`, async (ctx, next) => {
  ctx.body = data.consumer.appointment.appointment(ctx.params.day)
})

router.get(`${API_PREFIX}consumer/appointment/:orgId/:date/:days`, async (ctx, next) => {
  ctx.body = data.consumer.appointment.appointmentRange(ctx.params.date, ctx.params.days)
})
router.post('/token', async (ctx, next) => {
  ctx.body = data.login.login()
  // ctx.status = 400
  // ctx.body.error = "unauthorized"
  // ctx.body.error = "locked"
})
router.post(`${API_PREFIX}consumer/logout`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 400
})
router.post(`${API_PREFIX}consumer/appointment/:orgId/:doctorId/abletobook`, async (ctx, next) => {
  //if(Math.random() > 0.7) ctx.status = 403
  // ctx.status = 403;
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/appointment/session/guest`, async (ctx, next) => {
  ctx.body = {SessionId: "62deab33-1745-4e2f-b897-616fae0fc355"}
  //if(Math.random() > 0.7) ctx.status = 403
  // ctx.status = 403
})
router.post(`${API_PREFIX}consumer/appointment/session`, async (ctx, next) => {
  ctx.body = {SessionId: "62deab33-1745-4e2f-b897-616fae0fc355"}
  //if(Math.random() > 0.7) ctx.status = 403
  // ctx.status = 403
})
router.post(`${API_PREFIX}consumer/appointment/session/other`, async (ctx, next) => {
  ctx.body = {SessionId: "62deab33-1745-4e2f-b897-616fae0fc355"}
  // ctx.status = 403;
  //if(Math.random() > 0.7) ctx.status = 403
})
router.get(`${API_PREFIX}consumer/appointment/session/:id/verify`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 400
})
router.post(`${API_PREFIX}consumer/appointment/session/:id/verify`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/appointment/session/:id/submit`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 406;
})
router.delete(`${API_PREFIX}consumer/appointment/session/:id`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 406;
});
router.post(`${API_PREFIX}consumer/appointment/session/:id/abletocancel`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 403;
})
router.get(`${API_PREFIX}consumer/feed`, async (ctx, next) => {
  ctx.body = data.consumer.feed()
})
router.get(`${API_PREFIX}consumer/dependant`, async (ctx, next) => {
  ctx.body = data.consumer.dependants()
})
router.post(`${API_PREFIX}consumer/dependant`, async (ctx, next) => {
  // ctx.body = data.consumer.dependants;
  ctx.status = 200
});
router.post(`${API_PREFIX}consumer/dependant/avatar`, async (ctx, next) => {
  ctx.status = 200
});
router.post(`${API_PREFIX}consumer/dependant/:id/avatar/`, async (ctx, next) => {
  ctx.status = 200
});
router.delete(`${API_PREFIX}consumer/dependant/:id`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 406;
})
router.post(`${API_PREFIX}consumer/password/checktoken`, async (ctx, next) => {
  if (data.consumer.password.check(ctx.request.body.Token)) ctx.status = 200
  else ctx.status = 406
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/password/reset`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/password/verify`, async (ctx, next) => {
  ctx.body = {accessToken: "access-token-123-abc"}
})
router.post(`${API_PREFIX}consumer/password/sendtoken`, async (ctx, next) => {
  ctx.body = {}
  ctx.status = ctx.request.body.Email === "registered@email.com" ? 200 : 404
})
router.post(`${API_PREFIX}consumer/password`, async (ctx, next) => {
  ctx.body = {}
});
router.get(`${API_PREFIX}consumer/profile`, async (ctx, next) => {
  ctx.body = data.consumer.profile
})
router.post(`${API_PREFIX}consumer/profile`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/register`, async (ctx, next) => {
  ctx.body = data.consumer.registerUser
})
router.get(`${API_PREFIX}consumer/username/:username/check`, async (ctx, next) => {
  ctx.body = {}
  // ctx.status = 409
})
router.get(`${API_PREFIX}consumer/verify`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/verify`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/verify/mobile`, async (ctx, next) => {
  ctx.body = {}
})

router.get(`${API_PREFIX}consumer/organisation/doctor/:id`, async (ctx, next) => {
  ctx.body = data.consumer.practices.doctor(ctx.params.id)
})
router.get(`${API_PREFIX}consumer/practice/all`, async (ctx, next) => {
  ctx.body = data.consumer.practices.practices;
});
router.post(`${API_PREFIX}consumer/practice`, async (ctx, next) => {
  ctx.body = data.consumer.practices.practices[0];
  ctx.status = 200
});
router.delete(`${API_PREFIX}consumer/practice`, async (ctx, next) => {
  ctx.body = {}
  ctx.status = 200;
});
router.get(`${API_PREFIX}consumer/organisation/:id`, async (ctx, next) => {
  if (data.consumer.practices.profiles(ctx.params.id)) {
    ctx.body = data.consumer.practices.profiles(ctx.params.id)
  } else {
    ctx.status = 404
  }
})
router.post(`${API_PREFIX}consumer/feedback/guest`, async (ctx, next) => {
  ctx.body = {}
})
router.post(`${API_PREFIX}consumer/feedback`, async (ctx, next) => {
  ctx.body = {}
})
router.delete(`${API_PREFIX}consumer`, async (ctx, next) => {
  ctx.body = {};
  ctx.status = 200;
});

router.get(`${API_PREFIX}consumer/prescription/current/`, async (ctx, next) => {
  ctx.body = data.consumer.script.currentRequests;
});
router.get(`${API_PREFIX}consumer/prescription/past/`, async (ctx, next) => {
  ctx.body = data.consumer.script.pastRequests;
});
router.get(`${API_PREFIX}consumer/prescription/organisation/`, async (ctx, next) => {
  ctx.body = data.consumer.script.connectedPractices;
});
router.get(`${API_PREFIX}consumer/prescription/organisation/all`, async (ctx, next) => {
  ctx.body = data.consumer.script.allPractices;
});
router.get(`${API_PREFIX}consumer/prescription/:orgId/pmsuser`, async (ctx, next) => {
  ctx.body = data.consumer.script.getDoctors(ctx.params.orgId);
});
router.get(`${API_PREFIX}consumer/prescription/:orgId/pricing`, async (ctx, next) => {
  ctx.body = data.consumer.script.pickUpOptions;
});
router.post(`${API_PREFIX}consumer/prescription/pharmacy`, async (ctx, next) => {
  ctx.body = {}
});
router.get(`${API_PREFIX}consumer/prescription/:id/`, async (ctx, next) => {
  ctx.body = data.consumer.script.getScriptDetails(ctx.params.id);
});
// uses async arrow functions

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
