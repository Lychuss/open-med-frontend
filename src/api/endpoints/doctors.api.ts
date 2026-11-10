export default async function DoctorsApi(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/open-medical/users/doctor/category/all`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok){
        return null;
    }

    const data = await response.json();

    console.log("This is the data", data);

    return data;
}