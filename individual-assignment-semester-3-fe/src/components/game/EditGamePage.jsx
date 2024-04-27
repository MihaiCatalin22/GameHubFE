import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GameForm from './GameForm';
import gameService from '../services/GameService';

const EditGamePage = () => {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const response = await gameService.getGameById(gameId);
                setGame(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch game details:', error);
                setError('Failed to load game details.');
                setLoading(false);
            }
        };

        fetchGame();
    }, [gameId]);

    const handleGameSaved = (updatedGame) => {
        navigate(`/games/${updatedGame.id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!game) return <p>Game not found.</p>;

    return (
        <GameForm onSave={handleGameSaved} initialData={game} />
    );
};

export default EditGamePage;