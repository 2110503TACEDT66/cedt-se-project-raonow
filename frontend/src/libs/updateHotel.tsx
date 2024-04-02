export default async function updateHotel(hid:string, token:string) {
    const response = await fetch(`https://presentation-day-1-laeo-tae-loei.vercel.app/api/v1/hotel/${hid}`, {
        method: "PUT",
        headers: {
            authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete hotel');
    }

    return await response.json();
}
/*
"name": "Trisara Phuket",
            "address": "31/1 Moo 6, Mai Khao, Tambon Mai Khao, Amphur Thalang, Phuket 83110, Thailand",
            "telephoneNumber": "+66 76 330 230",
            "basePrice": 40500,
            "starRating": 5
            */