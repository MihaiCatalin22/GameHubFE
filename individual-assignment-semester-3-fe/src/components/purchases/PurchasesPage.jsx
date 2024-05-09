import React, {useState, useEffect} from "react";
import purchaseService from "../services/PurchaseService";
import { useAuth } from "../../contexts/authContext";

const PurchasesPage = () => {
    const { user } = useAuth();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    useEffect(() => {
        if (user) {
            fetchPurchases();
        }
    }, [user, fromDate, minAmount, maxAmount]);

    const fetchPurchases = async () => {
        setLoading(true);
        setError('');
        try {
            const formattedFromDate = fromDate ? new Date(fromDate).toISOString() : new Date(0).toISOString();
            const purchasesResponse = await purchaseService.getPurchases(
                user.id,
                formattedFromDate,
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

    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
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
              From Date:
              <input
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
              />
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
                    {purchase.amount} € -{' '}
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