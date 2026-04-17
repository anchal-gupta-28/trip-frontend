import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      ...cityData[selectedCity].food,
    ];

    setRecommended(all);
  };

  const addTask = (task) => {
    if (!selectedTasks.includes(task)) {
      setSelectedTasks([...selectedTasks, task]);
    }
  };

  const removeTask = (task) => {
    setSelectedTasks(selectedTasks.filter((t) => t !== task));
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

    const tasks = selectedTasks.map((t) => ({ title: t }));

    try {
      await API.post("/trips", {
        city: city === "Other" ? customCity : city,
        fromDate,
        toDate,
        tasks,
      });

      navigate("/trips"); // ✅ redirect after creation

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 
                   rounded-2xl shadow-xl p-6 md:p-10"
      >

        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-8">
          Plan Your Trip ✈️
        </h2>

        {/* City */}
        <div className="mb-6">
          <label className="text-gray-300 text-sm">
            Select City
          </label>

          <select
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
            className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white 
                       border border-slate-700 focus:ring-2 focus:ring-indigo-500"
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

        {/* Custom City */}
        {city === "Other" && (
          <input
            type="text"
            placeholder="Enter custom city"
            value={customCity}
            onChange={(e) => setCustomCity(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white 
                       border border-slate-700 focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          />
        </div>

        {/* Recommended Tasks */}
        {recommended.length > 0 && (
          <div className="mb-8">
            <h3 className="text-white mb-3 font-semibold">
              Recommended Tasks
            </h3>

            <div className="flex flex-wrap gap-2">
              {recommended.map((task, index) => {
                const isSelected = selectedTasks.includes(task);

                return (
                  <button
                    key={index}
                    onClick={() =>
                      isSelected ? removeTask(task) : addTask(task)
                    }
                    className={`px-3 py-1.5 text-sm rounded-full border transition
                      ${
                        isSelected
                          ? "bg-indigo-500 text-white border-indigo-500"
                          : "bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700"
                      }`}
                  >
                    {task}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Selected Tasks */}
        {selectedTasks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-white mb-3 font-semibold">
              Selected Tasks
            </h3>

            <div className="flex flex-wrap gap-2">
              {selectedTasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full 
                             bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                >
                  {task}
                  <button
                    onClick={() => removeTask(task)}
                    className="text-rose-400 hover:text-rose-500"
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
            className="flex-1 p-3 rounded-lg bg-slate-800 text-white 
                       border border-slate-700 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={addCustomTask}
            className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 
                       text-white transition"
          >
            Add
          </button>
        </div>

        {/* Submit */}
        <button
          onClick={handleCreateTrip}
          className="w-full bg-indigo-500 hover:bg-indigo-600 
                     text-white py-3 rounded-xl font-semibold transition"
        >
          Create Trip
        </button>

      </motion.div>
    </div>
  );
};

export default CreateTrip;