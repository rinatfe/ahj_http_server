const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();


app.use(koaBody({
    urlencoded: true
}));

const tickets = [{id:1, name: 'test', description: 'test test', status: true, created: '14.06.2021 14 : 30'}];



app.use(async (ctx)=> {
    
    const {method, id}  = ctx.request.query;
    
    ctx.response.set({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'POST, GET',
        'Access-Control-Allow-Headers':'X-Secret, Content-Type'
    });

    if(method == 'allTickets') {
        ctx.response.body = tickets;
    } else if(method == 'ticketById') {
        ctx.response.body = tickets.find(x=>x.id == id);
    }else if(method == 'createTicket') {
        let reqbd = JSON.parse(ctx.request.body);
        const {name, description, status, created } = reqbd;
        tickets.push({id:tickets.length + 1, name:name, description:description, status:status, created: created});
        ctx.response.body = {id: tickets.length};
    } else {
        ctx.response.status = 404;
        return;
    }
});

const server = http.createServer(app.callback()).listen(7070);


