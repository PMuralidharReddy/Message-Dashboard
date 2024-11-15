import React from 'react';
import { Twitter, MessageCircle, HelpCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const platforms = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    description: 'Connect to view and post tweets',
    color: 'text-blue-400',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    icon: MessageCircle,
    description: 'Connect to access messages and channels',
    color: 'text-blue-500',
  },
  {
    id: 'quora',
    name: 'Quora',
    icon: HelpCircle,
    description: 'Connect to view and answer questions',
    color: 'text-red-500',
  },
];

export default function PlatformConnector() {
  const { authState, authenticatePlatform, disconnectPlatform } = useAuth();

  const handleToggleConnection = async (platformId: string) => {
    const platform = platformId as keyof typeof authState;
    if (authState[platform].isAuthenticated) {
      await disconnectPlatform(platform);
    } else {
      await authenticatePlatform(platform);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Connect Platforms</h2>
        <p className="mt-1 text-sm text-gray-500">
          Connect your social media accounts to manage them from one place
        </p>
      </div>

      <div className="divide-y divide-gray-200">
        {platforms.map((platform) => {
          const state = authState[platform.id as keyof typeof authState];
          const Icon = platform.icon;

          return (
            <div
              key={platform.id}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-6 w-6 ${platform.color}`} />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-gray-500">{platform.description}</p>
                </div>
              </div>

              <button
                onClick={() => handleToggleConnection(platform.id)}
                disabled={state.loading}
                className={`inline-flex items-center px-4 py-2 border rounded-md text-sm font-medium shadow-sm ${
                  state.isAuthenticated
                    ? 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                    : 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {state.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : state.isAuthenticated ? (
                  'Disconnect'
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          );
        })}
      </div>

      {Object.values(authState).some(state => state.error) && (
        <div className="px-6 py-4 bg-red-50">
          <p className="text-sm text-red-600">
            There was an error connecting to one or more platforms. Please try again.
          </p>
        </div>
      )}
    </div>
  );
}