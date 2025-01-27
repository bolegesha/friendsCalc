// app/page.js
'use client';
import { useState } from 'react';
import { Plus, Minus, DollarSign, Users, User } from 'lucide-react';

export default function BillSplitter() {
  const [people, setPeople] = useState(['Рот 1', 'Рот 2']);
  const [sharedDishes, setSharedDishes] = useState([{ name: '', price: '' }]);
  const [personalDishes, setPersonalDishes] = useState([{ name: '', price: '', person: 0 }]);
  const [tax, setTax] = useState(0);

  // Add/remove people
  const addPerson = () => setPeople([...people, `Person ${people.length + 1}`]);
  const removePerson = () => setPeople(people.slice(0, -1));

  // Add dishes
  const addSharedDish = () => setSharedDishes([...sharedDishes, { name: '', price: '' }]);
  const addPersonalDish = () => setPersonalDishes([...personalDishes, { name: '', price: '', person: 0 }]);

  // Calculate totals
  const calculateBill = () => {
    const sharedTotal = sharedDishes.reduce((sum, dish) => sum + (Number(dish.price) || 0), 0);
    const sharedPerPerson = sharedTotal / people.length;

    const personalTotals = people.map((_, index) => {
      const personalTotal = personalDishes
          .filter(dish => dish.person === index)
          .reduce((sum, dish) => sum + (Number(dish.price) || 0), 0);

      const subtotal = sharedPerPerson + personalTotal;
      const taxAmount = (subtotal * tax) / 100;

      return {
        subtotal,
        tax: taxAmount,
        total: subtotal + taxAmount
      };
    });

    return personalTotals;
  };

  return (
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6">Димаш больше не нужен</h1>

        {/* People Section */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Количество ртов ({people.length})</h2>
            <div className="flex gap-2">
              <button onClick={removePerson} className="p-2 rounded-full bg-red-50 text-red-600">
                <Minus size={20} />
              </button>
              <button onClick={addPerson} className="p-2 rounded-full bg-blue-50 text-blue-600">
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {people.map((person, i) => (
                <input
                    key={i}
                    type="text"
                    value={person}
                    onChange={e => {
                      const newPeople = [...people];
                      newPeople[i] = e.target.value;
                      setPeople(newPeople);
                    }}
                    className="w-full p-2 rounded-lg bg-gray-50"
                />
            ))}
          </div>
        </div>

        {/* Shared Dishes */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Users size={20} />
            <h2 className="text-lg font-semibold">Общак</h2>
          </div>
          <div className="space-y-3">
            {sharedDishes.map((dish, i) => (
                <div key={i} className="flex gap-2">
                  <input
                      placeholder="Че ест"
                      value={dish.name}
                      onChange={e => {
                        const newDishes = [...sharedDishes];
                        newDishes[i].name = e.target.value;
                        setSharedDishes(newDishes);
                      }}
                      className="flex-1 p-2 rounded-lg bg-gray-50"
                  />
                  <input
                      type="number"
                      placeholder="Цена"
                      value={dish.price}
                      onChange={e => {
                        const newDishes = [...sharedDishes];
                        newDishes[i].price = e.target.value;
                        setSharedDishes(newDishes);
                      }}
                      className="w-24 p-2 rounded-lg bg-gray-50"
                  />
                </div>
            ))}
            <button
                onClick={addSharedDish}
                className="w-full p-2 rounded-lg bg-blue-50 text-blue-600 mt-2"
            >
              Еще общак
            </button>
          </div>
        </div>

        {/* Personal Dishes */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <User size={20} />
            <h2 className="text-lg font-semibold">Личная жратва</h2>
          </div>
          <div className="space-y-3">
            {personalDishes.map((dish, i) => (
                <div key={i} className="flex gap-2">
                  <input
                      placeholder="Че хавал"
                      value={dish.name}
                      onChange={e => {
                        const newDishes = [...personalDishes];
                        newDishes[i].name = e.target.value;
                        setPersonalDishes(newDishes);
                      }}
                      className="flex-1 p-2 rounded-lg bg-gray-50"
                  />
                  <input
                      type="number"
                      placeholder="Цена"
                      value={dish.price}
                      onChange={e => {
                        const newDishes = [...personalDishes];
                        newDishes[i].price = e.target.value;
                        setPersonalDishes(newDishes);
                      }}
                      className="w-24 p-2 rounded-lg bg-gray-50"
                  />
                  <select
                      value={dish.person}
                      onChange={e => {
                        const newDishes = [...personalDishes];
                        newDishes[i].person = Number(e.target.value);
                        setPersonalDishes(newDishes);
                      }}
                      className="w-32 p-2 rounded-lg bg-gray-50"
                  >
                    {people.map((person, i) => (
                        <option key={i} value={i}>{person}</option>
                    ))}
                  </select>
                </div>
            ))}
            <button
                onClick={addPersonalDish}
                className="w-full p-2 rounded-lg bg-blue-50 text-blue-600 mt-2"
            >
              Еще похавал
            </button>
          </div>
        </div>

        {/* Tax */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Обслуживание</h2>
          <div className="relative">
            <input
                type="number"
                value={tax}
                onChange={e => setTax(Number(e.target.value))}
                className="w-full p-2 rounded-lg bg-gray-50"
                placeholder="Tax percentage"
            />
            <span className="absolute right-4 top-2">%</span>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">В общем</h2>
          <div className="space-y-3">
            {calculateBill().map((result, i) => (
                <div key={i} className="flex justify-between p-2 bg-gray-50 rounded-lg">
                  <span>{people[i]}</span>
                  <span className="font-semibold">{result.total.toFixed(2)} тг</span>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}