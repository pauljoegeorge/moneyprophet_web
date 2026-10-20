import React from "react";
import {
  ShoppingBasket,
  Coffee,
  House,
  MessageSquare,
  Check,
} from "lucide-react";
import Brand from "./Brand";

export default function Preview() {
  return (
    <div
      className="mp-preview-panel"
      aria-label="Illustrative dashboard with sample data"
    >
      <div className="mp-preview-top">
        <Brand />
        <span className="mp-sample">Sample workspace</span>
      </div>
      <div className="mp-preview-heading">
        <span>Your month, at a glance</span>
        <span>October</span>
      </div>
      <div className="mp-preview-balance">
        <span>Category budget left</span>
        <strong>
          ¥42,800<span> / ¥80,000</span>
        </strong>
        <p>A little more room for what matters.</p>
      </div>
      <div className="mp-preview-metrics">
        <div>
          <span>Spent today</span>
          <strong>¥1,240</strong>
        </div>
        <div>
          <span>Spent this week</span>
          <strong>¥9,600</strong>
        </div>
      </div>
      <div className="mp-preview-categories">
        <h3>Category budgets</h3>
        {[
          [ShoppingBasket, "Groceries", "¥18,200 / ¥30,000", 61],
          [Coffee, "Eating out", "¥12,000 / ¥15,000", 80],
          [House, "Home & everyday", "¥7,000 / ¥35,000", 20],
        ].map(([Icon, name, amount, width]) => (
          <div className="mp-preview-category" key={name}>
            <div>
              <span>
                <Icon size={15} />
                {name}
              </span>
              <span>{amount}</span>
            </div>
            <div className="mp-preview-track">
              <i
                style={{
                  width: `${width}%`,
                  background: width >= 80 ? "#b97b3c" : undefined,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mp-preview-message">
        <MessageSquare size={17} />
        <span>“Coffee 480”</span>
        <Check size={16} />
      </div>
    </div>
  );
}
