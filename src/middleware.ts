
import { NextResponse } from 'next/server';
import { withAuth} from 'next-auth/middleware';


export const config = {
    matcher: [
        "/admin/:path*"
    ]
}

export default withAuth(
    function middleware(req: any) {
        // can check for different pages with req.nextUrl.pathname.startsWith("");
        if (req.nextauth.token?.isAdmin === false) {
            console.log("not authorized");
            return NextResponse.rewrite(new URL('/', req.url));
        }
    },

    {
        callbacks: {
            authorized: ({token}: any) => !!token
        }
    }
);



// export async function middleware(request: NextRequest) {
//     console.log('EXECUTING MIDDLEWARE');
//     try {
//         let cookies = request.cookies.getAll();
//         const [username, accessToken] = cookies;
//         const data: verifyAdminRequest = {
//             username: username.value,
//             accessToken: accessToken.value
//         }
//         console.log(cookies);
//         const isAdmin = await sendAdminRequest(data);
//         if (isAdmin) {
//             return NextResponse.redirect(new URL('/admin', 'http://localhost:3000'));
//         }
//     } catch (error) {
//         console.log(error);
//         return NextResponse.redirect(new URL("/",'http://localhost:3000'));
//     }
//     return NextResponse.redirect(new URL("/",'http://localhost:3000'));
// }