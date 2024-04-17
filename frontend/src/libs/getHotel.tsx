export default async function getHotel(hid:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotel/${hid}`)

    if(!response) throw new Error("Failed to fetch hotel")

    return await response.json()
}

