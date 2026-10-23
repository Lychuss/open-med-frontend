export default async function TokenApi(){
    const response= await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok){
        return null;
    }

    const data = await response.json();

    return data;
}