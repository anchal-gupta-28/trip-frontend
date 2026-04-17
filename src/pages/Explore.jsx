import { useSearchParams } from "react-router-dom";

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

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCity = searchParams.get("city");

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-white mb-3">
            🌍 Explore Cities
          </h2>

          <p className="text-gray-400 max-w-xl">
            Select a city to discover popular places to visit and famous food to try.
            This helps you plan your trips better ✨
          </p>
        </div>

        {/* City Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.keys(cityData).map((city) => (
            <button
              key={city}
              onClick={() => setSearchParams({ city })}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCity === city
                  ? "bg-indigo-500 text-white border-indigo-500 shadow-md"
                  : "bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700 hover:text-white"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {!selectedCity && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-gray-400">
            👆 Select any city above to explore places & food
          </div>
        )}

        {/* City Details */}
        {selectedCity && cityData[selectedCity] && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

            {/* Title */}
            <h3 className="text-2xl font-semibold text-white mb-6">
              📍 {selectedCity}
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Places */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-4">
                  🏛 Places to Visit
                </h4>

                <div className="space-y-2">
                  {cityData[selectedCity].places.map((place, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg 
                                 bg-indigo-500/10 text-indigo-300 
                                 border border-indigo-500/20 
                                 hover:bg-indigo-500/20 transition"
                    >
                      {place}
                    </div>
                  ))}
                </div>
              </div>

              {/* Food */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
                <h4 className="text-white font-semibold mb-4">
                  🍜 Must Try Food
                </h4>

                <div className="space-y-2">
                  {cityData[selectedCity].food.map((food, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 rounded-lg 
                                 bg-indigo-500/10 text-indigo-300 
                                 border border-indigo-500/20 
                                 hover:bg-indigo-500/20 transition"
                    >
                      {food}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Explore;