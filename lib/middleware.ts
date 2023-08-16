import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest): NextResponse {
	//   const path = request.nextUrl.pathname;
	//   // console.log(path);

	//   const isPublicPath = path === "/login" || path === "/signup";

	//   const token = request.cookies.get("token")?.value || null;

	//   if (isPublicPath && token) {
	//     return NextResponse.redirect(new URL("/", request.url));
	//   }
	//   if (!isPublicPath && !token) {
	//     return NextResponse.redirect(new URL("/login", request.url));
	//   }
	const res = NextResponse.next();
	// add the CORS headers to the response
	res.headers.append("Access-Control-Allow-Credentials", "true");
	res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
	res.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT");
	res.headers.append(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	return res;
}

export const config = {
	// matcher: ["/offrs", "/login", "/signup", "/mess-bill/:path*"],
	matcher: ["/api/:path*"]
};
