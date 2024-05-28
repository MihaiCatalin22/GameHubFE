import React, {useState, useEffect} from "react";
import purchaseService from "../services/PurchaseService";
import { useAuth } from "../../contexts/authContext";

const PurchasesPage = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [days, setDays] = useState(0);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  useEffect(() => {
    if (user) {
      fetchPurchases();
    }
  }, [user, days, minAmount, maxAmount]);

  const fetchPurchases = async () => {
    setLoading(true);
    setError('');
    try {
      const fromDate = days > 0 ? new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString() : new Date(0).toISOString();
      const purchasesResponse = await purchaseService.getPurchases(
        user.id,
        fromDate,
        minAmount,
        maxAmount
      );
      setPurchases(purchasesResponse.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
      setError('Failed to load purchases.');
    } finally {
      setLoading(false);
    }
  };

  const handleDaysChange = (e) => {
    setDays(Number(e.target.value));
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="purchases-page">
      <h2>Your Purchases</h2>
      <div className="filter">
        <label>
          Date Range:
          <select value={days} onChange={handleDaysChange} className="filter-select">
            <option value="0">All Time</option>
            <option value="30">Last 30 Days</option>
            <option value="60">Last 60 Days</option>
          </select>
        </label>
        <label>
          Min Amount:
          <input
            type="number"
            step="0.01"
            value={minAmount}
            onChange={handleMinAmountChange}
          />
        </label>
        <label>
          Max Amount:
          <input
            type="number"
            step="0.01"
            value={maxAmount}
            onChange={handleMaxAmountChange}
          />
        </label>
        <button onClick={fetchPurchases} className="button">
          Apply Filter
        </button>
      </div>
      {purchases.length ? (
        <ul className="purchases-list">
          {purchases.map((purchase) => (
            <li key={purchase.id}>
              <div className="purchase-title">{purchase.gameTitle}</div>
              <div className="purchase-details">
                €{purchase.amount} -{' '}
                {new Date(purchase.purchaseDate).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};

export default PurchasesPage;