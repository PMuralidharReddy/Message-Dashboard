import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, Check } from 'lucide-react';

export default function ConnectedAccounts() {
  const { user, connectAccount } = useAuth();

  const handleConnect = async (provider: string) => {
    try {
      await connectAccount(provider);
    } catch (error) {
      console.error('Failed to connect account:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Connected Accounts</h2>
        <p className="mt-1 text-sm text-gray-500">
          Connect your social media accounts to manage them from one place
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {user?.connectedAccounts.map((account) => (
          <div key={account.provider} className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={`/icons/${account.provider}.svg`}
                alt={account.provider}
                className="h-8 w-8"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {account.provider}
                </p>
                <p className="text-sm text-gray-500">
                  {account.connected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            
            {account.connected ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <Check className="mr-1 h-4 w-4" />
                Connected
              </span>
            ) : (
              <button
                onClick={() => handleConnect(account.provider)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-gray-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-500">
              Connecting an account will allow you to manage its messages and notifications from this dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}