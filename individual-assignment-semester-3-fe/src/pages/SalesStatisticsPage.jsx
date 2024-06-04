import React, {useState, useEffect} from "react";
import adminService from '../api/AdminService';
import { useAuth } from "../contexts/authContext";

const SalesStatisticsPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState([]);
    const [filteredStats, setFilteredStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameTitle, setGameTitle] = useState('');
    const [days, setDays] = useState(0);

    useEffect(() => {
        if (user && user.role.includes('ADMINISTRATOR')) {
            fetchData();
        }
    }, [user]);

    const fetchData = () => {
        setLoading(true);
        adminService.getSalesStatistics('', days)
            .then(response => {
                setStats(response.data);
                setFilteredStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    const handleFilterChange = () => {
        const filtered = stats.filter(stat => {
            const matchesTitle = stat.gameTitle.toLowerCase().includes(gameTitle.toLowerCase());
            return matchesTitle;
        });
        setFilteredStats(filtered);
    };

    useEffect(() => {
        fetchData();
    }, [days]);

    if (!user || !user.role.includes('ADMINISTRATOR')) {
        return <p>You are not authorized to access this page.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading statistics: {error.message}</p>;
    }

    return (
        <div className="sales-stats-page">
            <h2>Sales Statistics</h2>
            <div className="filter">
                <input
                    type="text"
                    value={gameTitle}
                    onChange={(e) => setGameTitle(e.target.value)}
                    placeholder="Search by game name"
                    className="filter-input"
                />
                <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="filter-select">
                    <option value="0">All Time</option>
                    <option value="30">Last 30 Days</option>
                    <option value="60">Last 60 Days</option>
                </select>
                <button onClick={handleFilterChange} className="filter-button">Filter</button>
            </div>
            {filteredStats.length === 0 ? (
                <p>No game found with that title.</p>
            ) : (
                <table className="sales-stats-table">
                    <thead>
                        <tr>
                            <th>Game Title</th>
                            <th>Total Units Sold</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredStats.map(stat => (
                            <tr key={stat.gameTitle}>
                                <td>{stat.gameTitle}</td>
                                <td>{stat.totalUnitsSold}</td>
                                <td>€{stat.totalRevenue.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SalesStatisticsPage;