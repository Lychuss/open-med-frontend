export default async function DoctorsApi(){
    const reponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/open-medical/users/doctor/category/all`, {
        method: "GET",
        credentials: "include"
    })

    if(!reponse.ok){
        return null;
    }

    const data = await reponse.json();

    return data;
}