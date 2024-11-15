import React from 'react';
import { Bell, Shield, User, Globe, Key } from 'lucide-react';

const settings = [
  {
    section: 'Account',
    icon: User,
    items: [
      { name: 'Profile Information', description: 'Update your account profile information' },
      { name: 'Email Settings', description: 'Manage your email preferences' },
      { name: 'Password', description: 'Change your password' },
    ],
  },
  {
    section: 'Privacy',
    icon: Shield,
    items: [
      { name: 'Privacy Settings', description: 'Control your privacy preferences' },
      { name: 'Connected Apps', description: 'Manage connected applications' },
      { name: 'Data & Storage', description: 'Manage your data usage and storage' },
    ],
  },
  {
    section: 'Notifications',
    icon: Bell,
    items: [
      { name: 'Push Notifications', description: 'Configure push notification settings' },
      { name: 'Email Notifications', description: 'Manage email notification preferences' },
      { name: 'SMS Notifications', description: 'Control SMS alert settings' },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <div className="divide-y divide-gray-200">
          {settings.map((section) => (
            <div key={section.section} className="px-6 py-6">
              <div className="flex items-center mb-4">
                <section.icon className="h-6 w-6 text-gray-400 mr-3" />
                <h2 className="text-lg font-medium text-gray-900">
                  {section.section}
                </h2>
              </div>
              
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="ml-4">
                      <button
                        type="button"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}