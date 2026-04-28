import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FOOD_DB = {
  egg: { cal: 70, protein: 6 },
  banana: { cal: 100, protein: 1 },
  milk: { cal: 150, protein: 8 },
  rice: { cal: 200, protein: 4 },
  roti: { cal: 120, protein: 3 },
  dal: { cal: 180, protein: 9 },
  peanuts: { cal: 300, protein: 12 },
};

export default function App() {
  const [foods, setFoods] = useState([]);
  const [food, setFood] = useState("");
  const [entries, setEntries] = useState([]);
  const [weight, setWeight] = useState("");

  const addFood = () => {
    const d = FOOD_DB[food.toLowerCase()] || { cal: 100, protein: 2 };
    setFoods([...foods, { name: food, ...d }]);
    setFood("");
  };

  const addWeight = () => {
    setEntries([...entries, { week: "W" + (entries.length + 1), weight: Number(weight) }]);
    setWeight("");
  };

  const cal = foods.reduce((s, f) => s + f.cal, 0);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">🔥 Fitness App</h1>

      <div className="p-4 bg-gray-900 rounded">
        <input className="text-black p-2" value={food} onChange={e => setFood(e.target.value)} placeholder="food" />
        <button className="ml-2 bg-blue-500 px-3 py-1" onClick={addFood}>Add</button>
        <p>Calories: {cal}</p>
      </div>

      <div className="p-4 bg-gray-900 rounded">
        <input className="text-black p-2" value={weight} onChange={e => setWeight(e.target.value)} placeholder="weight" />
        <button className="ml-2 bg-green-500 px-3 py-1" onClick={addWeight}>Add</button>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={entries}>
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line dataKey="weight" stroke="#00ffcc" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
