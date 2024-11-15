import React from 'react';
import { Camera, Mail, Phone, MapPin, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow">
        <div className="relative h-32 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-t-lg">
          <button className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 text-white hover:bg-white/30">
            <Camera className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="relative flex items-end -mt-12">
            <div className="relative">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&q=80'}
                alt={user?.name}
                className="h-24 w-24 rounded-full border-4 border-white"
              />
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-gray-900/60 text-white hover:bg-gray-900/80">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="ml-6 pb-2">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-sm text-gray-500">@{user?.name.toLowerCase().replace(' ', '')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">About</h2>
              <p className="mt-4 text-gray-500">
                Senior Software Engineer passionate about building great user experiences.
                Specializing in React, TypeScript, and modern web technologies.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-500">
                  <Mail className="h-5 w-5 mr-3" />
                  {user?.email}
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="h-5 w-5 mr-3" />
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-5 w-5 mr-3" />
                  San Francisco, CA
                </div>
                <div className="flex items-center text-gray-500">
                  <LinkIcon className="h-5 w-5 mr-3" />
                  github.com/username
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h2>
            <div className="space-y-3">
              {user?.connectedAccounts.map((account) => (
                <div
                  key={account.provider}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={`/icons/${account.provider}.svg`}
                      alt={account.provider}
                      className="h-5 w-5 mr-3"
                    />
                    <span className="text-sm text-gray-900 capitalize">
                      {account.provider}
                    </span>
                  </div>
                  <span className={`text-xs ${
                    account.connected ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {account.connected ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}