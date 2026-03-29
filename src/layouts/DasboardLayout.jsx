import React, { useState } from 'react';
import {  NavLink, Outlet } from 'react-router-dom';
import { Menu, X, LayoutDashboard, PackagePlus, ListOrdered, User, LogOut } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import ProFastLogo from '../pages/shared/ProFastLogo';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut } = useAuth();

    const toggleSidebar = () => setIsOpen(!isOpen);
    
    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { label: 'Add Parcel', path: '/dashboard/addParcel', icon: <PackagePlus size={20} /> },
        { label: 'My Parcels', path: '/dashboard/myParcels', icon: <ListOrdered size={20} /> },
        { label: 'Profile', path: '/dashboard/profile', icon: <User size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#002B2B] text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700">
                    <ProFastLogo></ProFastLogo>
                    <button onClick={toggleSidebar} className="lg:hidden text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            // 2. Add end prop to the Dashboard root so it doesn't stay active for sub-routes
                            end={item.path === '/dashboard'} 
                            onClick={() => setIsOpen(false)}
                            // 3. Use the isActive callback to swap classes
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                                    isActive 
                                    ? 'bg-[#9ACD32] text-[#002B2B] shadow-md' // Active Style
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white' // Normal Style
                                }`
                            }
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-slate-700">
                    <button
                        onClick={logOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between lg:justify-end">
                    <button onClick={toggleSidebar} className="lg:hidden p-2 text-slate-600">
                        <Menu size={28} />
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-slate-800">{user?.displayName}</p>
                            <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                        <img
                            src={user?.photoURL || 'https://via.placeholder.com/40'}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-[#9ACD32]"
                        />
                    </div>
                </header>

                {/* REDUCED PADDING HERE: changed p-6 lg:p-10 to p-4 lg:p-6 */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4  bg-slate-50">
                    <Outlet />
                </main>
            </div>

            {isOpen && (
                <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />
            )}
        </div>
    );
};

export default DashboardLayout;