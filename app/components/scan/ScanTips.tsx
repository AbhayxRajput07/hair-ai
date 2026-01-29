"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Zap, Droplets, Scissors, Shield } from "lucide-react";

export default function ScanTips() {
  const [expanded, setExpanded] = useState(false);

  const hairTypes = [
    { type: "Straight", tip: "Focus on shine and volume" },
    { type: "Wavy", tip: "Check for frizz and definition" },
    { type: "Curly", tip: "Capture curl pattern clearly" },
    { type: "Coily", tip: "Show scalp and curl clumps" },
  ];

  const benefits = [
    { icon: <Zap className="w-5 h-5" />, title: "Instant Analysis", desc: "Get results in seconds" },
    { icon: <Droplets className="w-5 h-5" />, title: "Moisture Check", desc: "Hydration level detection" },
    { icon: <Scissors className="w-5 h-5" />, title: "Damage Report", desc: "Split ends & breakage" },
    { icon: <Shield className="w-5 h-5" />, title: "Scalp Health", desc: "Redness & oiliness check" },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-2xl overflow-hidden">
      <div 
        className="p-5 cursor-pointer flex justify-between items-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-amber-700 font-bold text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Pro Tips & Benefits</h3>
            <p className="text-sm text-gray-600">Click to {expanded ? "collapse" : "expand"}</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {expanded && (
        <div className="px-5 pb-5 space-y-6">
          {/* Hair Type Tips */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">For Your Hair Type</h4>
            <div className="grid grid-cols-2 gap-3">
              {hairTypes.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200">
                  <div className="font-medium text-gray-900">{item.type}</div>
                  <div className="text-xs text-gray-600 mt-1">{item.tip}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">What You'll Get</h4>
            <div className="space-y-3">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                    {benefit.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{benefit.title}</div>
                    <div className="text-sm text-gray-600">{benefit.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tip */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <div>
                <div className="font-bold text-gray-900">Best Time to Scan</div>
                <div className="text-sm text-gray-700">
                  Wash hair, let it dry naturally, then scan for most accurate results.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}