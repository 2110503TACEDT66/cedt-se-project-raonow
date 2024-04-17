'use server'

export default async function updateCampaign(title:string, desc:string, token:string, cid:string, point:number, amount:number) {

    console.log("updating")
    try {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/campaign/${cid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            title: title,
            description: desc,
            point: point,
            totalAmount: amount
        })
    });

    if (!response.ok) {
        throw new Error("Failed to fetch campaign")
    }

    return await response.json();
    } catch (error: any) {
    throw new Error(`Failed to update campaign: ${error.message}`);
    }
}