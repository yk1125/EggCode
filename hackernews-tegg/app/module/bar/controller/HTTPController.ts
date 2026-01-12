import{
    HTTPController, HTTPMethod,
    HTTPMethodEnum,
    HTTPHeaders,
    HTTPQuery,
    HTTPQueries,
    HTTPParam,
    HTTPBody,
    Cookies,
    HTTPCookies,
    IncomingHttpHeaders,//请求头类型
} from 'egg';

//定义body的接口（参数类型）
export interface BodyData {
    age: number;
    address?: string;
}
@HTTPController({path: '/'})
export default class PageController {
    
    @HTTPMethod({
        method: HTTPMethodEnum.GET,
        path: '/api/hello/(.*)',
    })
    async getHeaders(
        @HTTPHeaders() headers:IncomingHttpHeaders, //获取请求头
        @HTTPParam({name: '0'}) name: string, //获取路径参数(第一个正则表达式匹配的字符)
        @HTTPBody() body:BodyData, //获取请求体参数
        @HTTPCookies() cookies:Cookies, //获取请求的cookies(服务端让浏览器保存在客户端的一小段文本数据)
        //cookie以 key=value 的形式存储在 cookies 对象中 比如test = '123'
        @HTTPQuery() user?:string,//获取单个查询参数
        @HTTPQueries({name:'id'}) id?:string[],//获取多个同名查询参数

    )
     {
        const custom = headers['x-custom'];
        const cookiesvalue = cookies.get('test', {signed:false}) //获取名为 test 的 cookie 值，未加密;
        
        return `hello, your custom header is ${custom}
                , your query user is ${user}
                , your querys id is ${id}
                , your param name is ${name}
                , your body age is ${body.age}, address is ${body.address}
                , your cookie test value is ${cookiesvalue}
        `;
    }
    

    
}