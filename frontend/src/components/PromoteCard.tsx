import PromoteCatalog from "./PromoteCatalog"

export default function PromoteCard() {
    return (
        <div className="w-screen">
            <div className="text-center text-2xl py-8 font-semibold">Top Destination in Thailand</div>  
            <div className="flex flex-row">
                <PromoteCatalog name="Bangkok" image="/img/bangkok.jpg" link="Bangkok"/>
                <PromoteCatalog name="Chiang Mai" image="/img/chiangmai.jpg" link="Chiang+Mai"/>
                <PromoteCatalog name="Phuket" image="/img/phuket.jpg" link="Phuket"/>
            </div>
        </div>
    )
}