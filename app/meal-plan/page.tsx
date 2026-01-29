"use client";

import { useState } from "react";

const mealPlans = [
  {
    type: "Hair Fall Control",
    gradient: "from-[#7c7cff] to-[#4fd1c5]",
    meals: [
      "🥣 Oats + milk, almonds, banana",
      "🍛 Roti, spinach sabzi, dal, curd",
      "🍵 Coconut water, roasted chana",
      "🍽️ Roti + sabzi, paneer / eggs",
    ],
    benefit:
      "High protein, iron & biotin to reduce hair fall and strengthen roots.",
  },
  {
    type: "Dandruff / Itchy Scalp",
    gradient: "from-[#4fd1c5] to-[#22d3ee]",
    meals: [
      "🥣 Fruit bowl, chia seeds",
      "🍛 Rice, vegetables, dal",
      "🍵 Green tea, pumpkin seeds",
      "🍽️ Light khichdi, salad",
    ],
    benefit:
      "Anti-inflammatory foods to calm scalp and reduce flakes.",
  },
  {
    type: "Oily Scalp",
    gradient: "from-[#22d3ee] to-[#60a5fa]",
    meals: [
      "🥣 Poha / upma",
      "🍛 Roti, lauki sabzi, dal",
      "🍵 Buttermilk, fruits",
      "🍽️ Soup, grilled vegetables",
    ],
    benefit:
      "Light meals to control excess oil and balance scalp sebum.",
  },
  {
    type: "Dry / Frizzy Hair",
    gradient: "from-[#f472b6] to-[#fb7185]",
    meals: [
      "🥣 Milk smoothie, dates",
      "🍛 Rice, rajma, ghee",
      "🍵 Coconut water, nuts",
      "🍽️ Roti, sabzi, paneer",
    ],
    benefit:
      "Healthy fats & hydration to improve moisture and shine.",
  },
];

export default function MealPlanPage() {
  const [activeFlip, setActiveFlip] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 bg-gradient-to-b from-[#0b1020] via-[#07090f] to-black text-white px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="block">Hair Wellness</span>
            <span className="block bg-gradient-to-r from-[#7c7cff] to-[#4fd1c5] bg-clip-text text-transparent">
              Smart Meal Plans
            </span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Hover cards to explore meals. Use the arrow to flip and view benefits.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {mealPlans.map((plan, index) => {
            const flipped = activeFlip === index;

            return (
              <div
                key={plan.type}
                className={`relative rounded-3xl overflow-hidden border border-white/10 bg-white/5
                transition-transform duration-300 ${!flipped ? "hover:scale-[1.04]" : ""}`}
              >
                {/* FRONT */}
                {!flipped && (
                  <div
                    className={`min-h-[380px] p-6 bg-gradient-to-br ${plan.gradient} text-black relative`}
                  >
                    <h2 className="text-2xl font-bold mb-4">
                      {plan.type}
                    </h2>

                    <ul className="text-sm space-y-3 font-medium">
                      {plan.meals.map((meal) => (
                        <li key={meal}>{meal}</li>
                      ))}
                    </ul>

                    {/* Arrow */}
                    <button
                      onMouseEnter={() => setActiveFlip(index)}
                      className="absolute bottom-5 right-5 w-10 h-10 rounded-full
                      bg-black/80 text-white flex items-center justify-center
                      hover:bg-black transition"
                    >
                      ↓
                    </button>
                  </div>
                )}

                {/* BACK */}
                {flipped && (
                  <div
                    className="min-h-[380px] p-6 bg-black text-white flex flex-col justify-center relative"
                  >
                    <h3 className="text-xl font-bold mb-4">
                      Why this plan?
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed">
                      {plan.benefit}
                    </p>

                    <p className="mt-6 text-xs text-gray-500">
                      Follow for 8–12 weeks for visible improvement.
                    </p>

                    {/* Arrow back */}
                    <button
                      onMouseLeave={() => setActiveFlip(null)}
                      className="absolute bottom-5 right-5 w-10 h-10 rounded-full
                      bg-white/10 text-white flex items-center justify-center
                      hover:bg-white/20 transition"
                    >
                      ↑
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <div className="mt-20 pt-10 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm max-w-3xl mx-auto">
            These meal plans are general wellness guidelines. Consult a certified
            nutritionist for personalised needs.
          </p>
        </div>
      </div>
    </div>
  );
}
