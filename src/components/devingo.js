'use client';

import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';

const BingoGame = () => {
  const words = [
    'Python', 'Django', 'AWS', 'FastAPI',
    'HTML', 'CSS', 'JS', 'Three.js',
    'Tailwind', 'Node.js', 'React', 'Next.js',
    'Dart', 'Flutter', 'Unreal', 'C++'
  ];
  
  const [nickname, setNickname] = useState('');
  const [isNicknameSubmitted, setIsNicknameSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [adminGameStarted, setAdminGameStarted] = useState(false);
  const [board, setBoard] = useState(Array(16).fill(''));
  const [selectedCells, setSelectedCells] = useState(Array(16).fill(false));
  const [error, setError] = useState('');

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    if (nickname.length > 10) {
      setError('닉네임은 10자를 초과할 수 없습니다.');
      return;
    }
    setError('');
    setIsNicknameSubmitted(true);
    if (nickname === 'ormcon') {
      setIsAdmin(true);
      setAdminGameStarted(false);  // 관리자는 시작 버튼을 눌러야 게임 시작
    } else {
      setGameStarted(true);
      initializeBoard();
    }
  };

  const initializeBoard = () => {
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    setBoard(shuffledWords);
  };

  const handleCellClick = (index) => {
    if (!gameStarted && !adminGameStarted) return;
    const newSelectedCells = [...selectedCells];
    newSelectedCells[index] = !newSelectedCells[index];
    setSelectedCells(newSelectedCells);
  };

  const startAdminGame = () => {
    setAdminGameStarted(true);
    initializeBoard();  // 관리자가 게임 시작 시 보드 초기화
  };

  const shuffleBoard = () => {
    initializeBoard();
  };

  if (!isNicknameSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">빙고 게임</h1>
          <form onSubmit={handleNicknameSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                닉네임
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="닉네임을 입력하세요"
                maxLength={10}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              시작하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  const renderBoard = () => (
    <div className="grid grid-cols-4 gap-2 w-full max-w-md">
      {board.map((word, index) => (
        <button
          key={index}
          onClick={() => handleCellClick(index)}
          className={`aspect-square flex items-center justify-center p-2 text-sm font-medium rounded-lg 
            ${selectedCells[index] 
              ? 'bg-blue-500 text-white' 
              : 'bg-white hover:bg-blue-50'
            } border transition-colors`}
        >
          {word}
        </button>
      ))}
    </div>
  );

  if (isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">
        <h1 className="text-2xl font-bold">관리자 모드</h1>
        <div className="flex flex-wrap items-center gap-4 justify-center">
          <button
            onClick={startAdminGame}
            className={`px-4 py-2 rounded-md ${
              adminGameStarted 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {adminGameStarted ? '게임 진행 중' : '게임 시작'}
          </button>
          <button
            onClick={shuffleBoard}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            <Shuffle className="w-4 h-4" />
            <span>섞기</span>
          </button>
        </div>
        {renderBoard()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">
      <h1 className="text-2xl font-bold">
        {nickname}님의 빙고판
      </h1>
      {renderBoard()}
    </div>
  );
};

export default BingoGame;