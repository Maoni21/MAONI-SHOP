

/**export default function Card() {
    return (
        <div className="flex flex-col justify-center items-center  w-[296px] h-[439px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[25px] ">
            <img src="/casque.svg" alt="" width={195} height={192} className="mb-6"/>
            <div className="bg-gradient-to-r from-[#C2C2C2]/40 to-[#FFFFFF]/35 w-[269px] h-[182px] rounded-[25px] flex items-center flex-col">
                <h1 className="font-inter font-bold text-[24px] text-white mt-6">AirPods Max</h1>
                <h1 className="font-inter font-bold text-[16px] text-white mt-4">599.99€</h1>
                <button className="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[25px] w-[155px] h-[30px] mt-4"><h1 className="font-inter font-bold text-[16px] text-white">Ajouter au panier</h1></button>
            </div>
                
        </div>
    );
}*/

import React, { useState, useEffect } from "react";

function Card({ title, price, image }) {
    return (
        <div className="flex flex-col justify-center items-center w-[296px] h-[439px] bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[25px]">
            <img src={image} alt="" width={195} height={192} className="mb-6"/>
            <div className="bg-gradient-to-r from-[#C2C2C2]/40 to-[#FFFFFF]/35 w-[269px] h-[182px] rounded-[25px] flex items-center flex-col">
                <h1 className="font-inter font-bold text-[24px] text-white mt-6">{title}</h1>
                <h1 className="font-inter font-bold text-[16px] text-white mt-4">{price}€</h1>
                <button className="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[25px] w-[155px] h-[30px] mt-4">
                    <h1 className="font-inter font-bold text-[16px] text-white">Ajouter au panier</h1>
                </button>
            </div>
        </div>
    );
}

export default function CardForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [cards, setCards] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
        setCards(savedCards);
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCard = { title, price, image };
        const updatedCards = [...cards, newCard];
        setCards(updatedCards);
        localStorage.setItem("cards", JSON.stringify(updatedCards));
        setTitle("");
        setPrice("");
        setImage("");
        setShowForm(false);
    };

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative flex flex-col items-center">
            <div className="flex items-center justify-center w-full h-[110px] bg-gradient-to-r from-[#FF40F7] from-0% via-[#C957FF] via-40% to-[#2994F6] to-80%">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-white w-[260px] h-[60px] rounded-[20px] m-4 "
                >
                    {showForm ? "Annuler" : "Ajouter une carte"}
                </button>
                <input
                    type="text"
                    placeholder="Rechercher des produits"
                    className="w-[1100px] h-[60px] px-4 py-2 border border-gray-300 rounded-[25px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg z-50">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Titre</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">Prix</label>
                            <input
                                type="number"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-[25px] w-full py-2 text-white font-bold"
                        >
                            Ajouter la carte
                        </button>
                    </form>
                </div>
            )}

            <div className="flex flex-wrap gap-4 mt-6 pr-[8%] pl-[10%]">
                {filteredCards.map((card, index) => (
                    <Card key={index} title={card.title} price={card.price} image={card.image} />
                ))}
            </div>
        </div>
    );
}
