import Navbar from "@/app/components/Navbar";
import Search from "@/app/components/Search";
import Card from "@/app/components/Card";


export default function Page() {
    return (
        <div className="flex flex-col">
            <Navbar/>
            <Card/>
        </div>
    );
}