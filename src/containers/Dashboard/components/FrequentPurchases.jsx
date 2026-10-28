import React from "react";
import PropTypes from "prop-types";
import { Repeat } from "lucide-react";

export default function FrequentPurchases({ purchases, money }) {
  const entries = Object.entries(purchases || {});
  if (entries.length === 0) return null;
  return (
    <section
      className="workspace-card"
      aria-labelledby="frequent-purchases-title"
    >
      <div className="workspace-card-header">
        <h2 id="frequent-purchases-title">Frequent purchases</h2>
      </div>
      <p className="workspace-note">
        Most repeated expense notes this month · up to five purchases
      </p>
      {entries.map(([name, purchase]) => (
        <div className="workspace-transaction" key={name}>
          <span className="workspace-transaction-icon" aria-hidden="true">
            <Repeat size={18} />
          </span>
          <div>
            <div className="workspace-transaction-name">{name}</div>
            <div className="workspace-note">{purchase.count} purchases</div>
          </div>
          <span className="workspace-transaction-amount">
            {money(purchase.total_spent)}
            <span className="workspace-note"> total</span>
          </span>
        </div>
      ))}
    </section>
  );
}

FrequentPurchases.propTypes = {
  purchases: PropTypes.objectOf(
    PropTypes.shape({
      count: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      total_spent: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ),
  money: PropTypes.func.isRequired,
};

FrequentPurchases.defaultProps = { purchases: undefined };
