import { useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const cityData = {
    Delhi: {
        places: [
            "India Gate", "Red Fort", "Qutub Minar", "Lotus Temple",
            "Humayun’s Tomb", "Akshardham Temple", "Jama Masjid",
            "Chandni Chowk", "Raj Ghat"
        ],
        food: [
            "Chole Bhature",
            "Paranthe Wali Gali Paratha",
            "Butter Chicken",
            "Daulat Ki Chaat"
        ]
    },

    Mumbai: {
        places: [
            "Gateway of India", "Marine Drive", "Elephanta Caves",
            "Juhu Beach", "Siddhivinayak Temple",
            "Chhatrapati Shivaji Maharaj Terminus"
        ],
        food: [
            "Vada Pav",
            "Pav Bhaji",
            "Bombay Sandwich",
            "Bombay Bhel"
        ]
    },

    Jaipur: {
        places: [
            "Hawa Mahal", "Amber Fort", "City Palace",
            "Jantar Mantar", "Nahargarh Fort", "Jal Mahal"
        ],
        food: [
            "Dal Baati Churma",
            "Laal Maas",
            "Ghewar",
            "Pyaaz Kachori"
        ]
    },

    Varanasi: {
        places: [
            "Kashi Vishwanath Temple", "Dashashwamedh Ghat",
            "Assi Ghat", "Manikarnika Ghat",
            "Sarnath", "Ramnagar Fort",
            "Banaras Hindu University"
        ],
        food: [
            "Banarasi Paan",
            "Tamatar Chaat",
            "Malaiyyo",
            "Kachori Sabzi"
        ]
    },

    Hyderabad: {
        places: [
            "Charminar", "Golconda Fort",
            "Ramoji Film City", "Chowmahalla Palace",
            "Hussain Sagar Lake"
        ],
        food: [
            "Hyderabadi Biryani",
            "Haleem",
            "Double Ka Meetha",
            "Osmania Biscuits"
        ]
    },

    Kolkata: {
        places: [
            "Victoria Memorial", "Howrah Bridge",
            "Dakshineswar Temple", "Indian Museum",
            "Princep Ghat"
        ],
        food: [
            "Rasgulla",
            "Kathi Roll",
            "Mishti Doi",
            "Sandesh"
        ]
    },

    Chennai: {
        places: [
            "Marina Beach", "Kapaleeshwarar Temple",
            "Fort St. George", "Mahabalipuram"
        ],
        food: [
            "Chettinad Chicken",
            "Filter Coffee",
            "Pongal",
            "Murukku"
        ]
    },

    Bangalore: {
        places: [
            "Lalbagh Botanical Garden", "Cubbon Park",
            "Bangalore Palace", "Nandi Hills"
        ],
        food: [
            "Mysore Pak",
            "Bisi Bele Bath",
            "Ragi Mudde",
            "Maddur Vada"
        ]
    },
    Amritsar: {
        places: [
            "Golden Temple",
            "Jallianwala Bagh",
            "Wagah Border",
            "Partition Museum",
            "Durgiana Temple"
        ],
        food: [
            "Amritsari Kulcha",
            "Makki Di Roti & Sarson Da Saag",
            "Lassi"
        ]
    },

    Lucknow: {
        places: [
            "Bara Imambara",
            "Chota Imambara",
            "Rumi Darwaza",
            "Hazratganj",
            "Ambedkar Memorial Park"
        ],
        food: [
            "Tunday Kababi",
            "Galouti Kebab",
            "Awadhi Biryani",
            "Sheermal"
        ]
    },

    Agra: {
        places: [
            "Taj Mahal",
            "Agra Fort",
            "Mehtab Bagh",
            "Fatehpur Sikri"
        ],
        food: [
            "Petha",
            "Bedai & Jalebi",
            "Mughlai Paratha"
        ]
    },

    Udaipur: {
        places: [
            "City Palace",
            "Lake Pichola",
            "Jag Mandir",
            "Saheliyon Ki Bari",
            "Fateh Sagar Lake"
        ],
        food: [
            "Dal Baati Churma",
            "Gatte Ki Sabzi",
            "Mawa Kachori"
        ]
    },

    Indore: {
        places: [
            "Rajwada Palace",
            "Sarafa Bazaar",
            "Lal Bagh Palace",
            "Khajrana Ganesh Temple"
        ],
        food: [
            "Poha Jalebi",
            "Bhutte Ka Kees",
            "Garadu"
        ]
    },

    Surat: {
        places: [
            "Dumas Beach",
            "Ambika Niketan Temple",
            "Dutch Garden",
            "Sarthana Nature Park"
        ],
        food: [
            "Surti Locho",
            "Undhiyu",
            "Ghari"
        ]
    },

    Mysore: {
        places: [
            "Mysore Palace",
            "Chamundi Hills",
            "Brindavan Gardens",
            "St. Philomena’s Church"
        ],
        food: [
            "Mysore Pak",
            "Mysore Masala Dosa"
        ]
    },

    Goa: {
        places: [
            "Baga Beach",
            "Calangute Beach",
            "Basilica of Bom Jesus",
            "Dudhsagar Waterfalls",
            "Fort Aguada"
        ],
        food: [
            "Goan Fish Curry",
            "Pork Vindaloo",
            "Bebinca"
        ]
    },

    Shimla: {
        places: [
            "The Ridge",
            "Mall Road",
            "Jakhoo Temple",
            "Christ Church",
            "Kufri"
        ],
        food: [
            "Madra",
            "Siddu"
        ]
    },

    Rishikesh: {
        places: [
            "Laxman Jhula",
            "Ram Jhula",
            "Triveni Ghat",
            "Neelkanth Mahadev Temple",
            "Beatles Ashram"
        ],
        food: [
            "Aloo Puri",
            "Kachori",
            "Chotiwala Thali"
        ]
    }
};

const CreateTrip = () => {
    const [city, setCity] = useState("");
    const [customCity, setCustomCity] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [recommended, setRecommended] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [customTask, setCustomTask] = useState("");

    const handleCityChange = (selectedCity) => {
        setCity(selectedCity);
        setSelectedTasks([]);

        if (!selectedCity || selectedCity === "Other") {
            setRecommended([]);
            return;
        }

        const all = [
            ...cityData[selectedCity].places,
            ...cityData[selectedCity].food
        ];

        setRecommended(all);
    };

    const addTask = (task) => {
        if (!selectedTasks.includes(task)) {
            setSelectedTasks([...selectedTasks, task]);
        }
    };

    const removeTask = (task) => {
        setSelectedTasks(selectedTasks.filter(t => t !== task));
    };

    const addCustomTask = () => {
        if (!customTask.trim()) return;
        setSelectedTasks([...selectedTasks, customTask]);
        setCustomTask("");
    };

    const handleCreateTrip = async () => {
        if (!city) return alert("Select a city");

        if (city === "Other" && !customCity.trim()) {
            return alert("Enter custom city name");
        }

        const tasks = selectedTasks.map(t => ({ title: t }));

        try {
            await API.post("/trips", {
                city: city === "Other" ? customCity : city,
                fromDate,
                toDate,
                tasks
            });

            alert("Trip Created Successfully 🎉");

            setCity("");
            setCustomCity("");
            setFromDate("");
            setToDate("");
            setRecommended([]);
            setSelectedTasks([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-500 px-4 py-6 overflow-x-hidden">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-6 md:p-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center gap-3"
                >
                    <motion.span
                        animate={{ x: [0, 10, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut"
                        }}
                        className="text-4xl"
                    >
                        ✈️
                    </motion.span>

                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                            Plan Your Next Adventure
                        </h2>
                    </div>
                </motion.div>

                {/* City Section */}
                <div className="mb-6">
                    <label className="font-semibold text-gray-700">
                        🌍 Which city would you like to explore?
                    </label>

                    <select
                        value={city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select City</option>
                        {Object.keys(cityData)
                            .sort((a, b) => a.localeCompare(b))
                            .map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        <option value="Other">Other</option>
                    </select>
                </div>

                {city === "Other" && (
                    <input
                        type="text"
                        placeholder="Enter custom city"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        className="w-full p-3 border rounded-xl mb-6 focus:ring-2 focus:ring-indigo-500"
                    />
                )}

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Recommended Tasks */}
                {recommended.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-semibold text-lg mb-4 text-gray-800">
                            Recommended Tasks
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {recommended.map((task, index) => (
                                <button
                                    key={index}
                                    onClick={() => addTask(task)}
                                    className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full 
                             hover:bg-indigo-200 transition"
                                >
                                    + {task}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Selected Tasks */}
                {selectedTasks.length > 0 && (
                    <div className="mb-10">
                        <h3 className="font-semibold text-lg mb-4 text-gray-800">
                            Selected Tasks
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {selectedTasks.map((task, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-green-100 
                             text-green-800 px-4 py-2 rounded-full"
                                >
                                    {task}
                                    <button
                                        onClick={() => removeTask(task)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Custom Task */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        placeholder="Add custom task"
                        value={customTask}
                        onChange={(e) => setCustomTask(e.target.value)}
                        className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={addCustomTask}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl transition"
                    >
                        Add
                    </button>
                </div>

                {/* Submit */}
                <button
                    onClick={handleCreateTrip}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 
                     text-white py-3 rounded-2xl text-lg font-semibold 
                     shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    Create Trip
                </button>

            </motion.div>
        </div>
    );
};

export default CreateTrip;