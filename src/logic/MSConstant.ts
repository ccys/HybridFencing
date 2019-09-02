/**
 * 常量集合
**/
export class MSConstant {
	public static MS_HTTP_BASE_URL: string = "http://localhost:3000"; // http请求根路径

	public static MS_EVENT_TOPIC_LOGIN = "ms_user_login";  // 用户登录的topic事件

	public static MS_EVENT_TOPIC_QUIT = "ms_user_quit"; // 用户退出的topic事件

	public static STATUS_NO_AUTH: number = 401; // 未授权状态

	public static STATUS_PAY: number = 402; // 需要付款的状态码

	public static STATUS_OFFLINE: number = 501; // 下线状态码

}