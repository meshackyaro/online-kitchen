import mongoose from "mongoose";
import { Food } from "../src/models/food.models.js";
import { env } from "../src/config/env.js";

const foods = [
    {
        name: "Grilled Steak",
        description: "Juicy grilled steak served with garlic butter and roasted vegetables.",
        price: 25000,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        isAvailable: true
    },
    {
        name: "Margherita Pizza",
        description: "Classic Italian pizza with tomato sauce, mozzarella, and fresh basil.",
        price: 12500,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1574129810554-a69bbda9ad73",
        isAvailable: true
    },
    {
        name: "Caesar Salad",
        description: "Crispy romaine lettuce, croutons, and parmesan cheese with Caesar dressing.",
        price: 8500,
        category: "Starter",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
        isAvailable: true
    },
    {
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
        price: 6500,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1563805042-dfae83d720cd",
        isAvailable: true
    },
    {
        name: "Fresh Orange Juice",
        description: "Squeezed daily from the finest oranges.",
        price: 4000,
        category: "Beverage",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b",
        isAvailable: true
    }
];

const seedDB = async () => {
    try {
        if (!env.MONGODB_URI) {
            console.error("MONGODB_URI is not defined in .env");
            process.exit(1);
        }

        await mongoose.connect(env.MONGODB_URI);
        console.log("Connected to MongoDB for seeding...");

        await Food.deleteMany({});
        await Food.insertMany(foods);

        console.log("Database seeded successfully with Naira prices!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
