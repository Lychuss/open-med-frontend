import { betterAuth } from "../../lib/better-auth";
import type { ErrorContext, SuccessContext } from "better-auth/client";

export async function LoginEmailApi(email: string, password: string, setLoading?: (loading: boolean) => void){

    const { data, error }= await betterAuth.signIn.email(
        {email, password},
        {
            onRequest: () => {
                setLoading?.(true);
            },
            onResponse: () => {
                setLoading?.(false);
            },
            onSuccess: async (ctx: SuccessContext<unknown>) => {
                window.location.href = `${process.env.NEXT_PUBLIC_CALLBACK_URL}/`
            },
            onError: (ctx: ErrorContext) => {
                alert(ctx.error.message);
                setLoading?.(false);
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


