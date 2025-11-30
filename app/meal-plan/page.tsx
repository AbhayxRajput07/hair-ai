export default function MealPlanPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-2xl p-8">
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-900">
          Hair Wellness Meal Plan
        </h1>
        
        <p className="text-gray-700 text-center mb-6">
          A daily nutrient-rich meal plan designed to improve hair strength, shine, and growth.
        </p>

        <div className="space-y-6">
          
          {/* Breakfast */}
          <div className="border p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg mb-2">🥣 Breakfast</h2>
            <p className="text-gray-700">
              • Oats + milk or almond milk <br />
              • 4–5 soaked almonds + 1 walnut <br />
              • 1 fruit (banana or apple)
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Rich in biotin, protein & omega-3.
            </p>
          </div>

          {/* Lunch */}
          <div className="border p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg mb-2">🍛 Lunch</h2>
            <p className="text-gray-700">
              • 2 rotis (multigrain preferred) <br />
              • Vegetables (spinach, carrots, broccoli) <br />
              • Dal / rajma / chole <br />
              • Curd or buttermilk
            </p>
            <p className="text-sm text-gray-500 mt-2">
              High in protein, iron & vitamins for hair strength.
            </p>
          </div>

          {/* Evening Snack */}
          <div className="border p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg mb-2">🍵 Evening Snack</h2>
            <p className="text-gray-700">
              • Coconut water or green tea <br />
              • Roasted chana or peanuts
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Helps maintain hydration & scalp health.
            </p>
          </div>

          {/* Dinner */}
          <div className="border p-4 rounded-xl bg-gray-100">
            <h2 className="font-semibold text-lg mb-2">🍽️ Dinner</h2>
            <p className="text-gray-700">
              • Rice + dal OR roti + sabzi <br />
              • Paneer / eggs / chicken (optional) <br />
              • Salad (cucumber, carrot, beet)
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Balanced nutrients for hair repair while sleeping.
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            This is a general meal plan. Consult a nutritionist for personalised diet needs.
          </p>
        </div>
      </div>
    </div>
  );
}
