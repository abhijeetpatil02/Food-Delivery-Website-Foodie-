const restaurantData = {
    fastfood: {
        title: "Fast Food Restaurants",
        restaurants: [
            { name: "Truffles", image: "photo/Resturant/1.webp" },
            { name: "Food Adda", image: "photo/Resturant/2.jfif" },
            { name: "Taaza Thindi", image: "photo/Resturant/3.jpg" },
            { name: "Koshy's", image: "photo/Resturant/4.webp" },
            { name: "Empire", image: "photo/Resturant/5.jpg" },
            { name: "Smoke House", image: "photo/Resturant/6.jpg" },
            { name: "Kentaky", image: "photo/Resturant/7.png" },
            { name: "Paris Panini", image: "photo/Resturant/8.jpg" },
            { name: "Munching Corner", image: "photo/Resturant/9.jfif" }
        ],
        menu: [
            { name: "Burger", price: 600, image: "photo/FastFood/burger.jpg" },
            { name: "Donut", price: 899, image: "photo/FastFood/donut.jpg" },
            { name: "French Fries", price: 550, image: "photo/FastFood/french.jpg" },
            { name: "Gobi-65", price: 900, image: "photo/FastFood/Gobi-65.jpg" },
            { name: "HotDog", price: 800, image: "photo/FastFood/HotDog.jpg" },
            { name: "Gobi Manchurian", price: 1100, image: "photo/FastFood/Gobi.jpg" },
            { name: "Sandwich", price: 800, image: "photo/FastFood/sandwish.jpg" },
            { name: "Noodles", price: 900, image: "photo/FastFood/noodles.jpg" },
            { name: "Paneer Manchurian", price: 1100, image: "photo/FastFood/panner manchuri.jpg" },
            { name: "Fried Rice", price: 800, image: "photo/FastFood/fried rice.jpg" },
            { name: "Pizza", price: 700, image: "photo/FastFood/pizza.webp" },
            { name: "Momos", price: 500, image: "photo/FastFood/momos.jpg" }
        ]
    },
    veg: {
        title: "Veg Restaurants",
        restaurants: [
            { name: "Spice Terrace", image: "photo/Resturant/10.jpg" },
            { name: "Street Stroyss", image: "photo/Resturant/11.webp" },
            { name: "Green Theory", image: "photo/Resturant/12.jpg" },
            { name: "Gramin", image: "photo/Resturant/13.jpg" },
            { name: "Kailash Parbat", image: "photo/Resturant/14.jpg" },
            { name: "Sattvam", image: "photo/Resturant/15.jpg" },
            { name: "Time Traveller", image: "photo/Resturant/16.webp" },
            { name: "Element3", image: "photo/Resturant/17.avif" },
            { name: "Vegan Vogue", image: "photo/Resturant/18.jfif" }
        ],
        menu: [
            { name: "Dosa", price: 400, image: "photo/veg Food/dosa.jpg" },
            { name: "Idli", price: 450, image: "photo/veg Food/idli.jpg" },
            { name: "Vada", price: 400, image: "photo/veg Food/vada.jpg" },
            { name: "Butter Naan", price: 200, image: "photo/veg Food/butter naan.jpg" },
            { name: "Curd Rice", price: 800, image: "photo/veg Food/c Rice.jpg" },
            { name: "Jeera Rice", price: 900, image: "photo/veg Food/Jeera Rice.jpg" },
            { name: "Palak Paneer", price: 1200, image: "photo/veg Food/palak-paneer.jpg" },
            { name: "Paneer Butter Masala", price: 1400, image: "photo/veg Food/PBM.png" },
            { name: "Chole Bhature", price: 750, image: "photo/veg Food/chole-bhature.avif" },
            { name: "Kulcha", price: 250, image: "photo/veg Food/kucha.jpg" },
            { name: "Mushroom Biryani", price: 1100, image: "photo/veg Food/Mushroom-Biryani.jpg" },
            { name: "Veg Biryani", price: 1300, image: "photo/veg Food/veg biryani.jpg" }
        ]
    },
    nonveg: {
        title: "Non-Veg Restaurants",
        restaurants: [
            { name: "Neravi", image: "photo/Resturant/19.avif" },
            { name: "Lotus Pavilion", image: "photo/Resturant/20.jpg" },
            { name: "Empire", image: "photo/Resturant/21.jpg" },
            { name: "Spice Terrace", image: "photo/Resturant/22.avif" },
            { name: "Karavalli", image: "photo/Resturant/14.jpg" },
            { name: "Shiro", image: "photo/Resturant/15.jpg" },
            { name: "Gufha", image: "photo/Resturant/16.webp" },
            { name: "Ebony", image: "photo/Resturant/17.avif" },
            { name: "The Raj Pavilion", image: "photo/Resturant/18.jfif" }
        ],
        menu: [
            { name: "Chicken Burger", price: 550, image: "photo/non veg/c burger.jpg" },
            { name: "Hyderabad Biryani", price: 1300, image: "photo/non veg/hyd biry.webp" },
            { name: "Chicken Kabab", price: 900, image: "photo/non veg/c kabab.jpg" },
            { name: "Chicken Khemma", price: 800, image: "photo/non veg/c khemma.jpg" },
            { name: "Chicken Curry", price: 1000, image: "photo/non veg/chicken-curry.avif" },
            { name: "Chicken Soup", price: 800, image: "photo/non veg/chiken soup.jpeg" },
            { name: "Dry Chicken", price: 1200, image: "photo/non veg/dry chicken.jpg" },
            { name: "Fish Fry", price: 1400, image: "photo/non veg/fish fry.webp" },
            { name: "Goat Curry", price: 1100, image: "photo/non veg/goat curry.jpg" },
            { name: "Mutton Biryani", price: 1200, image: "photo/non veg/mutton-biriyani.gif" },
            { name: "Popcorn Chicken", price: 1190, image: "photo/non veg/popcorn chicken.jpeg" },
            { name: "Schezwan Chicken", price: 1440, image: "photo/non veg/sizwan chicken.jpg" }
        ]
    }
};

if (typeof module !== 'undefined') {
    module.exports = restaurantData;
}

