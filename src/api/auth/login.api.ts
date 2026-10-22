import { betterAuth } from "../../lib/better-auth";


export async function LoginEmailApi(email: string, password: string){

    const { data, error }= await betterAuth.signIn.email(
        {email, password},
        {
            onRequest: () => {
                
            },
            onSuccess: async (ctx) => {
                window.location.href = `${process.env.NEXT_PUBLIC_CALLBACK_URL}/`
            },
            onError: (ctx) => {
                alert(ctx.error.message);
            }
        }
    );
}

export async function LoginGoogleApi(){
    await betterAuth.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_CALLBACK_URL}/`
        }
    );
}



