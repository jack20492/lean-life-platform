
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dumbbell, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Dumbbell className="w-8 h-8 text-fitness-primary" />
            <span className="text-xl font-bold text-gray-800">Phi Nguyễn Personal Trainer</span>
          </Link>
          
          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-600">Xin chào, {user.name}</span>
                <Button 
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-fitness-primary hover:bg-fitness-secondary">
                  Đăng nhập
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
