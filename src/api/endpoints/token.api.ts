export default async function TokenApi(){
    const response= await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/me`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok){
        return null;
    }

    const data = await response.json();

    console.log("TokenApi data:", data);

    return data;
}