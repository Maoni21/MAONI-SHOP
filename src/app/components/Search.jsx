

export default function Search() {
    return (
        <div className=" flex items-center justify-center h-[110px] bg-gradient-to-r from-[#FF40F7] from-0% via-[#C957FF] via-40% to-[#2994F6] to-80%">
            <button className="bg-white w-[260px] h-[60px] rounded-[20px] m-4"><h1 className="font-inter font-bold  text-[20px]  bg-clip-text text-transparent bg-gradient-to-r from-[#0044F2] to-[#C246FF]">Créer une Annonce</h1></button>
            <input type="text" placeholder="Rechercher des produits" class="w-[1100px] h-[60px] px-4 py-2 border border-gray-300 rounded-[25px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
        </div>
    );
}